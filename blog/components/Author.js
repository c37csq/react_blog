import React from 'react';
import {Avatar,Divider} from 'antd'
import '../public/style/components/author.css'
const Author = () => {
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="../../style/img/Avatar.jpg"/>
            </div>
            <div className="author-introduction">
                专注于前端和网页开发和学习，为自己的梦想奋斗，努力学习中。
                <Divider>社交账号</Divider>
                <Avatar size={28} icon="github" className="account"/>
                <Avatar size={28} icon="qq" className="account"/>
                <Avatar size={28} icon="wechat" className="account"/>
            </div>
        </div>
    )
}
export default Author