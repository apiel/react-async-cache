import React, { createContext, useContext, useState, useEffect } from 'react';
import md5 from 'md5';

// use something else than JSON.stringify (should we use immutable instead? After request are as frequent than rendering component, so JSON might be fine as well)

interface Res {
    name: string,
    args: any,
    response: any,
    requestTime: number,
}

type Responses = { [id: string]: Res };

const initialState = {
    responses: {} as Responses,
};

export type Fn = (...args: any) => Promise<any>;
export type Update<T = any> = (response: T, fn: Fn, ...args: any) => Promise<void>;
export type Call = (fn: Fn, ...args: any) => Promise<void>;
export type Cache<T = any> = (fn: Fn, ...args: any) => T;

export interface UseAsyncCacheReturn<T = any> {
    call: Call;
    response: T;
    update: Update;
    cache: Cache;
};

export const AsyncCacheContext = createContext({
    call: async (fn: Fn, ...args: any) => { },
    update: async (response: any, fn: Fn, ...args: any) => { },
    cache: (fn: Fn, ...args: any): any => { },
    ...initialState,
});

interface Props {
    children: React.ReactNode
}

export function useAsyncCache<T = any>(): UseAsyncCacheReturn<T> {
    const { call, responses, ...rest } = useContext(AsyncCacheContext);
    const [id, setId] = useState();
    const [response, setResponse] = useState();
    const myCall = async (fn: Fn, ...args: any) => {
        setId(getId(fn, args));
        call(fn, ...args);
    };
    useEffect(() => {
        const storeResponse: Res = responses[id];
        if (storeResponse && storeResponse.response &&
            (!response || JSON.stringify(response) !== JSON.stringify(storeResponse.response))) {
            setResponse(storeResponse.response);
        }
    }); // , [responses]
    return { call: myCall, response, ...rest };
}

function getId(fn: Fn, args: any): string {
    return md5(`${fn.name}::${JSON.stringify(args)}`);
}

export class AsyncCacheProvider extends React.Component<Props> {
    state = {
        ...initialState,
    };

    setResponse = (
        id: string,
        fn: Fn,
        args: any,
        requestTime: number,
        response: any,
    ) => {
        return new Promise((resolve) => {
            const { name } = fn;
            const { responses } = this.state;
            responses[id] = { name, args, response, requestTime };
            this.setState({ responses }, resolve);
        });
    }

    setRequestTime = async(
        id: string,
        fn: Fn,
        args: any,
    ) => {
        const requestTime = Date.now();
        const data = this.state.responses[id];
        const response = data ? data.response : null;
        await this.setResponse(id, fn, args, requestTime, response);
        return requestTime;
    }

    isAlreadyRequesting = (id: string): boolean => {
        const data = this.state.responses[id];
        return data && (Date.now() - data.requestTime) < 200;
    }

    call: Call = async (fn: Fn, ...args: any) => {
        const id = getId(fn, args);
        if (!this.isAlreadyRequesting(id)) {
            const requestTime = await this.setRequestTime(id, fn, args);
            const response = await fn(...args);
            await this.setResponse(id, fn, args, requestTime, response);
        }
    }

    update: Update = async (response: any, fn: Fn, ...args: any) => {
        const id = getId(fn, args);
        await this.setResponse(id, fn, args, Date.now(), response);
    }

    cache: Cache = (fn: Fn, ...args: any) => {
        const id = getId(fn, args);
        return this.state.responses[id].response;
    }

    render() {
        return (
            <AsyncCacheContext.Provider value={{
                call: this.call,
                responses: this.state.responses,
                update: this.update,
                cache: this.cache,
            }}>
                {this.props.children}
            </AsyncCacheContext.Provider>
        );
    }
}
