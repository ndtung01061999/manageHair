import axios from 'axios';
import * as Config from '../config';

export default function User(endpoint, method = 'GET', body) {
    return axios({
        method: method,
        url: `${Config.API_URL}/account/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}