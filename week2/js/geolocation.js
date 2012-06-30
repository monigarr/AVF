//http://www.sencha.com/forum/showthread.php?142287-phonegap-and-sencha-touch


function onBodyLoad()
{		
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady()
{
    phoneGapReady.innerHTML = ("")	
}
var x=document.getElementById("geolocationDemo");

function getLocation()
{
    
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
    else{x.innerHTML="your browser can't handle Geo Awesomeness.";}
}

function showPosition(position)
{
    lat=position.coords.latitude;
    lon=position.coords.longitude;
    latlon=new google.maps.LatLng(lat, lon)
    maparea=document.getElementById('maparea')
    maparea.style.height='250px';
    maparea.style.width='100%';
    console.log("showPosition is coming through. Yay :)");
    
    var myOptions={
    center:latlon,zoom:12,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    mapTypeControl:true,
    navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    };
    var map=new google.maps.Map(document.getElementById("maparea"),myOptions);
    var marker=new google.maps.Marker({position:latlon,map:map,title:"You are here."});
}

function showError(error)
{
    switch(error.code) 
    {
        case error.PERMISSION_DENIED:
            x.innerHTML="User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML="Location info is not available."
            break;
        case error.TIMEOUT:
            x.innerHTML="User location request timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML="Something went wrong and I'm not going to say what went wrong cuz you are going to learn to be an amazing Mobile Developer."
            break;
    }
}

