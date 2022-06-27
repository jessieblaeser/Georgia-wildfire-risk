mapboxgl.accessToken = 'pk.eyJ1IjoiamJsYWVzZXIiLCJhIjoiY2t4OGVtY3FmMTh6YTJ4cXU1NWY5aXUxMiJ9.DJNRPOrzDpL4YDzTQXxaCQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jblaeser/cl4lqdgsm000j14m1qtpzum5d',
    zoom: 5,
    maxZoom: 9,
    minZoom: 3,
    center: [-82.9, 32.2]

});

map.on("load", function () {
    // this is the funciton that finds the first sympbol layer
    let layers = map.getStyle().layers;
    for(var i = 0; i <layers.length; i++) {
        console.log(layers[i].id);
    }



    map.addLayer(
        {
          id: "meanWHP",
          type: "fill",
          source: {
            type: "geojson",
            data: "data/ga_wildfire.geojson",
          },
          minzoom: 0,


          paint: {
            'fill-color': [
            //'rgba(61,153,80,0.55)'
      

                 'interpolate',
                ['linear'],
              ["get", "Mean WHP"],
              0,
              "#ffffcc",
              150.25,
              "#ffeda0",
              300.5,
              "#fed976",
              450.75,
              "#feb24c",
              601,
              "#fd8d3c",
              751.25,
              "#fc4e2a",
              901.50,
              "#e31a1c",
              1051.75,
              "#b10026",
              1202,
              "#ffffff"],
          
           "fill-outline-color": "#ffffff",
            
    
        }
      
        },
        "waterway-label"
      );

      map.addLayer({
        id: "consvLands",
        type: "fill",
        source: {
          type: "geojson",
          data: "data/gaConsvLands.geojson",
        },
        maxzoom: 6,
        paint: {
          "fill-color": "#41ab5d",
          "fill-opacity": 0.4,
          
          "fill-outline-color": "#ffffff",
       
  
        },
      }, "waterway-label");
     

  });

 // Create the popup
map.on('click', 'meanWHP', function (e) {
    var meanWHP = e.features[0].properties['Mean WHP'];
    var meanWHPStatePerc =  e.features[0].properties['Mean WHP percentile within state'];
    var county =  e.features[0].properties['NAME_x'];
    
    meanWHP = meanWHP;
    meanWHPStatePerc = (meanWHPStatePerc * 100).toFixed(0);
    county = county;
  
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h2>'+county+' County'+'</h2>'
            +'<h4>'+'Mean Wildfire Hazard: '+meanWHP+'</h4>'
            +'<h4>'+'Mean Wildfire Hazard Percentile within Georgia '+meanWHPStatePerc+'%'+'</h4>'
            )
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map.on('mouseenter', 'meanWHP', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'meanWHP', function () {
    map.getCanvas().style.cursor = '';
});




//Map 2
mapboxgl.accessToken = 'pk.eyJ1IjoiamJsYWVzZXIiLCJhIjoiY2t4OGVtY3FmMTh6YTJ4cXU1NWY5aXUxMiJ9.DJNRPOrzDpL4YDzTQXxaCQ';
var map2 = new mapboxgl.Map({
  container: 'map2',
    style: 'mapbox://styles/jblaeser/cl4lqdgsm000j14m1qtpzum5d',
    zoom: 5,
    maxZoom: 9,
    minZoom: 3,
    center: [-82.9, 32.2]
});

map2.on("load", function () {
    // this is the funciton that finds the first sympbol layer
    let layers = map2.getStyle().layers;
    for(var i = 0; i <layers.length; i++) {
        console.log(layers[i].id);
    }


    
    map2.addLayer(
      {
        id: "drought",
        type: "fill",
        source: {
          type: "geojson",
          data: "data/current_drought.geojson",
        },
        minzoom: 0,

        paint: {
          'fill-color': [
         
            'interpolate', 
              ['linear'],
            ["get", "DM"],
              0,
              "#ffffd4",
              1,
              "#fed98e",
              2,
              "#fe9929",
              3,
              "#d95f0e",
              4,
              "#993404",
              5,
              "#ffffff"],
          
            "fill-outline-color": "#ffffff",
          
  
      }
      },
      "waterway-label"
    );

    map2.addLayer(
      {
        id: "gaCounties",
        type: "line",
        source: {
          type: "geojson",
          data: "data/gaCounties.geojson",
        },
        paint: {
          "line-color": "#a4a4a4",
          "line-width": 0.25,
        },
      },
      "waterway-label"
    );

     // Create the popup
map2.on('click', 'drought', function (e) {
  var droughtRank =  e.features[0].properties['DM'];
  var explanation = droughtSeverity(e.features[0].properties['DM']);


  
  droughtRank = droughtRank;
  explanation = explanation
  
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>'+explanation+'</h4>')
      .addTo(map2);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map2.on('mouseenter', 'drought', function () {
  map2.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map2.on('mouseleave', 'drought', function () {
  map2.getCanvas().style.cursor = '';
});
})

function droughtSeverity(d) {
  if (d == 0) {
      return "Abnormally dry "
  }
  else if (d == 1) {
    return "Moderate drought"
 }
 else if (d == 2) {
  return "Severe drought"
}
else if (d == 3) {
  return "Extreme drought"
}
else if (d == 4) {
  return "Exceptional drought"
}
  }
