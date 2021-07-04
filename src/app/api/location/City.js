import axios from 'axios';
import * as Config from '../config';

export default function City(body) {
    return axios({
        method: 'GET',
        url: `${Config.API_URL}/city`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}
