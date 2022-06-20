// define

let cname = "triggers_user";
let dashboard_path = "dashboard.html";
var urlParams = null;

// functions

function goto (page) {
  window.location.href = page;
}

function is_logged (){
  return getCookie(cname) !== null;
}

function login (email, pass){
  var params = { email: email, password: pass };
  // console.log(params);

  $.post( "https://gonelf.api.stdlib.com/airtable-login-bk@dev/login/", params)
  .done(function( data ) {
    // alert( "Data Loaded: " + data );
    // console.log(data);
    if (data.code == 200 && data.message.valid == true) {
      // create user cookie
      setCookie(cname, data.message.user);

      // localStorage.setItem('triggers_user', JSON.stringify(data.message.user));
      // console.log(JSON.parse(localStorage.getItem('triggers_user')));

      window.open(urlParams.get('ref'), '_blank');
      goto(dashboard_path);
    }
    else {
      // show error
      console.log("error");
    }
  });
}

function logout (){
  deleteCookie(cname);
  goto("/");
}

function send_to_dashboard_if_logged() {
  if(is_logged()) {
    goto(dashboard_path);
  }
  else {
    urlParams = new URLSearchParams(window.location.search);
  }
}

// actions

$('#loginForm').submit((e)=>{
  e.preventDefault();
  e.stopPropagation();

  login($('#email').val(), $('#pass').val());
});

$("#logout").click(()=>{
  logout();
});
