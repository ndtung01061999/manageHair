import axios from 'axios';
import * as Config from '../config';

export default function Customer(endpoint, method = 'GET', body) {
    return axios({
        method: method,
        url: `${Config.API_URL}/customer/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}