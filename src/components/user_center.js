/**
 * Created by 七彩城 on 2017/10/23.
 */
import React from 'react'
import {Tabs,Row,Col,notification,Card,Upload,Modal,Icon} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'


const TabPane=Tabs.TabPane;

notification.config({
  placement: 'topLeft',
  top:150
});

class UserCenter extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      comments:[],
      collections:[],
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }]
    }
  }


  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })



  componentWillMount () {
    let userId=JSON.parse(localStorage.getItem('person_key')).userId;
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
    axios.get(url)
      .then((response)=>{
        let data=response.data;
        let comments=data.map((item,index)=>{
          return {
            dateTime:item.datetime,
            comment:item.Comments,
            uniquekey:item.uniquekey,
          }
        })
        this.setState({comments})
      })
      .catch((error)=>{
        notification['error']({
          message: 'ReactNews',
          description: '数据加载失败',
        });
      })

    //收藏列表
      url =`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
    axios.get(url)
      .then((response)=>{
        let data=response.data;
        let collections=data.map((item,index)=>{
          return {
            uniquekey:item.uniquekey,
            title:item.Title
          }
        })
        this.setState({collections})
      })
      .catch((error)=>{

      })
  }

  render () {

    let {comments}=this.state;
    //console.log(comments);
    let myComment=comments.length?
      (
        comments.map((item,index)=>{
          return (
            <li key={index}>
              <Card title={`于${item.dateTime}品论了${item.uniquekey}`} extra={<Link to={`/news_detail/${item.uniquekey}`}>查看</Link>}>
                {item.comment}
              </Card>
            </li>
          )
        })
      ):(
        '暂无评论'
      )

    let {collections}=this.state;
    let myCollections=comments.length?
      (
        collections.map((item,index)=>{
          return (
            <li key={index}>
              <Card title={`${item.uniquekey}`} extra={<Link to={`/news_detail/${item.uniquekey}`}>查看</Link>}>
                {item.title}
              </Card>
            </li>
          )
        })
      ):(
        '暂无收藏'
      )


    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <Tabs>
              <TabPane tab="我的评论" key="1">
                <ul>
                  {myComment}
                </ul>
              </TabPane>
              <TabPane tab="我的收藏" key="2">
                <ul>
                  {myCollections}
                </ul>
              </TabPane>
              <TabPane tab="上传图片" key="3" className="clearfix">
                <Upload
                  action="//jsonplaceholder.typicode.com/posts/"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                  multiple={true}
                >
                  {uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    )
  }
}
export default UserCenter