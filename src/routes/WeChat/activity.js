import React from 'react';
import PageHeader from '../../components/PageHeader';
import { Link } from 'dva/router';
import styles from './activity.less';
import ListBar from './components/_listBar';
import DrawerForm from './components/_drawerForm';

export default class Activity extends React.Component {

    state = { 
        //抽屉是否显示
        visible: false,

    };

    //显示抽屉
    showDrawer = () => {
        this.setState({
          visible: true,
        });
    };

    //隐藏抽屉
    onClose = () => {
        this.setState({
          visible: false,
        });
    };
    
    render(){
        const breadcrumbList = [{
            title: '首页',
            href: '/',
        }, {
            title: '活动管理'
        }];

        return(
            <div className={styles.layout}>
                <DrawerForm  visible={this.state.visible} title={'添加活动'}
                onClose={this.onClose}/>
                <PageHeader
                className="tabs"
                title={<div className="title">活动管理</div>}
                content={<div className="content">活动管理员页面用于查看当前存在的活动，新增自定义活动</div>}
                breadcrumbList={breadcrumbList}
                linkElement	= {Link}
                />
                <div className={styles.content}>
                    <ListBar ACplusFun={this.showDrawer}/>
                </div>
            </div>
        )
    }
}