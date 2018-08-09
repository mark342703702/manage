import { add, register, httpT, httpP } from '../services/test';

export default {
  namespace: 'test',

  state: {
    data : '23'
  },

  effects: {
    
    *addTest({ payload, callback }, { call, put }) {
      const response = yield call(httpT, payload);
      if (callback) callback(response);
    },

    *addUser({ payload, callback }, { call, put }){
        const response = yield call(httpP, payload);
        if (callback) callback(response);
    }
    
  },

  reducers: {
    
  },
};
