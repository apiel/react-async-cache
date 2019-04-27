# react-async-cache

`react-async-cache` is a library to cache asynchrone function call between different component.
It was initially build to improve cache of api call while using [isomor](https://github.com/apiel/isomor) with react. This library can be especially useful to cache some fetch query, for example using axios. The concept was inspired from Apollo cache, even if it is far from being comparable.

The library take care to save the response of the async function and share it between components using context api. It will also avoid unnecessary call made simultaneously to the same async function. It will identify the cache id base on the name of the function and the parameters passed. So if you call multiple times the same function with different parameters, it will not use the same cache. Example:

api is an async function
```js
export api = async (param1, param2) => ...
```

```js
  call(api, '/counter');
  call(api, '/timer');
```
This 2 call to `api` function will have different cache because they don't share the same parameters.

```js
  call(api, '/counter');
  call(api, '/counter');
```
This 2 call to `api` function will have the same cache and `api` will be called only once.

## Example

See full example at [here](https://github.com/apiel/react-async-cache/tree/master/example).

![counter-example](https://github.com/apiel/react-async-cache/blob/master/media/react-async-cache.gif?raw=true)

counter.js
```jsx
import React from 'react';
import { useAsyncCache } from 'react-async-cache';
import { api } from './mockapi';

export const Counter = () => {
    const { call, response } = useAsyncCache();
    React.useEffect(() => {
        // call api to get current counter value and cache it
        // it will avoid unnecessary simultanous call
        call(api, '/counter');
    });
    return (
        <div>
            Counter: { response || 'loading...'}
        </div>
    );
}
```

app.js
```jsx
import React from 'react';
import { AsyncCacheProvider } from 'react-async-cache';
import { Counter } from './Counter';

const App = () => {
  return (
    <AsyncCacheProvider>
      <Counter />
      <Counter />
    </AsyncCacheProvider>
  );
}
```
In this example, without cache there would have been 2 calls to the api, but using `react-async-cache` there is only 1 call. The library will take care to populate the response to all the components.

## update cache

`react-async-cache` provide as well different way to interact with the cache:

```jsx
import React from 'react';
import { useAsyncCache } from 'react-async-cache';
import { api } from './mockapi';

export const SetCounter = () => {
    const { update, cache } = useAsyncCache();
    const onReset = async () => {
        // Call api to update the counter
        const response = await api('/counter', 'POST', { value: 1 });
        // Update the cache to populate the response to the other component
        await update(response, api, '/counter');
    }
    const onIncrement = async () => {
        // Load count value from cache
        const count = cache(api, '/counter');
        // Call api
        const response = await api('/counter', 'POST', { value: count + 1 });
        // Update cache
        await update(response, api, '/counter');
    }
    return (
        <div>
            <button onClick={onIncrement}>+</button> <button onClick={onReset}>Reset</button>
        </div>
    );
}
```

## How to use it

`react-async-cache` is using the context api to share the state between component. So the first thing to do is to call the context provider in the root of the app:

```tsx
import { AsyncCacheProvider } from 'react-async-cache';

ReactDOM.render((
    <AsyncCacheProvider>
        <App />
    </AsyncCacheProvider>
), document.getElementById('root'));

```

Then use the hook `useAsyncCache` in the components. This hook return an object of 5 properties: `call`, `update`, `response`, `error` and `cache`.

```tsx
import { useAsyncCache } from 'react-async-cache';

export const MyComponent = () => {
    const { call, response, update } = useAsyncCache();
    ...
}
```

`call` is a function that allow to cache the original function call. The first given parameter to `call` is the function you want to cache. The next parameters are the parameters you would have providen to the function you want to cache.

```tsx
async call(fn: (...args: any) => Promise<any>, ...args: any)
```

eg.:
```tsx
await call(getItems);
await call(getItem, 'id-20', { withComment: true });
```

`response` is the response received after the function has been called.

`error` is the error received if the function called failed.

`update` is a function that allow to update the cache without to make a call to the server. The first parameter is the new response you want to set. The second parameter is the cached function. The next parameter are the parameters you would have providen to the cached function.

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

`cache` is a function to access the cache. It work the same way as the `call` function, but it will get the `response` from the cache, instead to call the async function.


## Use with isomor

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
import { useAsyncCache } from 'react-async-cache';

import { getTime } from './server/getTime';

export const Time = () => {
  const { call, response } = useAsyncCache();
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

**Without cache**, if you would have this component 2 times in your app, it would make 2 requests when the components mount. When you click the `load` button, only the component where the button is located would be refreshed.
**With the cache**, only 1 request would be sent instead of 2. When you click the `load` button, both component would be refresh.

#### Update response

`react-async-cache` has also a mecanism to update the cache, so you don't have to refetch data.

```jsx
import React from 'react';
import { useAsyncCache } from 'react-async-cache';

import { getTime } from './server/getTime';
import { setTime } from './server/setTime';

export const Time = () => {
  const { call, response, update } = useAsyncCache();
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
