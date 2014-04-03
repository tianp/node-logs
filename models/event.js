(function(){

    var _ = require('underscore'),
        mongo = require('mongoskin'),
        uuid = require('node-uuid'),
        moment = require('moment'),
        db = require('./../config/mongodb').db


    moment().zone( 7 )


    db.bind( 'events' ).bind({

        save: save,
        hardRemove: hardRemove
    })


    function save( event, callback ){

        // list of default values
        event._id = uuid.v1()
        event.timestamp = moment().unix()

        this.insert( event, callback )
    }


    function hardRemove( id, callback ){

        var query = { '_id' : id }

        var sort = [ [ '_id', 1 ] ]

        this.findAndRemove( query, sort, callback )

    }

    var Model = {}

    _.extend( Model, db.events )


    var Events = function( event ){

        if( !_.isUndefined( event ) && !_.isNull( event ) && _.isObject( event ) ){

            _.extend( this, event )
        }

    }

    Events.prototype.save = function( callback ) {

        var self = this
        var prop = Object.getOwnPropertyNames( this )
        var data = {}

        _.each( prop, function( propName, index ){

            data[ propName ] = self[ propName ]

        })

        Model.save( data, callback )
    }

    Events.prototype.remove = function( id, callback ) {

        Model.hardRemove( id, callback )

    }


    exports.Events = Events

})()
