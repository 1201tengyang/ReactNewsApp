/**
 * Created by 七彩城 on 2017/10/23.
 */
import React from 'react'
import {Row,Col,BackTop} from 'antd'
import axios from 'axios'

import NewsComments from './news_comments'
import NewsImgBlock from './news_img_block'




class NewsDetail extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      news:null
    }
  }

  //定义公共函数
  getNews=()=>{
    let newsId=this.props.params.newsId;
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${newsId}`
    axios.get(url)
      .then(response=>{
        let data=response.data
        //console.log(data);
        this.setState({
          news:data.pagecontent
        })
      })
      .catch(error=>{
        console.log(error);
      })
  };

  componentWillMount () {
   this.getNews()
  }

  //解决点击详情页右侧新闻不能跳转的问题
  componentWillReceiveProps(nextProps){
    this.getNews()
  }




  render () {
    let {news}=this.state
    return (
      <div>
        <BackTop visibilityHeight={1000}/>
        <Row>
          <Col span={1}> </Col>
          <Col span={16}>
            <div dangerouslySetInnerHTML={{__html:news}}></div>
            <NewsComments newsId={this.props.params.newsId}/>
          </Col>
          <Col span={6}>
            <NewsImgBlock title='科技新闻' type='keji' count={16}  width="300px" imgWidth='120px'/>
          </Col>
          <Col span={1}> </Col>
        </Row>
      </div>
    )
  }
}
export default NewsDetail