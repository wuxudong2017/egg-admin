$.fn.extend({
    // form 表单数据格式化
 ObjectForm:function(val) {
    let l = {};
    var arr = val.split('&');
    arr.forEach((item) => {
        let t = item.split('=');
        l[t[0]] = t[1]
    })
    return l;
}
    
})