module.exports = (options,app)=>{
    return async function authAdmin(ctx,next){
            let pathName = ctx.request.url;
            ctx.state.csrf = ctx.csrf;
            // console.log(ctx.request.query.page)
            ctx.state.pageNum = ctx.request.query.page?ctx.request.query.page : 1;
            ctx.state.pathName = pathName;
            if(ctx.session.userInfo){
                let hasAuth = await ctx.service.admin.admin.checkAuth();
                let {accessListA,isSuper} = await ctx.service.admin.admin.getAside()
                //console.log(`hasAuth----->${hasAuth}`)
                if(hasAuth){
                    ctx.state.asideList = accessListA
                    // console.log(`asideList---------->${JSON.stringify(accessListA)}`)
                    ctx.state.isSuper = isSuper
                    if(pathName.indexOf('/login')>-1){
                        await ctx.redirect('/admin')
                    }else{
                        
                        await next()
                    }
                   
                }else{
                    ctx.body ={
                        code:0,
                        message: "你没有权限操作",
                        data:null
                    }
                  //await next()
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