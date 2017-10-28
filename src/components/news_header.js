/**
 * Created by 七彩城 on 2017/10/23.
 */
import React from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import {
  Row,
  Col,
  Menu,
  Icon,
  Button,
  Modal,
  Tabs,
  Form,
  Input,
  message
} from 'antd'

import logo from '../images/logo.png'

const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class NewsHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'top',
      username: null,
      userId: null,
      isShow: false
    }
  }

  componentWillMount(){
    let obj=JSON.parse(localStorage.getItem('person_key'));
    if(obj){
      this.setState({
        username:obj.username,
        userId:obj.userId
      })
    }
  }

  changeKey = ({item, key}) => {
    this.setState({key});
    if (key === 'loginAndRegister') {
      this.props.form.resetFields();
      this.setState({isShow: true})
    }
  };
  handleShow = (isShow) => {
    this.setState({isShow})
  };
  handleSubmit = (isLogin, event) => {
    event.preventDefault();
    let action = isLogin ? 'login' : 'register';
    let {username, password, r_userName, r_password, r_confirmPassword} = this.props.form.getFieldsValue();
    // console.log(this.props.form.getFieldsValue());
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${username}&password=${password}&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`

    axios.get(url)
      .then(response => {
        let data = response.data;
        // console.log(data);
        if (isLogin) {
          if (data) {
            message.success('登录成功！');
            this.setState({username: data.NickUserName,userId:data.UserId});
            this.setState({isShow: false});

            let {username,userId}=this.state;
            let obj={username,userId};
            localStorage.setItem('person_key',JSON.stringify(obj))
          } else {
            message.error('请输入正确的用户名或密码')
          }
        } else {
          if (!r_userName || !r_password || !r_confirmPassword || r_password !== r_confirmPassword) {
            message.error('输入有误，请重新输入')
            return;
          }else{
            message.success('恭喜用户注册成功！')
            this.setState({isShow: false})
          }

        }
      })
      .catch(error => {
        message.error('请求数据失败')
      })
  };
  handleOut = () => {
    this.setState({username: null, userId: null})
    localStorage.removeItem('person_key')
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    let {key, username} = this.state;
    let UserItem = !username ? (
      <MenuItem className="register" key="loginAndRegister">
        <Icon type="appstore"/>登录/注册
      </MenuItem>
    ) : (
      <MenuItem  className="register" key="userCenter">
        <Button type="primary"> {username}</Button>&nbsp;
        <Button type="dashed"><Link to="usercenter">个人中心</Link></Button>&nbsp;
        <Button onClick={this.handleOut}>退出</Button>
      </MenuItem>
    );
    return (
      <div>
        <Row>
          <Col span={1}> </Col>
          <Col span={3}>
            <div className="logo">
              <a href="#"><img src={logo} alt=""/></a>
              <span>ReactNews</span>
            </div>
          </Col>
          <Col span={19}>
            <Menu mode='horizontal' selectedKeys={[key]} onClick={this.changeKey}>
              <MenuItem key="top">
                <Icon type="appstore"/> 头条
              </MenuItem>
              <MenuItem key="shehui">
                <Icon type="appstore"/> 社会
              </MenuItem>
              <MenuItem key="guonei">
                <Icon type="appstore"/>国内
              </MenuItem>
              <MenuItem key="guoji">
                <Icon type="appstore"/>国际
              </MenuItem>
              <MenuItem key="yule">
                <Icon type="appstore"/>娱乐
              </MenuItem>
              <MenuItem key="tiyu">
                <Icon type="appstore"/>体育
              </MenuItem>
              <MenuItem key="keji">
                <Icon type="appstore"/>科技
              </MenuItem>
              <MenuItem key="shishang">
                <Icon type="appstore"/>时尚
              </MenuItem>
              {UserItem}
            </Menu>
            <Modal
              title='用户中心'
              visible={this.state.isShow}
              okText='关闭'
              onOk={this.handleShow.bind(this, false)}
              onCancel={this.handleShow.bind(this, false)}
            >
              <Tabs onChange={() => this.props.form.resetFields()}>
                <TabPane tab="登录" key="1">
                  <Form onSubmit={this.handleSubmit.bind(this, true)}>
                    <FormItem label='用户名'>
                      {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username!'}],
                      })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="请输入用户名"/>
                      )}
                    </FormItem>
                    <FormItem label='密码'>
                      {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your password!'}],
                      })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type='password' placeholder="请输入密码"/>
                      )}
                    </FormItem>
                    <Button htmlType='submit' type='primary'>登录</Button>
                  </Form>
                </TabPane>

                <TabPane tab="注册" key="2">
                  <Form onSubmit={this.handleSubmit.bind(this, false)}>
                    <FormItem label='用户名'>
                      {getFieldDecorator('r_userName', {
                        rules: [{required: true, message: 'Please input your username!'}],
                      })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="请输入用户名"/>
                      )}
                    </FormItem>
                    <FormItem label='密码'>
                      {getFieldDecorator('r_password', {
                        rules: [{required: true, message: 'Please input your password!'}],
                      })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type='password' placeholder="请输入密码"/>
                      )}
                    </FormItem>
                    <FormItem label='确认密码'>
                      {getFieldDecorator('r_confirmPassword', {
                        rules: [{required: true, message: 'Please confirm your password!'}],
                      })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type='password' placeholder="请确认密码"/>
                      )}
                    </FormItem>
                    <Button htmlType='submit' type='primary'>注册</Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={1}> </Col>
        </Row>
      </div>
    )
  }
}
export default Form.create()(NewsHeader);