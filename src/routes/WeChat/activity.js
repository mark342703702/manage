import React from 'react';
import PageHeader from '../../components/PageHeader';
import { Link } from 'dva/router';
import styles from './activity.less';
import ListBar from './components/_listBar';
import { Card } from 'antd';
export default class Activity extends React.Component {
    render(){

        const breadcrumbList = [{
            title: '首页',
            href: '/',
        }, {
            title: '活动管理'
        }];

        return(
            <div className={styles.layout}>
                <PageHeader
                className="tabs"
                title={<div className="title">活动管理</div>}
                content={<div className="content">活动管理员页面用于查看当前存在的活动，新增自定义活动</div>}
                breadcrumbList={breadcrumbList}
                linkElement	= {Link}
                />
                <div className={styles.content}>
                    <ListBar />
                </div>
            </div>
        )
    }
}