/**
 * Created by 七彩城 on 2017/10/25.
 */
import React from 'react'
import {Row,Col,Card,Form,Input,Button,message} from 'antd'
import axios from 'axios'

const FormItem=Form.Item;

class NewsComments extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      comments:[],
    }
  }
//组件将要接收props数据或者是接收的props数据发生改变的时候调用的函数
  componentWillReceiveProps (nextProps) {
    //console.log(nestProps);
    let newsId=nextProps.newsId;
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${newsId}`
    axios.get(url)
      .then(response=>{
        let data=response.data;
        let comments=data.map((item,index)=>{
          return{
            username:item.UserName,
            dataTime:item.datetime,
            comment:item.Comments
          }
        });
        this.setState({comments})
        //console.log(comments);
      })
      .catch(error=>{
        console.log(error);
      })
  }

  handleSubmit =(event)=>{
    event.preventDefault()
    let userId=JSON.parse(localStorage.getItem('person_key')||'{}').userId;
    if(!userId){
      message.warning('请先登录')
      return
    }
    // console.log(this.props);
    let newsId=this.props.newsId;
    let comment=this.props.form.getFieldValue('comment');
    if(!comment){
      message.warn('请输入内容')
      return
    }
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${newsId}&commnet=${comment}`
    axios.get(url)
      .then(response=>{
        message.success('评论成功');
        this.props.form.resetFields()
      })
      .catch(error=>{
        message.error('评论失败')
      })
  };

  handleCollection= () =>{
    let newsId=this.props.newsId;
    let userId=JSON.parse(localStorage.getItem('person_key')||'{}').userId;
    if(!userId){
      message.warning('请先登录');
      return
    }
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${newsId}`
    axios.get(url)
      .then(response=>{
        message.success('收藏成功');
      })
      .catch(error=>{
        message.error('收藏失败')
      })
  };


  render () {
    let {getFieldDecorator}=this.props.form;
    let {comments}=this.state;
    let commentList=comments.length?
      (comments.map((item,index)=>{
        return(
          <li key={index}>
            <Card title={item.username} extra={item.dataTime}>
              {item.comment}
            </Card>
          </li>
        )
      })):
      '暂时没有评论';
    return (
      <div>
        <ul>
          {commentList}
        </ul>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label='您的评论'  labelCol={{span:2,offset:11}}>
            {
              getFieldDecorator('comment')(<Input style={{resize:'none'}} type='textarea' />)
            }
          </FormItem>
          <Row>
            <Col span={6} push={10}>
              <Button htmlType='submit' type='primary'>提交评论</Button>&nbsp;
              <Button onClick={this.handleCollection} type='primary'>收藏文章</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default Form.create()(NewsComments);