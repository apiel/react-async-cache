let counter = 1;

const latency = () => new Promise(resolve => setTimeout(resolve, Math.random() * 100));

export async function api(url, method = 'GET', data = {}) {
    if (url === '/counter') {
        if (method === 'GET') {
            console.log('Call GET /counter');
            await latency();
            return counter;
        } else if (method === 'POST') {
            console.log('Call POST /counter', data);
            await latency();
            counter = data.value;
            return counter || 1;
        }
    }
}