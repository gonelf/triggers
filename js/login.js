$('#loginForm').submit((e)=>{
  e.preventDefault();
  e.stopPropagation();

  var params = { email: $('#email').val(), password: $('#pass').val() };
  console.log(params);

  $.post( "https://gonelf.api.stdlib.com/airtable-login-bk@dev/login/", params)
  .done(function( data ) {
    // alert( "Data Loaded: " + data );
    // console.log(data);
    if (data.code == 200 && data.message.valid == true) {
      // create user cookie
      setCookie('triggers_user', data.message.user,);
      setCookie('triggers_user', data.message.user, 1, "smacker.xyz");

      localStorage.setItem('triggers_user', JSON.stringify(data.message.user));
      console.log(JSON.parse(localStorage.getItem('triggers_user')));

      let key = 'triggers_user';
      let target = "//smacker.xyz/";
      xdLocalStorage.setItem(key, data.message.user, function (data) { console.log(data); });
    }
    else {
      // show error
    }
  });
});

xdLocalStorage.init(
    {
        /* required */
        iframeUrl:'https://popil.lol/start.html',
        //an option function to be called right after the iframe was loaded and ready for action
        initCallback: function () {
            console.log('Got iframe ready');
        }
    }
);
