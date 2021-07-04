import axios from 'axios';
import * as Config from '../config';

export default function District(endpoint, method = 'GET', body) {
    return axios({
        method: method,
        url: `${Config.API_URL}/district/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}