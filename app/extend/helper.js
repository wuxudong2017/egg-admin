const sd = require('silly-datetime')

module.exports = {
    formatDate(val){
        return sd.format(val,'YYYY-MM-DD HH:mm:ss')
    }

}