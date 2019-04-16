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

export type Update<T = any> = (response: T, fn: (...args: any) => Promise<any>, ...args: any) => Promise<void>;
export type Call = (fn: (...args: any) => Promise<any>, ...args: any) => Promise<void>;
export type Cache = (fn: (...args: any) => Promise<any>, ...args: any) => any;

export interface UseIsomorReturn<T = any> {
    call: Call;
    response: T;
    update: Update<T>;
    cache: Cache;
};

export type UseIsomor<T = any> = () => UseIsomorReturn<T>;

export const IsomorContext = createContext({
    call: async (...args: any) => { },
    update: async (response: any, ...args: any) => { },
    cache: (...args: any) => { },
    ...initialState,
});

interface Props {
    children: React.ReactNode
}

export const useIsomor: UseIsomor = () => {
    const { call, responses, ...rest } = useContext(IsomorContext);
    const [id, setId] = useState();
    const [response, setResponse] = useState();
    const myCall = async (fn: (...args: any) => Promise<any>, ...args: any) => {
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

function getId(fn: (...args: any) => Promise<any>, args: any): string {
    return md5(`${fn.name}::${JSON.stringify(args)}`);
}

export class IsomorProvider extends React.Component<Props> {
    state = {
        ...initialState,
    };

    setResponse = (
        id: string,
        fn: (...args: any) => Promise<any>,
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
        fn: (...args: any) => Promise<any>,
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

    call: Call = async (fn: (...args: any) => Promise<any>, ...args: any) => {
        const id = getId(fn, args);
        if (!this.isAlreadyRequesting(id)) {
            const requestTime = await this.setRequestTime(id, fn, args);
            const response = await fn(...args);
            await this.setResponse(id, fn, args, requestTime, response);
        }
    }

    update: Update = async (response: any, fn: (...args: any) => Promise<any>, ...args: any) => {
        const id = getId(fn, args);
        await this.setResponse(id, fn, args, Date.now(), response);
    }

    cache: Cache = (fn: (...args: any) => Promise<any>, ...args: any) => {
        const id = getId(fn, args);
        return this.state.responses[id].response;
    }

    render() {
        return (
            <IsomorContext.Provider value={{
                call: this.call,
                responses: this.state.responses,
                update: this.update,
                cache: this.cache,
            }}>
                {this.props.children}
            </IsomorContext.Provider>
        );
    }
}
