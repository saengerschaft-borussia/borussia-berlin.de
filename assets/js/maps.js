var $ = jQuery.noConflict();

(function ($) {
  'use strict'

    /* ------------------------------------------------- */
    /* =  Contact Map
    /*------------------------------------------------- */

  var contact = {'lat': '52.50373', 'lon': '13.355886'} // Change a map coordinate here!

  var map
  var MY_MAPTYPE_ID = 'custom_style'
  function initialize () {
    var featureOpts = []

    var myLatlng = new google.maps.LatLng(contact.lat, contact.lon)
    var mapOptions = {
      zoom: 12,
      center: myLatlng,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
      },
      mapTypeId: MY_MAPTYPE_ID,
      disableDefaultUI: true,
      zoomControl: true,
      scrollwheel: false
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions)
    var styledMapOptions = {
      name: 'Custom Style'
    }
    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions)
    map.mapTypes.set(MY_MAPTYPE_ID, customMapType)

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      icon: {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 6,
        strokeWeight: 4,
        strokeColor: '#2F2911'
      }
    })
  }
  google.maps.event.addDomListener(window, 'load', initialize)
})(jQuery)
