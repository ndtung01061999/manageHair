import axios from 'axios';
import * as Config from '../config';

export default function Createbooking(method = 'POST', body) {
    return axios({
        method: method,
        url: `${Config.API_URL}/booking`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}