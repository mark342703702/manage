import React from 'react';
// import { connect } from 'dva';
import { Link } from 'dva/router';
import PageHeader from '../../components/PageHeader';
import { Card } from 'antd';
import styles from './addAdmin.less';



export default class Test extends React.Component {
    state = {

    }

    render(){
        const breadcrumbList = [{
            title: '首页',
            href: '/',
        }, {
            title: '添加管理员'
        }];

        return(
            <div className={styles.layout}>
               <PageHeader
                className="tabs"
                title={<div className="title">添加管理员</div>}
                content={<div className="content">添加管理员页面用于收集新增管理员信息，系统生成一个新的管理员用户</div>}
                breadcrumbList={breadcrumbList}
                linkElement	= {Link}
                />
                <Card bordered={false} className={styles.form}>
                    
                </Card>
            </div>
        )
    }
}