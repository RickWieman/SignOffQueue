Students = new Meteor.Collection("students");

if (Meteor.isClient) {
  Template.openingPage.showContent = function() {
    var template = (!Session.get('template') ? 'student' : Session.get('template'));

    return Template[template]();
  }
  Template.openingPage.events({
    'click #ta': function() {
      Session.set('template', 'ta');
    },
    'click #student': function() {
      Session.set('template', 'student');
    }
  });

  Template.ta.student = function() {
    return Students.findOne({ assistant: {$exists: false}});
  }
  Template.ta.events({
    'click #accept' : function () {
      Meteor.call("assignGroup", Template.ta.student().cpmGroup, 1);
    }
  });

  Template.student.studentQueue = function() {
    return Students.find({ assistant: {$exists: false} });
  }

  Template.student.showForm = function() {
    return !Session.get("subscribed");
  }

  Template.student.events({
    'click #submit' : function () {
      // template data, if any, is available in 'this'
      var location = $('#loc').val();
      var cpmGroup = $('#cpm').val();

      if(location && cpmGroup) {
        if(Students.find({ cpmGroup: cpmGroup }).fetch().length == 0) {
          Meteor.call("insertGroup", cpmGroup, location);
        }
        Session.set("subscribed", true);
      }
    },
    'keyup #cpm' : function() {
      var cpmGroup = $('#cpm').val();

      if(Students.find({ cpmGroup: cpmGroup }).fetch().length != 0) {
        $('#cpm').addClass('invalid');
      }
      else {
        $('#cpm').removeClass('invalid');
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    assignGroup: function(cpmGroup, ta) {
      Students.update({cpmGroup: cpmGroup}, {$set: {assistant: ta}});
    },

    insertGroup: function(cpmGroup, location) {
      Students.insert({cpmGroup: cpmGroup, location: location});
    },

    approveGroup: function(cpmGroup) {
      Students.update({cpmGroup: cpmGroup}, {$set: {approved: true}});
    },

    rejectGroup: function(cpmGroup) {
      Students.update({cpmGroup: cpmGroup}, {$set: {approved: false}});
    }
  });
}
