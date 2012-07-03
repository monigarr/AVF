// http://www.lonhosford.com/lonblog/2012/04/12/phonegap-cordova-accelerometer-html5-canvas-animation-xcode-example/

function onBodyLoad()
{
    document.addEventListener("deviceready",onDeviceReady,false);
}            
/* initialize PhoneGap */
function onDeviceReady()
{
    console.log('PhoneGap Initialized');
}

function getCurrentAcceleration() 
{
    navigator.accelerometer.getCurrentAcceleration(onAccelerationSuccess, onError);
    console.log('getCurrentAcceleration');
}

// Success: Get snapshot of  current acceleration
// Replace this with an animated graphic for fun
function onAccelerationSuccess(acceleration) {
    alert( 'Acceleration X: ' + acceleration.x + ', Acceleration Y: ' + acceleration.y 
          + ', Acceleration Z: ' + acceleration.z );
    console.log('Success. Grab Snapshot of Current Acceleration & Celebrate the Awesomeness.');
}

// Error: Fail to get acceleration
function onError() {
    alert ("onError");
    console.log('Failed to get Acceleration. Back to the Drawing Board Sucka!');
}

