//http://www.sencha.com/forum/showthread.php?142287-phonegap-and-sencha-touch
//https://developers.google.com/maps/documentation/javascript/examples/

	function onBodyLoad()
	{		
		document.getElementById('geolocation').empty();
		document.addEventListener("deviceready", onDeviceReady, false);
	}

	function onDeviceReady()
	{
		// do your thing!
		 phoneGapReady.innerHTML = ("")
		}
		var x=document.getElementById("demo");
		
          function getLocation()
          {
              if (navigator.geolocation)
              {
                  navigator.geolocation.getCurrentPosition(showPosition,showError);
              }
              else{x.innerHTML="Your Browser does not support Geolocation.";}
          }
          
          function showPosition(position)
          {
              lat=position.coords.latitude;
              lon=position.coords.longitude;
              latlon=new google.maps.LatLng(lat, lon);
              mapholder=document.getElementById('mapholder')
              mapholder.style.height='250px';
              mapholder.style.width='100%';
              
              var myOptions={
                  center:latlon,zoom:14,
                  mapTypeId:google.maps.MapTypeId.ROADMAP,
                  mapTypeControl:false,
                  navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
              };
              var map=new google.maps.Map(document.getElementById("mapholder"),myOptions);
              var marker=new google.maps.Marker({position:latlon,map:map,title:"Your Location."});
          }
          
          function showError(error)
          {
              switch(error.code) 
              {
                  case error.PERMISSION_DENIED:
                  x.innerHTML="User did not allow Geolocation."
                  break;
                  case error.POSITION_UNAVAILABLE:
                  x.innerHTML="Location Data is not Available."
                  break;
                  case error.TIMEOUT:
                  x.innerHTML="Request Timed Out."
                  break;
                  case error.UNKNOWN_ERROR:
                  x.innerHTML="Unknown Error."
                  break;
              }
          }