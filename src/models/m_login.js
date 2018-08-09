import { userLogin } from '../services/data';

export default {
    namespace : 'm_login',

    state: {
        status: undefined,
    },

    effects : {
        *login({ payload }, { call, put }) {
            const res = yield call(userLogin, payload);
            console.log(res)
            if(res && res.status === 200 && res.statusText === 'OK'){
                console.log(res)
            }
        }
    }
}
