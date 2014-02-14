Meteor.startup(function () {
  Accounts.config({
    forbidClientAccountCreation: false,
    loginExpirationInDays: null
  });
});

Meteor.methods({
  assignGroup: function(ta) {
    if(Students.find({ assistant: ta, approved: {$exists: false}}).fetch().length == 0) {
      var updateGroup = Students.findOne({ assistant: {$exists: false}, approved: {$exists: false} }).cpmGroup;
      Students.update({ cpmGroup: updateGroup }, {$set: {assistant: ta}});
    }
    var group = Students.findOne({ assistant: ta, approved: {$exists: false}});

    return group;
  },

  insertGroup: function(cpmGroup, location) {
    return Students.insert({cpmGroup: cpmGroup, location: location});
  },

  reviewGroup: function(cpmGroup, result) {
    Students.update({cpmGroup: cpmGroup}, {$set: {approved: result}});
  }
});