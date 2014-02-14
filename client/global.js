Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.autorun(function() {
  if(Meteor.user()) {
    Meteor.subscribe("students", Meteor.user().username, function() {
    	Session.set("ready", true);
    });
  }
  else {
    Meteor.subscribe("students", null, function() {
    	Session.set("ready", true);
    });
  }
});