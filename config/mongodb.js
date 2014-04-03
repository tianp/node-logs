(function(){

    var mongo = require('mongoskin')

    exports.db = mongo.db( "mongodb://localhost:27017/8v-logs", { native_parser:true } )

})()
