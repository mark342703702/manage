import { userLogin, getUser } from '../services/data';
import Cookies from 'js-cookie';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { routerRedux } from 'dva/router';

export default {
    namespace : 'm_login',

    state: {
        currentUser : {}
    },

    effects : {
        *login({ payload }, { call, put }) {
            const res = yield call(userLogin, payload);

            if(res && res.status === 200 && res.statusText === 'OK'){
                //如果登陆成功,将token存入cookie中
                console.log(res)
                Cookies.set('token', res.data.token, { expires: 1 });
                //更改state
                yield put({
                    type : 'changeLoginStatus',
                    payload : res.data.user
                })
                //重载权限系统
                reloadAuthorized();
                console.log(localStorage.getItem('authority'))
                yield put(routerRedux.replace('/'));
            }
        },

        *logout( _, { put }){

            //退出删除token
            Cookies.remove('token');
            yield put({
                type : 'changeLoginStatus',
                payload : {
                    name : '游客',
                    avater : '/images/default.jpg',
                    status : 'guest',
                    phone : '无',
                    aid : 'admin0000'
                }
            })
            reloadAuthorized();
            yield put(routerRedux.replace('/user/login'));
        },

        *getCurrentUser( _, { call, put }){
            const res = yield call(getUser);
            if(res && res.status === 200 && res.statusText === 'OK'){
                yield put({
                    type : 'changeLoginStatus',
                    payload : res.data
                })
            }
            console.log(res)
        }
    },

    reducers : {
        changeLoginStatus(state, { payload }){
            console.log('设置前的值：'+ payload.status)
            //设置权限角色
            setAuthority(payload.status)
            return {
                ...state,
                currentUser : payload
            }
        }
    }
}
