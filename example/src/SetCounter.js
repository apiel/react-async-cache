import React from 'react';
import { useIsomor } from 'isomor-react';
import { api } from './mockapi';

export const SetCounter = () => {
    const { update, cache } = useIsomor();
    const onReset = async () => {
        const response = await api('/counter', 'POST', { value: 1 });
        await update(response, api, '/counter');
    }
    const onIncrement = async () => {
        const count = cache(api, '/counter');
        const response = await api('/counter', 'POST', { value: count + 1 });
        await update(response, api, '/counter');
    }
    return (
        <div>
            <button onClick={onIncrement}>+</button> <button onClick={onReset}>Reset</button>
        </div>
    );
}