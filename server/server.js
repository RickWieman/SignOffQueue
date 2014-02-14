Meteor.startup(function () {
  Accounts.config({
    forbidClientAccountCreation: false,
    loginExpirationInDays: null
  });
});

Meteor.methods({
  assignGroup: function(ta) {
    var existing = Students.findOne({ assistant: ta, approved: {$exists: false}});

    if(!existing) {
      var updateGroup = Students.findOne({ assistant: {$exists: false}, approved: {$exists: false} });

      if(updateGroup) {
        Students.update({ cpmGroup: updateGroup.cpmGroup }, {$set: {assistant: ta}});
      }
    }
  },

  insertGroup: function(cpmGroup, location) {
    return Students.insert({cpmGroup: cpmGroup, location: location});
  },

  reviewGroup: function(cpmGroup, result) {
    Students.update({cpmGroup: cpmGroup}, {$set: {approved: result}});
  }
});