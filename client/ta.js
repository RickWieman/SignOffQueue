Template.ta.student = function() {
  return Students.findOne({ assistant: {$exists: false}});
}

Template.ta.queue = function() {
  return Students.find({ assistant: 1 });
}

Template.ta.events({
  'click #accept' : function () {
    Meteor.call("assignGroup", Template.ta.student().cpmGroup, 1);
  }
});