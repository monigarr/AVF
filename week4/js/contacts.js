// http://docs.phonegap.com/en/1.0.0/phonegap_contacts_contacts.md.html#Contacts

function onBodyLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
			// api-contacts
			function contacts_success(contacts) {
			    document.getElementById('contacts-output').innerHTML = 
			    "<strong>You have " + contacts.length + "</strong> contacts.";
			    for (var i = 0; i < contacts.length ; i++) {        
			        if (contacts[i].name && contacts[i].name.formatted) {
			            document.getElementById('contacts-output').innerHTML = 
			            document.getElementById('contacts-output').innerHTML + 
			            //show first five contacts
			            "<br/>Contact " + (i+1) + " is <strong>" +
			            contacts[i].name.formatted + "</strong>";
			            "<br/>Contact " + (i+2) + " is <strong>" +
			            contacts[i].name.formatted + "</strong>";
			            "<br/>Contact " + (i+3) + " is <strong>" +
			            contacts[i].name.formatted + "</strong>";
			            "<br/>Contact " + (i+4) + " is <strong>" +
			            contacts[i].name.formatted + "</strong>";
			            "<br/>Contact " + (i+5) + " is <strong>" +
			            contacts[i].name.formatted + "</strong>";
			            break;
			        }
			    }
			}
			function contacts_fail (error) {
			    document.getElementById('contacts-output').innerHTML = "<strong>Error getting contacts.</strong>";
			}
			function get_contacts() {
			    var obj = new ContactFindOptions();
			    obj.filter = "";
			    obj.multiple = true;
			    navigator.contacts.find(
			                            [ "displayName", "name" ], contacts_success,
			                            contacts_fail, obj);
			}
}

