
var chai = require("chai"),
    expect = chai.expect,
    should = chai.should(),
    db = require('./../config/mongodb').db,
    Events = require( './../models/event').Events


describe( "Events Model", function() {


    var data = {

        "channel": "8v-manage-server",
        "event": "login",
        "ip": "127.0.0.1"
    }


    describe( "Save", function() {

        it( "Should save the expert data into database", function( done ){

            var events = new Events( data )

            events.save(function ( error, savedEvent ){

                should.not.exist( error )

                should.exist( savedEvent )

                savedEvent.should.be.an( 'array' )

                savedEvent[0].should.be.an( 'object' )

                data.id = savedEvent[0]._id

                done()

                events.remove( data.id )

            })

        })

    })

})
