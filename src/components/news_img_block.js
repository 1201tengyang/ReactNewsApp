/**
 * Created by 七彩城 on 2017/10/24.
 */
import React from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import {Card} from 'antd'
import PropTypes from 'prop-types'

import '../CSS/newsImgBlock.css'

class NewsImgBlock extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      newsArr:[]
    }
  }
  componentWillMount () {
    let{type,count}=this.props;
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
      .then(response=>{
        let data=response.data;
        this.setState({newsArr:data})
        //console.log(data);
      })
      .catch(error=>{
        console.log(error);
      })
  }

  render () {
    let {title,imgWidth,width}=this.props;
    let {newsArr}=this.state;
    let newsList=newsArr.length?
      (newsArr.map((item,index)=>{
        return (
          <div className="newsImgContainer" key={index}>
            <Link to={`news_detail/${item.uniquekey}`}>
              <div><img style={{width:imgWidth}} src={item.thumbnail_pic_s} alt=""/></div>
              <div style={{width:imgWidth}}>
                <h3>{item.title}</h3>
                <p>{item.author_name}</p>
              </div>
            </Link>
          </div>
        )
      })):
      '暂时没有新闻推送'
    ;
    return (
      <Card title={title} style={{width ,marginBottom:'20px'}}>
        {newsList}
      </Card>
    )
  }
}

NewsImgBlock.propTypes={
  title:PropTypes.string.isRequired,
  type:PropTypes.string.isRequired,
  count:PropTypes.number.isRequired,
  width:PropTypes.string.isRequired,
  imgWidth:PropTypes.string.isRequired
};

export default NewsImgBlock