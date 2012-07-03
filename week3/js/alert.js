	function onBodyLoad() {
		document.addEventListener("deviceready", onDeviceReady, false);
	}

	function onDeviceReady() {
		// do your thing!
		phoneGapReady.innerHTML = ("")
		
	}
	
	// alert dialog dismissed
    function alertDismissed() {
        // do something
    }
    
    // Show a custom alert
    //
    function showAlert() {
        navigator.notification.alert (
                                     'You clicked Alert!', // message
                                     alertDismissed, // callback
                                     'Alert Demo', // title
                                     'Done' // buttonName
                                     );
    }
    
    // process the confirmation dialog result
    function onConfirm(button) {
        alert('You chose button ' + button);
    }
    
    // Show a custom confirmation dialog
    //
    function showConfirm() {
        navigator.notification.confirm(
                                       'You clicked Confirm!', // message
                                       onConfirm, // callback to invoke with index of button pressed
                                       'Confirm Demo', // title
                                       'Restart,Exit' // buttonLabels
                                       );
    }
