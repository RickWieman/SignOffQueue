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

  disapproveGroup: function(cpmGroup) {
    Students.update({cpmGroup: cpmGroup}, {$set: {approved: false}});
  },

  login: function(user, pass) {
    var users = {'Rick': '123', 'Sander': '456'};

    if(users[user] == pass) {
      return user;
    }
  }
});