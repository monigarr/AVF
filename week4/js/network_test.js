
// api-connection
function check_network() {
    var networkState = navigator.network.connection.type;
    
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL_5G] = 'Cell 5G Connection';
    states[Connection.NONE]     = 'No Network Connection. Bummer!';
    
    document.getElementById('connectionstate').innerHTML = states[networkState];
}
