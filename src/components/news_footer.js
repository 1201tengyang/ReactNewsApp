/**
 * Created by 七彩城 on 2017/10/24.
 */
import React from 'react'
import {Row,Col} from 'antd'

import '../CSS/pc.css'

class NewsFooter extends  React.Component{
  render () {
    return(
      <Row>
        <Col span={24}><p className="footer">&copy; 2016 ReactNews. All Rights Reserved</p></Col>
      </Row>
    )
  }
}
export default NewsFooter