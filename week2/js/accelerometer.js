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
function onAccelerationSuccess(acceleration) {
    alert( 'Acceleration X: ' + acceleration.x + ', Acceleration Y: ' + acceleration.y 
          + ', Acceleration Z: ' + acceleration.z );
    console.log('Sucess. Get Snapshot of Current Acceleration');
}

// Error: Fail to get acceleration
function onError() {
    alert ("onError");
    console.log('Failed to get Acceleration');
}
                
