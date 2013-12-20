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