// var App = {
// 	Models: {},
// 	Collections: {},
// 	Views: {},
// 	Routers: {}
// };

var userLoginTemplate;       
var createUserTemplate;      
var editUserTemplate;        
var userInfoTemplate;        
var horoscopeDataTemplate;   
var horoscopeForcastTemplate;

// 	// get current user sun sign

// 	// GET $.ajax horoscope data
// 		// success{
// 		// 	.renderHoroscope(response)
// 		// }

// 	// GET $.ajax horoscope forcast
// 	// then render both horoscope data & forcast


$(function() {
	console.log('app loaded');

  userLoginTemplate        = Handlebars.compile($('#user-login-template').html());
	createUserTemplate       = Handlebars.compile($('#create-user-template').html());
	editUserTemplate         = Handlebars.compile($('#edit-user-template').html());
	userInfoTemplate         = Handlebars.compile($('#user-info-template').html());
	horoscopeDataTemplate    = Handlebars.compile($('#horoscope-data-template').html());
	horoscopeForcastTemplate = Handlebars.compile($('#horoscope-forcast-template').html());

  renderApp();

  $('body').on('click', '#user-login-button' , loginUser  );
	$('body').on('click', '#new-user-button'   , newUser    );
  $('body').on('click', '#create-user-button', createUser );
  $('body').on('click', '#edit-user-button'  , editUser   );
	$('body').on('click', '#update-user-button', updateUser );
  $('body').on('click', '#user-logout-button', logoutUser );
	$('body').on('click', '#delete-user-button', deleteUser );

});

var renderApp = function() {
	console.log('app rendered');

	$('.views').empty();
	$('#user-login').append(userLoginTemplate);
};

// LOGIN New Session
var loginUser = function() {
	console.log('user logged in');

	var username = $('#login-username').val();
	var password = $('#login-password').val();
  
  $.ajax({
  	url: '/sessions',
    method: 'POST',
    data: {
    	username        : username,
			password_digest : password
		}
  })
  .done(function() {
	  	alert('success!');
  })
  .fail(function() {
  		alert('fail!');
  });
};

// CREATE New User
var newUser = function() {
	console.log('new user');
	$('.views').empty();
	$('#create-user').append(createUserTemplate);
};

var createUser = function() {
	console.log('create user');

	var username      = $('#create-username').val();
	var password      = $('#create-password').val();
	var firstName     = $('#create-first-name').val();
	var lastName      = $('#create-last-name').val();
	var birthDate     = $('#create-birth-date').val();
	var sunSign       = $('#create-sun-sign').val();
	var emailAddress  = $('#create-email-address').val();
	var emailReminder = $('#create-email-reminder').val();

  $.ajax({
  	url: '/users',
    method: 'POST',
    data: {
    	username        : username,
			password_digest : password,
			first_name      : firstName,
			last_name       : lastName,
			birth_date      : birthDate,
			sun_sign        : sunSign,
			email_address   : emailAddress,
			email_reminder  : emailReminder
		}
  })
  .done(function() {
	  	return username + ' created';
  })
  .fail(function() {
  		alert('Fail!');
  });
};

// EDIT User Info
var editUser = function() {
	console.log('edit user');

	var username      = $('#edi-username').val();
	var password      = $('#edi-password').val();
	var emailAddress  = $('#edi-email-address').val();
	var emailReminder = $('#edi-email-reminder').val();

	$.ajax({
  	url: '/users',
    method: 'POST',
    data: {
    	username        : username,
			password_digest : password,
			first_name      : firstName,
			last_name       : lastName,
			birth_date      : birthDate,
			sun_sign        : sunSign,
			email_address   : emailAddress,
			email_reminder  : emailReminder
		}
  })
  .done(function() {
	  	return username + ' created';
  })
  .fail(function() {
  		alert('Fail!');
  });
};

var updateUser = function() {
	console.log('update user');
};

var logoutUser = function() {
	console.log('logout user');
};


var deleteUser = function() {
	console.log('delete user');
};

// var determineSunSign = function(birthDate) {

// 	if ( birthDate <= April)

// };

























