import request from '../utils/request';
import http from '../utils/http';

export async function add() {
    return request('/admin/test');
}

export async function register(params) {
    console.log(params)
    return request('/admin/register', {
        method: 'POST',
        body: params,
    });
}

export const httpT = () => http.getData({
    type : 'GET',
    url: 'admin/test', 
})

export const httpP = (params) => http.getData({
    type : 'POST',
    url : 'admin/register', 
    data : params
})