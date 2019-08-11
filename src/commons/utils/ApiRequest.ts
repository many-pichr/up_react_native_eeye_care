import Axios from 'axios';
import config from '../../config';

export const withAuth = Axios.create({
    baseURL: config.API_ENDPOINT,
});
withAuth.interceptors.request.use(config => {
    return new Promise(async (resolve, reject) => {
        let access_token = '';

        // TODO: 
        // For Oauath2, get access token
        // access_token = ......

        const bearer = `Bearer ${access_token}`;
        config.headers['Authorization'] = bearer;
        resolve(config);
    });
}, Promise.reject);

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
export const withoutAuth = Axios.create({
    baseURL: config.API_ENDPOINT,
});

export default {
    withAuth, withoutAuth,
}