'use strict'

const Controller = require('egg').Controller

class MainController extends Controller{
  async index(){
    this.ctx.body = '你好'
  }
  async checkLogin(){
    let userName = this.ctx.request.body.userName
    let password = this.ctx.request.body.password
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
                "' AND password = '" + password + "'"
    const res = await this.app.mysql.query(sql)
    if(res.length > 0){
      let openId = new Date().getTime()
      this.ctx.session.openId = {'openId': openId}
      this.ctx.body = {'data': '登录成功','openId':openId}
    } else {
      this.ctx.body = {'data': '登录失败'}
    }
  }
  //获取文章类别信息
  async getTypeInfo(){
    const resType = await this.app.mysql.select('type')
    this.ctx.body = {data: resType}
  }
  //添加文章
  async addArticle(){
    //获取前台要添加的数据
    let tempArticle = this.ctx.request.body
    //插入数据到数据库的article表中
    const result = await this.app.mysql.insert('article',tempArticle)
    //判断插入是否成功
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId
    //返回是否插入成功和插入成功的ID
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId: insertId
    }
  }
  //修改文章
  async updateArticle(){
    let tempArticle = this.ctx.request.body
    const result = await this.app.mysql.update('article',tempArticle)
    const updateSuccess = result.affectedRows === 1
    this.ctx.body = {
      isSuccess: updateSuccess
    }
  }
  //获取文章列表
  async getArticleList(){
    let sql = 'SELECT article.id as id ,'+
              'article.article_title as title ,' +
              'article.article_introduce as introduce ,' +
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," +
              'article.view_count as view_count ,' +
              'type.typeName as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.Id ' + 
              'ORDER BY article.id DESC'
    const resList = await this.app.mysql.query(sql)
    this.ctx.body = {list: resList}
  }
  //删除文章
  async deleteArticle(){
    //获取删除文章ID
    let id = this.ctx.params.id
    const res = await this.app.mysql.delete('article',{'id': id})
    this.ctx.body = {data: res}
  }
  //修改文章获取文章ID
  async getArticleById(){
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id ,'+
              'article.article_title as title ,' +
              'article.article_introduce as introduce ,' +
              'article.article_content as article_content ,' +
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime ," +
              'article.view_count as view_count ,' +
              'type.typeName as typeName ,' +
              'type.id as typeId ' + 
              'FROM article LEFT JOIN type ON article.type_id = type.Id ' + 
              'WHERE article.id =' + id
              const result = await this.app.mysql.query(sql)
              this.ctx.body = {data: result}
  }
}

module.exports = MainController