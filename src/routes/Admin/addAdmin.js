import React from 'react';
// import { connect } from 'dva';
import { Link } from 'dva/router';
import PageHeader from '../../components/PageHeader';
import { Card, Form, Input, Icon, Button, Select, Upload, message, Spin, Tooltip} from 'antd';
import styles from './addAdmin.less';
import { http_server } from '../../config/config';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class Test extends React.Component {
    state = {
        //确认密码框是否输入
        confirmDirty : false,

        //加载中图标
        loading : false,
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    hasErrors = (fieldsError) =>  Object.keys(fieldsError).some(field => fieldsError[field]);

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.props.form.getFieldsValue())
    }

    //检查密码
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    //检查确认密码
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次密码输入不相等');
        } else {
          callback();
        }
    }

    //确认密码框输入完成后设置state
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    //上传头像前检查
    beforeUpload = ( file ) =>{
        const isLt2M = file.size / 1024 / 1024 < 2;
        if(!isLt2M) {
            message.error('上传图片不能超过2m');
        }
        return isLt2M;
    }

    //上传头像进度
    onImageChange = (info) =>{

        if (info.file.status === 'uploading') {
            this.setState({
                loading : true
            })
            return;
        }

        if (info.file.status === 'done') {
            this.setState({
                loading : false
            }, ()=>{ message.success('上传成功') })
            return;
        }
    }

    //上传头像只能上传一次
    ImageOneCheck = () => {
        let value = this.props.form.getFieldValue('upload');
        if( typeof(value) === "undefined" ){
            return false;
        }else{
            if(value.length === 0){
                return false;
            }else{
                return true;
            }
        }
    }

    normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    render(){
        const { form } = this.props;
        const { loading } = this.state;
        const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError} = form;

        const nameError = isFieldTouched('name') && getFieldError('name');
        const phoneError = isFieldTouched('phone') && getFieldError('phone');
        const statusError = isFieldTouched('status') && getFieldError('status');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const confirmError = isFieldTouched('confirm') && getFieldError('confirm');

        const breadcrumbList = [{
            title: '首页',
            href: '/',
        }, {
            title: '添加管理员'
        }];

        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
              md: { span: 12 },
            },
        };

        const submitFormLayout = {
            wrapperCol: {
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 6 },
              md: { span: 12, offset: 6},
            },
        };

        return(
            <div className={`${styles.layout} adminForm`}>
               <PageHeader
                className="tabs"
                title={<div className="title">添加管理员</div>}
                content={<div className="content">添加管理员页面用于收集新增管理员信息，系统生成一个新的管理员用户</div>}
                breadcrumbList={breadcrumbList}
                linkElement	= {Link}
                />
                <Spin spinning={ loading }>
                <Card bordered={false} className={styles.form}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem label="姓名" {...formItemLayout} 
                        help={nameError || ''}
                        validateStatus={nameError? 'error' : '' }>
                            {getFieldDecorator('name', {
                                rules : [
                                    { required : true, message: '姓名不能为空'},
                                ],
                            })(
                                <Input placeholder="请输入真实姓名"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                 />
                            )}
                        </FormItem>
                        <FormItem label="电话" {...formItemLayout}
                        help={phoneError || ''}
                        validateStatus={phoneError? 'error' : '' }>
                            {getFieldDecorator('phone', {
                                rules : [
                                    { required: true, message: '电话不能为空'},
                                    { pattern : /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, message: '请输入正确的电话号码'}
                                ],
                            })(
                                <Input placeholder="请输入电话"
                                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                 />
                            )}
                        </FormItem>
                        <FormItem label="职务" {...formItemLayout}
                        help={statusError || ''}
                        validateStatus={statusError? 'error' : '' }>
                            {getFieldDecorator('status', {
                                rules : [
                                    { required: true, message: '职务不能为空'},
                                ],
                                initialValue : 'girl'
                            })(
                                <Select>
                                    <Option value="girl">职员</Option>
                                    <Option value="admin">管理员</Option>
                                    <Option value="superAdmin">超级管理员</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}
                        help={passwordError || ''}
                        validateStatus={passwordError? 'error' : '' }>
                            {getFieldDecorator('password', {
                                rules : [
                                    { required: true, message: '密码不能为空'},
                                    { validator : this.validateToNextPassword}
                                ]
                            })(
                                <Input type="password" placeholder="请输入密码"/>
                            )}
                        </FormItem>
                        <FormItem label="确认密码" {...formItemLayout}
                        help={confirmError || ''}
                        validateStatus={confirmError? 'error' : '' }>
                            {getFieldDecorator('confirm', {
                                rules : [
                                    { required: true, message: '确认密码不能为空'},
                                    { validator : this.compareToFirstPassword}
                                ]
                            })(
                                <Input type="password" placeholder="请再次输入密码" onBlur={this.handleConfirmBlur}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={(
                            <span>
                                头像&nbsp;
                                <Tooltip title="不上传则使用默认头像">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        )}>
                        {getFieldDecorator('upload', {
                            valuePropName: 'fileList',
                            getValueFromEvent : this.normFile,
                        })(
                            <Upload name="avatar" listType="picture" accept ="image/jpg,image/jpeg,image/png,image/bmp"
                            beforeUpload={this.beforeUpload} className={'upload-list-inline'} onChange={this.onImageChange}
                            data = {{type : 'adminAvatar'}} withCredentials action={`${http_server}/upload/avatar`}>
                                <Button disabled={this.ImageOneCheck()}>
                                    <Icon type="upload" />上传图片
                                </Button>
                            </Upload>
                        )}
                        </FormItem>
                        <FormItem {...submitFormLayout}>
                            <Button type="primary" htmlType="submit" style={{width:'100%'}} 
                            icon="user-add" disabled={this.hasErrors(getFieldsError())}>
                                提交
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
                </Spin>
            </div>
        )
    }
}
