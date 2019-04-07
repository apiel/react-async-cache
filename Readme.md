# Isomor-react

`Isomor-react` is a library that will help you to use [isomor](https://github.com/apiel/isomor) with react. When you are using `isomor` wihtout this library each call to server functions will generate a request. `Isomor-react` will create a cache and distinct duplicated request. It will also allow you to share the response to a server function between multiple components.

### Example

#### Get response

Without cache you would do:

```jsx
import { getTime } from './server/getTime';

export const Time = () => {
  const [time, setTime] = React.useState<string>();
  const load = async () => {
      setTime(await getTime());
  }
  React.useEffect(() => { load(); }, []);
  return (
    <div>
      {!time ? <p>Loading...</p> : (
        <p><b>Server time:</b> {time} <button onClick={load}>reload</button></p>
      )}
    </div>
  );
}
```

Using the cache:

```jsx
import React from 'react';
import { useIsomor } from 'isomor-react';

import { getTime } from './server/getTime';

export const Time = () => {
  const { call, response } = useIsomor();
  const load = () => {
    call(getTime);
  }
  React.useEffect(() => { load(); }, []);
  return (
    <div>
      {!response ? <p>Loading...</p> : (
        <p><b>Server time:</b> {response.time} <button onClick={load}>reload</button></p>
      )}
    </div>
  );
}
```

**Without cache**, if you would have this component 2 times in your app, it would make 2 requests when the components mount. When you click the `load` button, only the component where the button is located would be refresh.
**With the cache**, only 1 request would be sent instead of 2. When you click the `load` button, both component would be refresh.

#### Update response

`isomor-react` has also a mecanism to update the cache, so you don't have to refetch data after update.

```jsx
import React from 'react';
import { useIsomor } from 'isomor-react';

import { getTime } from './server/getTime';
import { setTime } from './server/setTime';

export const Time = () => {
  const { call, response, update } = useIsomor();
  const load = () => {
    call(getTime);
  }
  React.useEffect(() => { load(); }, []);
  const onClickUpdate = (newColor: string) => async () => {
    const newTime = await setTime('08:00');
    update(newTime, getTime);
  }
  return (
    <div>
      {!response ? <p>Loading...</p> : (
        <p>
          <b>Server time:</b> {response.time}
          <button onClick={load}>reload</button>
          <button onClickUpdate={load}>update</button>
        </p>
      )}
    </div>
  );
}
```

When you click the button `update`, the update request is sent to the server, when the response is received, the cache is updated and the 2 components get updated.

### How to use it

`Isomor-react` is using the context api to share the state between component. So the first thing you need to do is to call the context provider in the root of your app:

```tsx
import { IsomorProvider } from 'isomor-react';

ReactDOM.render((
    <IsomorProvider>
        <App />
    </IsomorProvider>
), document.getElementById('root'));

```

The you just have to use the hook `useIsomor`. This hook return an object of 3 values: `call`, `update` and `response`.

```tsx
import { useIsomor } from 'isomor-react';

export const MyComponent = () => {
    const { call, response, update } = useIsomor();
    ...
}
```

`call` is a function that allow you to cache your original function call. The first parameter you give to `call` is the function you want to cache. The next parameter are the parameters you would have provide to the function you want to cache.

```tsx
async call(fn: (...args: any) => Promise<any>, ...args: any)
```

eg.:
```tsx
await call(getItems);
await call(getItem, 'id-20', { withComment: true });
```

`update` is a function that allow you to update the cache without to make a call to the server. The first parameter is the new response you want to set. The second parameter is the cached function. The next parameter are the parameters you would have provide to the cached function.

eg.:

```tsx
await update([
    {id:'id-1', title: 'hello'},
    {id:'id-2', title: 'hello2'},
], getItems);
await update({
    id:'id-1',
    title: 'hello',
    content: 'Lorem ipsum dolor sit amet, ac augue malesuada, tellus amet',
    comments: [],
}, getItem, 'id-20', { withComment: true });
```