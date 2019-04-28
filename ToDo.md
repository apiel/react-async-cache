- useAsyncCacheEffect -> including useEffect ?
    - useAsyncCacheEffect(deps: [], fn: Fn, ...args: any): UseAsyncCacheReturn & load
    - useAsyncCacheEffect(fn: Fn, ...args: any): UseAsyncCacheReturn & load

- better error information if miss-use lib

- unit test, integration test?

Need to improve types:

 - useAsyncCache<PageData[]>();
 - ~~need type for update, call and response~~

~~Add a way to get from cache~~