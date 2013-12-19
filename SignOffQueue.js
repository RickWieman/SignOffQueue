Students = new Meteor.Collection("students");

if (Meteor.isClient) {
  Template.ta.student = function() {
    return Students.findOne({});
  }
  Template.ta.events({
    'click #accept' : function () {
      console.log("Deleting " + Template.ta.student().cpmGroup);
      Meteor.call("deleteGroup", Template.ta.student().cpmGroup);
    }
  });

  Template.student.studentQueue = function() {
    return Students.find({});
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
          Students.insert({ location: location, cpmGroup: cpmGroup});
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
    deleteGroup: function(cpmGroup) {
      Students.remove({cpmGroup: cpmGroup});
    }
  });
}
