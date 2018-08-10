import React from 'react';
import { connect } from 'dva';
import Login from 'components/Login';
import styles from './Login.less';
const { Tab, UserName, Password, Submit } = Login;

@connect(({ m_login, loading }) => {
    const { status } = m_login;

    return {
        status,
        submitting : loading.effects['m_login/login'],
    };
})

export default class Test extends React.Component {
    state = {
        type : 'admin' //当前面板所对应key
    }

    //改变面板显示的回调
    onTabChange = (type) =>{
        this.setState({ type });
    }

    //提交
    handleSubmit = (err, values) =>{
        const { type } = this.state;
        const { dispatch } = this.props;
        if(!err){
            this.props.dispatch({
                type : 'm_login/login',
                payload : {
                    ...values,
                    type,
                }
            })
        }
    }

    render(){
        const { submitting } = this.props;
        const { type } = this.state;

        return(
            <div className={styles.main}>
                <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
                    <Tab key="admin" tab="管理员登陆">
                        <UserName name="adminName" placeholder="管理员姓名" />
                        <Password name="adminPassword" placeholder="密码" />
                    </Tab>
                    <Tab key="girl" disabled tab="职员登陆">
                        <UserName name="girlName" placeholder="职员姓名" />
                        <Password name="girlPassword" placeholder="密码" />
                    </Tab>
                    <div>
                        <Submit loading={submitting}>登陆</Submit>
                    </div>
                </Login>
            </div>
        )
    }
}