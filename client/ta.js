Meteor.autorun(function() {
  if(Meteor.user()) {
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

Template.ta.show_overview = function () {
  return Session.get("show_overview");
}

Template.ta.events({
  'click #overview' : function (event) {
    Session.set("show_overview", true);
  },

  'click #signoff' : function (event) {
    Session.set("show_overview", false);
  },

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

Template.ta_overview.group = function() {
  return Students.find({}, {sort: ["cpmGroup", "asc"]});
}

Template.ta_overview_group.approvalUndefined = function() {
  return (this.approved === undefined);
}