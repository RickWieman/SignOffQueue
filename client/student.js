Template.student.studentQueue = function() {
  return Students.find({ assistant: {$exists: false} });
}

Template.student.showForm = function() {
  return !Session.get("id");
}

Template.student.highlightGroup = function() {
  var currentGroup = Session.get("group");

  if(currentGroup == this.cpmGroup) {
    return '<strong>' + this.cpmGroup + '</strong>';
  }
  else {
    return this.cpmGroup;
  }
}

// Sets the error status a field with an inline error message. Also disables the submit button.
function setFieldError(field, error) {
  $(field).addClass('error');
  $('#submit').prop('disabled', true);

  // Add the error message, or update it when it exists
  if($(field +' .controls .help-inline').length == 0) {
    $(field +' .controls').append('<span class="help-inline">' + error + '</span>');
  }
  else {
    $(field +' .controls .help-inline').text(error);
  }
}

// Clears the error status of a field; if no fields are erroneous, the submit button is enabled again.
function clearFieldError(field) {
  $(field).removeClass('error');
  $(field +' .controls .help-inline').remove();

  // If all fields are correct, enable submit button
  if($('.form-horizontal .error').length == 0) {
    $('#submit').prop('disabled', false);
  }
}

Template.student.events({
  'click #submit' : function (event) {
    event.preventDefault();

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
            Session.set("group", cpmGroup);
          } 
        });
      }
    }
    else {
      setFieldError('#cpm', 'Dit veld is verplicht.');
      setFieldError('#loc', 'Dit veld is verplicht.');
      console.log("Input not valid: %s %s", location, cpmGroup);
    }
  },
  'keyup #inputLoc' : function() {
    clearFieldError('#loc');
  },
  'keyup #inputCpm' : function() {
    var cpmGroup = $('#inputCpm').val();
    var results = Students.find({ cpmGroup: cpmGroup }).fetch();

    if(results.length != 0) {
      setFieldError('#cpm', 'Deze groep is al ingeschreven!');
    }
    else {
      clearFieldError('#cpm');
    }
  }
});