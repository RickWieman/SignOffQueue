Template.openingPage.showContent = function() {
	if(!Session.get('template')) {
		Session.set('template', 'student');
	}
  
  	return Template[Session.get('template')]();
}

Template.openingPage.menuItems = function() {
	return ['TA', 'Student'];
}

Template.openingPage.listMenuItems = function() {
	if(this.toLowerCase() == Session.get('template')) {
		return '<li id="'+ this.toLowerCase() +'" class="active"><a href="#">' + this + '</a></li>';
	}
	return '<li id="'+ this.toLowerCase() +'"><a href="#">' + this + '</a></li>';
}

Template.openingPage.events({
  'click #ta a': function() {
    Session.set('template', 'ta');
  },
  'click #student a': function() {
    Session.set('template', 'student');
  }
});