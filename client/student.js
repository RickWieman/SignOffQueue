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
      if(!$('#cpm').hasClass('error')) {
        $('#cpm').addClass('error');
        $('#cpm .controls').append('<span class="help-inline">CPM groep is al ingeschreven!</span>');
        $('#submit').prop('disabled', true);
      }
    }
    else {
      $('#cpm').removeClass('error');
      $('#cpm .controls .help-inline').remove();
      $('#submit').prop('disabled', false);
    }
  }
});