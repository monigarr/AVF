// http://docs.phonegap.com/en/1.0.0/phonegap_contacts_contacts.md.html#Contacts


// api-contacts

var contacts_success = function(contacts) 
{
    document.getElementById('contacts-output').innerHTML = 
    "<h3>You have " + contacts.length + " contacts.</h3>" +
    "Your first 25 contacts are:";
    for (var i=0; i<25; i++)
    {        
        if (contacts[i].name && contacts[i].name.formatted) 
        {
            document.getElementById('contacts-output').innerHTML = 
            document.getElementById('contacts-output').innerHTML + 
            //show first 25 contact names
            "<br>" + contacts[i].name.formatted + " ";
        }
    }
};

var contacts_fail = function(error) 
{
    document.getElementById('contacts-output').innerHTML = "<strong>Too Bad, So Sad! I can't get your Contacts.</strong>";
}
var get_contacts = function() 
{
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple = true;
    navigator.contacts.find(["displayName", "name"], contacts_success, contacts_fail, obj);
}

//START TEST
window.ContactView = Backbone.View.extend({
 initialize: function () {
 _.bindAll(this);
 this.render();
 },
										  
 events: {
  "click #searchBtn": "searchHandler",
  "click #addContactBtn": "addHandler",
  "click #saveBtn": "saveHandler",
  "click a": "selectContact"
  },
										  
 render: function () {
  $(this.el).html(this.template());
  return this;
 },
										  
 searchHandler: function() {
  var self = this;
  var fields = ["id", "name", "phoneNumbers", 'emails'];
  navigator.contacts.find(fields, function(contacts) {
   self.contactSuccess(contacts);
   if (self.iscroll) {
   console.log('Refresh iScroll');
   self.iscroll.refresh();
   } else {
    console.log('New iScroll');
    setTimeout(function() {
	self.iscroll = new iScroll('contactWrapper', {hScrollbar: false, vScrollbar: false });
	}, 1000);
   }
}, this.contactError, {filter: $('#contactSearchKey').val(), multiple: true});
 return false;
 },
										  
										  addHandler: function() {
										  $('form').removeAttr('disabled');
										  this.contact = navigator.contacts.create();
										  return false;
										  },
										  
										  saveHandler: function() {
										  this.contact.name = {givenName: $('#firstName').val(), familyName:  $('#lastName').val()};
										  var phoneNumbers = [];
										  phoneNumbers[0] = new ContactField('work', $('#workPhone').val(), false);
										  phoneNumbers[1] = new ContactField('mobile', $('#mobilePhone').val(), true); // preferred number
										  this.contact.phoneNumbers = phoneNumbers;
										  this.contact.save();
										  return false;
										  },
										  
										  contactSuccess: function(contacts) {
										  $('#contactList').empty();
										  this.contacts = contacts;
										  for (var i=0; i < contacts.length; i++) {
										  var n = contacts[i].name;
										  var a = $("<a href='#'>" + n.givenName + " " + n.familyName + "</a>");
										  a.data('contact', contacts[i]);
										  $('#contactList').append("<li></li>");
										  $('#contactList li:last').append(a);
										  }
										  },
										  
										  contactError: function() {
										  showAlert('An error has occurred', 'Contact');
										  },
										  
										  selectContact: function(event) {
										  $('form').removeAttr('disabled');
										  this.contact = $(event.target).data("contact");
										  $('#firstName').val(this.contact.name.givenName);
										  $('#lastName').val(this.contact.name.familyName);
										  $('#workPhone').val(this.contact.phoneNumbers[0].value);
										  $('#mobilePhone').val(this.contact.phoneNumbers[1].value);
										  }
										  
										  });
