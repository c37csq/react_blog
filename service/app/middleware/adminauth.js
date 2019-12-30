/**
 * 后台验证用户
 */

module.exports = options => {
  return async function adminauth(ctx,next){
    if(ctx.session.openId){
      await next()
    } else {
      ctx.body = {data: '没有进行登录'}
    }
  }
}