import React from 'react';
interface Res {
    name: string;
    args: any;
    response: any;
    requestTime: number;
}
declare type Responses = {
    [id: string]: Res;
};
export declare type Fn = (...args: any) => Promise<any>;
export declare type Update<T = any> = (response: T, fn: Fn, ...args: any) => Promise<void>;
export declare type Call = (fn: Fn, ...args: any) => Promise<void>;
export declare type Cache<T = any> = (fn: Fn, ...args: any) => T;
export interface UseIsomorReturn<T = any> {
    call: Call;
    response: T;
    update: Update<T>;
    cache: Cache<T>;
}
export declare const IsomorContext: React.Context<{
    responses: Responses;
    call: (fn: Fn, ...args: any) => Promise<void>;
    update: (response: any, fn: Fn, ...args: any) => Promise<void>;
    cache: (fn: Fn, ...args: any) => any;
}>;
interface Props {
    children: React.ReactNode;
}
export declare function useIsomor<T = any>(): UseIsomorReturn<T>;
export declare class IsomorProvider extends React.Component<Props> {
    state: {
        responses: Responses;
    };
    setResponse: (id: string, fn: Fn, args: any, requestTime: number, response: any) => Promise<{}>;
    setRequestTime: (id: string, fn: Fn, args: any) => Promise<number>;
    isAlreadyRequesting: (id: string) => boolean;
    call: Call;
    update: Update;
    cache: Cache;
    render(): JSX.Element;
}
export {};
