module.exports = (options,app)=>{
    return async function authAdmin(ctx,next){
            let pathName = ctx.request.url;
            ctx.state.csrf = ctx.csrf;
            ctx.state.pathName = pathName;
            if(ctx.session.userInfo){
                if(pathName.indexOf('/login')>-1){
                    await ctx.redirect('/admin')
                }else{
                    await next()
                }
            }else{
                if(pathName.indexOf('/login')>-1 || pathName.indexOf('/admin/captcha')>-1){
                    await next()
                }else{
                    await ctx.redirect('/admin/login')
                }
            }
    }
}