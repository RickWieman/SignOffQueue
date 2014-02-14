Template.ta.student = function() {
  return Students.findOne({ assistant: {$exists: false}});
}

Template.ta.queue = function() {
  return Students.find({ assistant: 1 });
}

Template.ta.events({
  'click #accept' : function () {
    Meteor.call("assignGroup", Template.taNext.student().cpmGroup, 1);
  }
});

Template.taQueueItem.events({
  'click .approve' : function() {
    Meteor.call("approveGroup", this.cpmGroup);
  },
  'click .disapprove' : function() {
    Meteor.call("disapproveGroup", this.cpmGroup);
  }
});