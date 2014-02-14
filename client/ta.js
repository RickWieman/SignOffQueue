// Assignment op server; client (TA) vraagt aan server om de groep;
// server geeft groep en assignt hem aan client (TA) of geeft reeds geassignde groep

function getGroup() {
  Meteor.call('assignGroup', Session.get('ta'), function (error, result) {
    if(result) {
      Session.set('nextGroup', result);
    }
  });
}

Template.ta.student = function() {
  return Session.get('nextGroup');
}

Template.ta.events({
  'click #accept' : function (event) {
    event.preventDefault();

    Meteor.call("reviewGroup", Template.ta.student().cpmGroup, true);
    getGroup();
  },
  'click #reject' : function (event) {
    event.preventDefault();

    Meteor.call("reviewGroup", Template.ta.student().cpmGroup, false);
    getGroup();
  }
});