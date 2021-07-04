import axios from 'axios';
import * as Config from '../config';

export default function Getbooking(endpoint, method = 'GET', body) {
    return axios({
        method: method,
        url: `${Config.API_URL}/booking/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}