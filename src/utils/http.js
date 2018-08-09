import { Modal } from "antd";
import axios from "axios";
import qs from "qs";
import Cookies from 'js-cookie';
// import { signalr } from "./utils";
axios.defaults.timeout = 30000;
axios.defaults.withCredentials = true;

const baseUrl = "/";

function checkStatus(response) {
    switch(response.status) {
        case 401: // 用户状态失效
            // 测试使用
            // Cookies.remove('token');
            // // 取消消息推送连接
            // // signalr.stop();
            // window.location.replace('#/user/syslogin');

            // 存储ok
            if(Cookies.get('token') === undefined) {
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            } else {
                Cookies.remove('token');
                // 取消消息推送连接
                // signalr.stop();
                window.location.replace('#/');
            }
            break;
        case 403: // 无权操作
            Modal.confirm({
                title: '抱歉提示',
                content: '您当前没有操作此功能的权限！前往升级版本？',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    window.open('https://fw.jd.com/492413.html');
                },
                onCancel() {},
            });
            break;
        default:;
    }
}

export default {
    /*
    type: 请求方式,默认post
    url: 请求地址
    data: 请求数据
    flag: 参数序列化标识,默认为true
    cType: contentType
    */
    getData(opt) {
        // 默认属性
        let optDefault = {
            type: 'POST',
            url: '',
            data: {},
            flag: true,
            cType: 'application/json',
        }
        let optNew = Object.assign({}, optDefault, opt);
        let ct = "";
        if (!optNew.flag)  {
            optNew.cType = "application/x-www-form-urlencoded";
            optNew.data = qs.stringify(optNew.data);
        }
        const opts = {
            headers: {
                "Content-Type": optNew.cType,
            },
            method: optNew.type,
            baseURL: baseUrl,
            url: optNew.url,
            data: optNew.data,
        }
        
        return axios(opts)
            .then(response => {
                return response;
            })
            .catch(error => {
                checkStatus(error.response);
            });
    },
};
