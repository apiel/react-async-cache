import React from 'react';
import { useIsomor } from 'isomor-react';
import { api } from './mockapi';

export const Counter = () => {
    const { call, response } = useIsomor();
    React.useEffect(() => {
        call(api, '/counter');
    });
    return (
        <div>
            Counter: { response || 'loading...'}
        </div>
    );
}