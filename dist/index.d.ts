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
export declare const IsomorContext: React.Context<{
    responses: Responses;
    call: (...args: any) => Promise<void>;
    update: (response: any, ...args: any) => Promise<void>;
}>;
interface Props {
    children: React.ReactNode;
}
export declare const useIsomor: () => {
    update: (response: any, ...args: any) => Promise<void>;
    call: (fn: (...args: any) => Promise<any>, ...args: any) => Promise<void>;
    response: any;
};
export declare class IsomorProvider extends React.Component<Props> {
    state: {
        responses: Responses;
    };
    setResponse: (id: string, fn: (...args: any) => Promise<any>, args: any, requestTime: number, response: any) => Promise<{}>;
    setRequestTime: (id: string, fn: (...args: any) => Promise<any>, args: any) => Promise<number>;
    isAlreadyRequesting: (id: string) => boolean;
    call: (fn: (...args: any) => Promise<any>, ...args: any) => Promise<void>;
    update: (response: any, fn: (...args: any) => Promise<any>, ...args: any) => Promise<void>;
    render(): JSX.Element;
}
export {};
