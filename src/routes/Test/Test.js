import React from 'react';
import { connect } from 'dva';
import { Upload, Button, Icon, message } from 'antd';
import styles from './Test.less';

@connect(({ test }) => {
    const { data } = test;
    return {
        data
    };
})


export default class Test extends React.Component {
    state = {
        
    }

    componentWillMount(){
        this.props.dispatch({
            type : 'test/addTest',
            callback : (res) => {
                console.log(res)
            }
        })
    }

    render(){
        const fileList = [{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          }, {
            uid: '-2',
            name: 'yyy.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }];

        const props = {
            action: '/upload/avatar',
            listType: 'picture',
            className: 'upload-list-inline',
        };

        const props1 = {
            name: 'file',
            action: '/upload/avatar',
            headers: {
              authorization: 'authorization-text',
            },
            onChange(info) {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
          };


        return(
            <div className="test">
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> Upload
                    </Button>
                </Upload>
                <Upload {...props1}>
                    <Button>
                    <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>
            </div>
        )
    }
}