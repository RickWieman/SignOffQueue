Template.ta.loggedIn = function() {
  return Session.get("ta");
}

Template.taNext.student = function() {
  return Students.findOne({ assistant: {$exists: false}});
}

Template.taNext.queue = function() {
  return Students.find({ assistant: 1 });
}

Template.taLogin.events({
  'click #submit': function(event) {
    event.preventDefault();

    Meteor.call('login', $("#inputUser").val(), $("#inputPass").val(), function (error, result) {
      if(result) {
        Session.set("ta", result);
      }
    });
  }
});

Template.taNext.events({
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