//http://www.sencha.com/forum/showthread.php?142287-phonegap-and-sencha-touch
//https://developers.google.com/maps/documentation/javascript/examples/

// To make Geolocation work for Android Emulator:
//   http://stackoverflow.com/questions/4169061/android-emulator-having-issues-with-geolocation
//   add enableHighAccuracy into geolocation.js getCurrentPosition:
//   	navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
//	Then I had to telnet into the emulator, and geo fix the location(longitude, latitude) you want:
//	kelvin@locahost:~$ telnet localhost 5554
//	Trying 127.0.0.1...
//	Connected to localhost.localdomain.
//	Escape character is '^]'.
//	Android Console: type 'help' for a list of commands
//	OK
//	geo fix 101.689453 3.074695
//	OK
//	quit
//	Connection closed by foreign host.

//http://www.sencha.com/forum/showthread.php?142287-phonegap-and-sencha-touch
//https://developers.google.com/maps/documentation/javascript/examples/

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
    else{x.innerHTML="your browser can't handle Geolocation & Google Maps Awesomeness.";}
}

function showPosition(position)
{
    lat=position.coords.latitude;
    lon=position.coords.longitude;
    latlon=new google.maps.LatLng(lat, lon);
    maparea=document.getElementById('maparea');
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
            x.innerHTML="You denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML="Location info is not available. If on Emulator: Telnet and Set your Location:<a href='http://www.sencha.com/forum/showthread.php?142287-phonegap-and-sencha-touch'>details</a>"
            break;
        case error.TIMEOUT:
            x.innerHTML="User location request timed out. Slowness..."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML="Something went wrong and I'm not going to say what went wrong cuz you are going to learn to be an amazing Mobile Developer."
            break;
    }
}


