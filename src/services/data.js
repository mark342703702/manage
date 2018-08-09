import http from '../utils/http';

//登陆
export const userLogin = (params) => http.getData({
    type : 'POST',
    url : 'admin/login', 
    data : params
})