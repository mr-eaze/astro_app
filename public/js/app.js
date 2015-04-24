
// GLOBAL Variables
var userLoginTemplate;       
var createUserTemplate;      
var editUserTemplate;        
var userInfoTemplate;        
var horoscopeDataTemplate;   
var horoscopeForcastTemplate;

// ON LOAD
$(function() {
	console.log('app loaded');

	// PRECOMPILE Templates
  userLoginTemplate        = Handlebars.compile($('#user-login-template').html());
	createUserTemplate       = Handlebars.compile($('#create-user-template').html());
	editUserTemplate         = Handlebars.compile($('#edit-user-template').html());
	userInfoTemplate         = Handlebars.compile($('#user-info-template').html());
	horoscopeDataTemplate    = Handlebars.compile($('#horoscope-data-template').html());
	horoscopeForcastTemplate = Handlebars.compile($('#horoscope-forcast-template').html());

	// CLICK EVENTS
  $('body').on('click', '#user-login-button' , loginUser  );
	$('body').on('click', '#new-user-button'   , newUser    );
  $('body').on('click', '#create-user-button', createUser );
  $('body').on('click', '#edit-user-button'  , editUser   );
	$('body').on('click', '#update-user-button', updateUser );
  $('body').on('click', '#user-logout-button', logoutUser );
	$('body').on('click', '#delete-user-button', deleteUser );
	$('body').on('click', '#go-back-button'    , goBack     );
	
	// RENDER App
	console.log('app rendered');
	renderLogin();
});


  //////////////////////////////////
 // LOGIN / LOGOUT / DELETE USER // 
//////////////////////////////////

// RENDER Login
var renderLogin = function() {
	console.log('login rendered');
	$('.views').empty();
	$('#edit-user').append(userLoginTemplate);
};

// LOGIN User / CREATE New Session
var loginUser = function() {
	console.log('logging in user');

	var username = $('#login-username').val();
	var password = $('#login-password').val();
  
  $.ajax({
  	url: '/sessions',
    method: 'POST',
    data: {
    	username : username,
			password : password
		}
  }).done(function() {
  		getCurrentUserInfo();
  }).fail(function() {
  		alert('fail!');
  });
};

// LOGOUT User / DELETE Session
var logoutUser = function() {

	$.ajax({
  	url: '/sessions',
    method: 'DELETE'
  }).done(function() {
  		renderLogin();
  		console.log('user logged out');
  }).fail(function() {
  		alert('fail!');
  });
};

// GET Current User Id
var getCurrentUserId = function() {
	$.get('/current_user').done( deleteUser.bind(this) );
}

// DELETE User
var deleteUser = function(userId) {
	console.log('delete user');

	getCurrentUserId().done(
		$.ajax({
	  	url: '/users/' + userId.id,
	    method: 'DELETE'
	  }).done(function() {
	  		renderLogin();
	  		console.log('user deleted');
	  }).fail(function() {
	  		alert('fail!');
	  })
  );
};


  //////////////////
 // USER PROFILE // 
//////////////////

// GET Current User Info
var getCurrentUserInfo = function() {
	console.log('getting current user id');
	$.get('/current_user')
	.done(renderUserInfo)
	.done(getHoroscopeData.bind(this))
	.done(getHoroscopeForcast.bind(this));
};

// RENDER User Info
var renderUserInfo = function(userInfo) {
	console.log('render current user info');
	$('.views').empty();
	$('#user-info').append( userInfoTemplate(userInfo) );
};


  ////////////////////
 // HOROSCOPE DATA // 
////////////////////

// GET Horoscope Data (then RENDER)
var getHoroscopeData = function(userInfo) {
	$.ajax({
		url: '/horoscope/data/' + userInfo.sun_sign,
		method: 'GET'
	}).done(function(horoscopeData) {
		$('#horoscope-data').append( horoscopeDataTemplate(horoscopeData) );
	}.bind(this))
	.fail(function() {
		alert('Fail!');
	});
};

// RENDER Horoscope Data
// var renderHoroscopeData = function(horoscopeData) {
// 	$('#horoscope-data').append( horoscopeDataTemplate(horoscopeData) );
// };


  ////////////////////////
 // HOROSCOPE FORECAST //
//////////////////////// 

// GET Horoscope Forcast (then RENDER)
var getHoroscopeForcast = function(userInfo) {
	$.ajax({
		url: '/horoscope/forcast/' + userInfo.sun_sign,
		method: 'GET'
	}).done(function(horoscopeForcast) {
		$('#horoscope-forcast').append( horoscopeForcastTemplate(horoscopeForcast) );
	}.bind(this))
	.fail(function() {
  	alert('Fail!');
  });
};

// RENDER Horoscope Forcast
// var renderHoroscopeForcast = function(horoscopeForcast) {
// 	$('#horoscope-forcast').append(horoscopeForcastTemplate(horoscopeForcast));
// };


  //////////////
 // NEW USER // 
//////////////

// RENDER New User
var newUser = function() {
	console.log('delete user');
	$('.views').empty();
	$('#create-user').append(createUserTemplate);
};

// CREATE New User
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
  	console.log('new user created');
	  renderLogin();
  })
  .fail(function() {
  	alert('Fail!');
  });
};


  ///////////////
 // EDIT USER // 
///////////////

// RENDER Edit User Info
var editUser = function() {
	console.log('edit rendered');
	$('.views').empty();
	$('#user-login').append(editUserTemplate);
};

// EDIT User Info
var updateUser = function() {
	console.log('edit user');

	var username      = $('#edi-username').val();
	var password      = $('#edi-password').val();
	var emailAddress  = $('#edi-email-address').val();
	var emailReminder = $('#edi-email-reminder').val();

	$.ajax({
  	url: '/users',
    method: 'PUT',
    data: {
    	username        : username,
			password_digest : password,
			email_address   : emailAddress,
			email_reminder  : emailReminder
		}
  })
  .done(function() {
	  alert('user info edited!');
	  renderUserInfo();
  })
  .fail(function() {
  	alert('Fail!');
  });
};

// GO BACK to User Profile
var goBack = function() {
	console.log('go back to profile');
	getCurrentUserInfo();
};
























