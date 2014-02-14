Meteor.startup(function () {
  Accounts.config({
    forbidClientAccountCreation: false,
    loginExpirationInDays: null
  });
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

  disapproveGroup: function(cpmGroup) {
    Students.update({cpmGroup: cpmGroup}, {$set: {approved: false}});
  }
});