export default {
    namespace : 'm_global',

    state: {
        //全局菜单折叠状态 false为不折叠, true为折叠
        collapsed: false,
    },

    effects : {
        
    },

    reducers : {
        //改变菜单折叠状态
        changeLayoutCollapsed(state, { payload }) {
            return {
                ...state,
                collapsed: payload,
            };
        },
    }
}
