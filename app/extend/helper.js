module.exports = {
    url(controller, params={}, expect=[]){
        for(let item in params) {
            expect.push(item);
        }
        //console.log(expect);
    
        var params_arr = [];
    
        for(let key in controller.get()) {
            if ( expect.indexOf(key) == -1) {
                params_arr.push(`${key}=${encodeURIComponent(controller.get(key))}`);
            }
        }
    
        for(let key1 in params) {
            params_arr.push(`${key1}=${encodeURIComponent(params[key1])}`);
        }
    
        //console.log("---------------------------------");
        var url_preix = controller.http.url.split("?");
        if (params_arr.length > 0) {
            return url_preix[0] + "?" + params_arr.join("&");
        }
        return controller.http.url;
    }
}