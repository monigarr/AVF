// api-notification
var showAlert = function() {
    function alertDismissed() {
        console.log("Alert Dismissed");
    }
    navigator.notification.alert(
                                 'You are the winner!',  // message
                                 alertDismissed,         // callback
                                 'Game Over',            // title
                                 'Done'                  // buttonName
                                 );    
};

var showConfirm = function() {
    function onConfirm(button) {
        alert('You chose button ' + button);
    }
    navigator.notification.confirm(
                                   'Confirmation Message',  // message
                                   onConfirm,              // callback to invoke with index of button pressed
                                   'Confirmation Title',            // title
                                   'ReStart,Exit'          // buttonLabels
                                   );    
};
var beep = function() {
    navigator.notification.beep(2);
};
var vibrate = function() {
    navigator.notification.vibrate(0);
};

