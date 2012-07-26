function onBodyLoad()
{		
    document.addEventListener("deviceready", onDeviceReady, false);
    
    // If you want to prevent dragging, uncomment this section
    function preventBehavior(e) 
    { 
        e.preventDefault(); 
    };
    document.addEventListener("touchmove", preventBehavior, false);

}


var onDeviceReady = function()
{
    // do your thing!
    // navigator.notification.alert("Cordova Works.")
    console.log("Cordova is Here");
}                      