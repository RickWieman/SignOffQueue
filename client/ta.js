Template.ta.student = function() {
  return Students.findOne({ assistant: Meteor.user().username, approved: {$exists: false}});
}

Template.ta.studentsAvailable = function() {
  if(!Template.ta.student()) {
    return Students.find({ assistant: {$exists: false}, approved: {$exists: false} }).count();
  }
  return false;
}

Template.ta.assignToMe = function() {
  Meteor.call('assignGroup', Meteor.user().username);
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