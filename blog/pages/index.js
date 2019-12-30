import React, { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import { Row, Col, List, Icon } from 'antd'
import Link from 'next/link'
import axios from 'axios'
import '../public/style/pages/index.css'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import servicePath from '../config/apiUrl'
const Home = (list) => {
  const [myList, setMyList] = useState(list.data)
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function(code){
      return hljs.highlightAuto(code).value
    }
  })
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify='center'>
        <Col className="comm-left" xs={24} sm={24} md={16} lg={14} xl={14}>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                    <a>{item.title}</a>
                </Link>
                </div>
                <div className="list-icon">
                  <span><Icon type="calender"/> {item.addTime}</span>
                  <span><Icon type="folder"/> {item.typeName}</span>
                  <span><Icon type="fire"/> {item.view_count}人</span>
                </div>
            <div className="list-context"
                dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                >
                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={5}>
          <Author/>
      </Col>
      </Row>
      <Footer/>
    </div>
  )
}

//获取接口数据
Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then(
      (res) => {
        resolve(res.data)
      }
    )
  })
  return await promise
}

export default Home
