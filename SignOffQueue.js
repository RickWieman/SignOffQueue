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
    return !Session.get("id");
  }

  Template.student.events({
    'click #submit' : function () {
      // template data, if any, is available in 'this'
      var location = $('#inputLoc').val();
      var cpmGroup = $('#inputCpm').val();

      if(location && cpmGroup) {
        if(Students.find({ cpmGroup: cpmGroup }).fetch().length == 0) {
          Meteor.call("insertGroup", cpmGroup, location, function(error, result){
            if (error)
              console.log(error);
            else {
              console.log("Group added with id: %s", result)
              Session.set("id", result);
            } 
          });
        }
      } else {
        console.log("Input not valid: %s %s", location, cpmGroup);
      }
    },
    'keyup #inputCpm' : function() {
      var cpmGroup = $('#inputCpm').val();
      var results = Students.find({ cpmGroup: cpmGroup }).fetch();

      if(results.length != 0) {
        $('#cpm').addClass('error');
        $('#cpm .controls').append('<span class="help-inline">CPM groep is al ingeschreven!</span>');
        $('#submit').prop('disabled', true);
      }
      else {
        $('#cpm').removeClass('error');
        $('#cpm .controls .help-inline').remove();
        $('#submit').prop('disabled', false);
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

    insertGroup: function(cpmGroup, location, callback) {
      return Students.insert({cpmGroup: cpmGroup, location: location});
    },

    approveGroup: function(cpmGroup) {
      Students.update({cpmGroup: cpmGroup}, {$set: {approved: true}});
    },

    rejectGroup: function(cpmGroup) {
      Students.update({cpmGroup: cpmGroup}, {$set: {approved: false}});
    }
  });
}
