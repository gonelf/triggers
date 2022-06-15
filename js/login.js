$('#loginForm').submit((e)=>{
  e.preventDefault();
  e.stopPropagation();

  var params = { email: $('#email').val(), password: $('#pass').val() };
  console.log(params);

  $.post( "https://gonelf.api.stdlib.com/airtable-login-bk@dev/login/", params)
  .done(function( data ) {
    // alert( "Data Loaded: " + data );
    console.log(data);
    if (data.code == 200 && data.message.valid == true) {
      // create user cookie
      setCookie('triggers_user', data.message.user, 1);
      console.log(getCookie('triggers_user'));
    }
    else {
      // show error
    }
  });
});
