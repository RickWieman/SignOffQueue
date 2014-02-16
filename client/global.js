Students = new Meteor.Collection("students");

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.autorun(function() {
  if(Meteor.user()) {
    Meteor.subscribe("students", Meteor.user().username);
  }
  else {
    Meteor.subscribe("students", null);
  }
});