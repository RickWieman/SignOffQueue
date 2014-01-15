Template.taNext.loggedIn = function() {
  return Session.get("ta");
}

Template.taNext.student = function() {
  return Students.findOne({ assistant: {$exists: false}});
}

Template.taNext.queue = function() {
  return Students.find({ assistant: 1 });
}

Template.taLogin.events({
  'click #submit': function() {
    if(Meteor.call('login', $("#inputUser").val(), $("#inputPass").val())) {
      Session.set("ta", $("#inputUser").val());
    }
    else {
      console.log("Login failed.");
    }
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