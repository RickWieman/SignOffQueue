Template.student.showForm = function() {
  return !Session.get("group") && !Meteor.user();
}

Template.student_queue.queue = function() {
  var data = Students.find({ assistant: {$exists: false} });
  
  if(data.count() > 0) {
    return data;
  }
  
  return false;
}

Template.student_queue.highlightGroup = function() {
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

function testCPM(value) {
  var exp = /^[0-9]{1,3}$/;

  return exp.test(value);
}

function testLocation(value) {
  var exp = /^([0-9a-zA-Z\s\.\,])+$/;

  return exp.test(value);
}

function evaluateCPM() {
  var cpmGroup = $('#inputCpm').val();
  var results = Students.find({ cpmGroup: parseInt(cpmGroup) }).fetch();

  if(!cpmGroup && !testCPM(cpmGroup)) {
    setFieldError('#cpm', 'Dit veld is verplicht.');
  }
  else if(results.length != 0) {
    setFieldError('#cpm', 'Deze groep is al ingeschreven!');
  }
  else if(!testCPM(cpmGroup)) {
    setFieldError('#cpm', 'Controleer of dit een geldig groepsnummer is.');
  }
  else {
    clearFieldError('#cpm');
  }
}

function evaluateLocation() {
  var location = $('#inputLoc').val();

  if(!location && !testLocation(location)) {
    setFieldError('#loc', 'Dit veld is verplicht.');
  }
  else if(!testLocation(location)) {
    setFieldError('#loc', 'Controleer of dit een geldige locatie is.');
  }
  else {
    clearFieldError('#loc');
  }
}

Template.student_signin.events({
  'click #submit' : function (event) {
    event.preventDefault();

    var location = $('#inputLoc').val();
    var cpmGroup = $('#inputCpm').val();

    if(testCPM(cpmGroup) && testLocation(location)) {
      cpmGroup = parseInt(cpmGroup);

      if(Students.find({ cpmGroup: cpmGroup }).fetch().length == 0) {
        Meteor.call("insertGroup", cpmGroup, location, function(error, result){
          if(result) {
            Session.set("group", cpmGroup);
          }
        });
      }
    }
    else {
      evaluateCPM();
      evaluateLocation();
    }
  },
  'keyup #inputLoc' : evaluateLocation,
  'blur #inputLoc' : evaluateLocation,
  'keyup #inputCpm' : evaluateCPM,
  'blur #inputCpm' : evaluateCPM
});