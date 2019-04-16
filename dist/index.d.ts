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
export declare type Update<T = any> = (response: T, fn: (...args: any) => Promise<any>, ...args: any) => Promise<void>;
export declare type Call = (fn: (...args: any) => Promise<any>, ...args: any) => Promise<void>;
export declare type Cache = (fn: (...args: any) => Promise<any>, ...args: any) => any;
export interface UseIsomorReturn<T = any> {
    call: Call;
    response: T;
    update: Update<T>;
    cache: Cache;
}
export declare type UseIsomor<T = any> = () => UseIsomorReturn<T>;
export declare const IsomorContext: React.Context<{
    responses: Responses;
    call: (...args: any) => Promise<void>;
    update: (response: any, ...args: any) => Promise<void>;
    cache: (...args: any) => void;
}>;
interface Props {
    children: React.ReactNode;
}
export declare const useIsomor: UseIsomor;
export declare class IsomorProvider extends React.Component<Props> {
    state: {
        responses: Responses;
    };
    setResponse: (id: string, fn: (...args: any) => Promise<any>, args: any, requestTime: number, response: any) => Promise<{}>;
    setRequestTime: (id: string, fn: (...args: any) => Promise<any>, args: any) => Promise<number>;
    isAlreadyRequesting: (id: string) => boolean;
    call: Call;
    update: Update;
    cache: Cache;
    render(): JSX.Element;
}
export {};
