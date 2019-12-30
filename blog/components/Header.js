import React, { useState, useEffect } from 'react'
import '../public/style/components/header.css'
import { Col, Row, Menu, Icon } from 'antd'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'
const Header = () => {
  //获取菜单数据
  const [navArray, setNavArray] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then(
        (res) => {
          return res.data.data
        }
      )
      setNavArray(result)
    }
    fetchData()
  }, [])
  //页面跳转
  const handleClick = (e) => {
    if (e.key == 0) {
      Router.push('/index')
    } else {
      Router.push('/list?id=' + e.key)
    }
  }
  return (
    <div className="header">
      <Row type="flex" justify="space-around">
        <Col xs={24} sm={24} md={12} lg={12} xl={10}>
          <span className="header-logo">陈大思</span>
          <span className="header-txt">专注于前端学习，努力学习中。</span>
        </Col>
        <Col xs={0} sm={0} md={12} lg={8} xl={8}>
          <Menu mode="horizontal" onClick={handleClick}>
            <Menu.Item key="0">
              <Icon type="home" />
              首页
             </Menu.Item>
            {
              navArray.map((item) => {
                return (
                  <Menu.Item key={item.Id}>
                    <Icon type={item.icon} />
                    {item.typeName}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}
export default Header