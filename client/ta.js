Meteor.autorun(function() {
  if(Meteor.user() && Session.get("ready")) {
    if(!Students.findOne({ assistant: Meteor.user().username, approved: {$exists: false} })) {
      if(Students.find({assistant: {$exists: false}}).count() > 0) {
        Meteor.call('assignGroup', Meteor.user().username);
      }
    }
  }
});

Template.ta.student = function() {
  return Students.findOne({ assistant: Meteor.user().username, approved: {$exists: false} });
}

Template.ta.events({
  'click #accept' : function (event) {
    event.preventDefault();

    Meteor.call("reviewGroup", Template.ta.student().cpmGroup, true);
    Meteor.call('assignGroup', Meteor.user().username);
  },
  'click #reject' : function (event) {
    event.preventDefault();

    Meteor.call("reviewGroup", Template.ta.student().cpmGroup, false);
    Meteor.call('assignGroup', Meteor.user().username);
  }
});