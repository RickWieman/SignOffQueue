Meteor.startup(function () {
  Accounts.config({
    forbidClientAccountCreation: false,
    loginExpirationInDays: null
  });
});

Meteor.publish("students", function (ta) {
  if(ta) {
    return Students.find({ });
  }

  return Students.find({ }, {fields: {assistant: 1, cpmGroup: 1}});
});

Meteor.methods({
  assignGroup: function(ta) {
    var existing = Students.findOne({ assistant: ta, approved: {$exists: false}});

    if(!existing) {
      Students.update({ assistant: {$exists: false}, approved: {$exists: false} }, {$set: {assistant: ta}});
    }
  },

  insertGroup: function(cpmGroup, location) {
    return Students.insert({cpmGroup: cpmGroup, location: location});
  },

  reviewGroup: function(cpmGroup, result) {
    Students.update({cpmGroup: cpmGroup}, {$set: {approved: result}});
  }
});