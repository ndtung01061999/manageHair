import axios from 'axios';
import * as Config from '../config';

export default function CommentAPI(endpoint, method = 'GET', body) {
    return axios({
        method: method,
        url: `${Config.API_URL}/store/comment/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}