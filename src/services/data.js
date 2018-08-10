import http from '../utils/http';

//用户中心
//登陆
export const userLogin = (params) => http.getData({
    type : 'POST',
    url : 'admin/login', 
    data : params
})

//获取用户信息
export const getUser = () => http.getData({
    url : 'admin/getUser',
})