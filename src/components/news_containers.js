/**
 * Created by 七彩城 on 2017/10/23.
 */
import React from 'react'
import {Link} from 'react-router'
import {Row,Col,Carousel,Tabs} from 'antd'

import NewsImgBlock from './news_img_block'
import NewsBlock from './news_block'
import NewsProduct from './news_product'


import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'

import '../CSS/newsContainer.css'

const TabPane=Tabs.TabPane;

class NewsContainer extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className="newsContainer">
        <Row>
          <Col span={1}> </Col>
          <Col span={22}>
            <div className="leftContainer1">
              <Carousel  autoplay>
                <div className="carousel"><img src={carousel_1} alt=""/></div>
                <div className="carousel"><img src={carousel_2} alt=""/></div>
                <div className="carousel"><img src={carousel_3} alt=""/></div>
                <div className="carousel"><img src={carousel_4} alt=""/></div>
              </Carousel>
              <NewsImgBlock type="guoji" count={6} width="100%" imgWidth="115px" title="国际头条"/>
            </div>
            <Tabs className='news_tab'>
              <TabPane tab="娱乐新闻" key="1">
                <NewsBlock type='yule' count={25} />
              </TabPane>
              <TabPane tab="科技新闻" key="2" >
                <NewsBlock type='keji' count={26} />
              </TabPane>
            </Tabs>
            <Tabs className='react_product'>
              <TabPane tab="ReactProduct" key="3" >
                <NewsProduct />
              </TabPane>
            </Tabs>
            <div className="img_footer">
              <NewsImgBlock type="guonei" count={9} width="100%" imgWidth="115px" title="国内新闻"/>
              <NewsImgBlock type="yule" count={18} width="100%" imgWidth="115px" title="娱乐新闻"/>
            </div>
          </Col>
          <Col span={1}> </Col>
        </Row>
      </div>
    )
  }
}
export default NewsContainer