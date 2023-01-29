import { rest } from 'msw';
import Config from 'react-native-config';

export const handlers = [
    rest.get('http://192.168.4.89:8080/auth', (req, res, ctx) => {
        return res(ctx.text('fake-url'));
    })
];
