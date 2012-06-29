var imageSource; // image source
var destinationType; // sets format of returned value


function onBodyLoad()
{
    document.addEventListener("deviceready",onDeviceReady,false);
}

/* PhoneGap is initialized */
function onDeviceReady()
{
    phoneGapReady.innerHTML = "";
    imageSource=navigator.camera.imageSourceType;
    destinationType=navigator.camera.DestinationType;
    console.log('Initialize PhoneGap');
}

// Call when Image successfully received
function onPhotoDataSuccess(imageData) {

    // Get image handle
    var myImage = document.getElementById('myImage');
    
    // Unhide image elements
    myImage.style.display = 'block';
    
    // Show captured photo
    myImage.src = "data:image/jpeg;base64," + imageData;
    
}

// Called when image is received
function onPhotoURISuccess(imageURI) {
    
    // Get image handle
    var myImage = document.getElementById('myImage');
    
    // Unhide image elements
    myImage.style.display = 'block';
    
    // Show the captured photo
    myImage.src = imageURI;
}

// Use a button to call this
function captureImage() {
    
    // Take picture using device camera and retrieve image as base64-encoded string
    try {
        navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 90,
                                    destinationType: destinationType.FILE_URI, saveToPhotoAlbum: true  });
    }
    catch (err)
    {
        alert(err);
    }
}

// Use a button to call this
function captureImageEdit() {
    try {
        // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 70, allowEdit: true, saveToPhotoAlbum: true  });
    }catch (err)
    {
        alert(err);
    }
}

// Use a button to call this
function getPhoto(source) {
    
    try {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
                                    destinationType: destinationType.FILE_URI,
                                    sourceType: source, saveToPhotoAlbum: true });
    }catch (err)
    {
        alert(err);
    }
}

function onFail(message) {
    
    alert('Failed: ' + message);
}