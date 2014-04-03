(function(){

    var express = require('express'),
        Events = require('./models/event').Events

    var app = express()

    app.use( express.bodyParser() )

    app.post('/:channel/:eventName', function( request, response ){

        var event = request.body

        event.channel = request.params.channel
        event.name = request.params.eventName

        var events = new Events( event )

        events.save(function ( error, result ){

            if( error ){

                 // code breaks
                response.status(400).jsonp({ "message": "Events not recorded" })
                return

            }

             response.jsonp(result)

        })

    })


    app.listen( 9001 )

})()
