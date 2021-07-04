import axios from 'axios';
import * as Config from '../config';

export function Onestore(endpoint, method, body) {
    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}
export function Onestoreservice(endpoint, method, body) {
    return axios({
        method: method,
        url: `${Config.API_URL}/store/service/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}
export function Onestoresequipment(endpoint, method, body) {
    return axios({
        method: method,
        url: `${Config.API_URL}/store/equipment/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}
export function Onestorebooking(endpoint, method, body) {
    return axios({
        method: method,
        url: `${Config.API_URL}/store/booking/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}
export default {Onestore,Onestoreservice,Onestorebooking}