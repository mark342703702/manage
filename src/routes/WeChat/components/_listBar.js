import React from "react";
import styles from './_listBar.less';
import { Card , Icon, Button} from 'antd';
const { Meta } = Card;
export default class ListBar extends React.Component {

    render(){
        const { ACplusFun } = this.props; 
        return (
            <div className={styles.layout}>
                <div className={`${styles.item} ${styles.add}`}>
                  <Button type="dashed" className={styles.newButton} onClick={ACplusFun}>
                        <Icon type="plus" /> 新增产品
                  </Button>
                </div>
                <div className={styles.item}>
                    <Card 
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" height="145"/>}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                    style={{ width: 240 }} bordered={true} hoverable>
                        <Meta
                        title="Europe Street beat"
                        description="www.instagram.com"
                        />
                    </Card>
                </div>
                <div className={styles.item}>
                    <Card 
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" height="145"/>}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                    style={{ width: 240 }} bordered={true} hoverable>
                        <Meta
                        title="Europe Street beat"
                        description="www.instagram.com"
                        />
                    </Card>
                </div>
                
            </div>
        )
    }
}

