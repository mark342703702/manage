import React from "react";
import styles from './_listBar.less';
import { Drawer, Button } from 'antd';
export default class DrawerForm extends React.Component{
  
    render(){
        const { visible, onClose, title } = this.props;
        return (
            <div>
                <Drawer title={title}
                placement="right" closable={false}
                onClose={onClose} visible={visible}
                >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                </Drawer>
            </div>
        )
    }
}