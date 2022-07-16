// define

let cname = "triggers_user";
let dashboard_path = "dashboard.html";
var urlParams = new URLSearchParams(window.location.search);

// functions
function goto (page) {
  window.location.href = page;
}

function is_logged (){
  return getCookie(cname) !== null;
}

async function login (email, pass){
  var params = { email: email, password: pass };
  // console.log(params);

  // $.post( "https://gonelf.api.stdlib.com/airtable-login-bk@dev/login/", params)
  // .done(function( data ) {
  //   // alert( "Data Loaded: " + data );
  //   // console.log(data);
  //   if (data.code == 200 && data.message.valid == true) {
  //     // create user cookie
  //     setCookie(cname, data.message.user);
  //
  //     // localStorage.setItem('triggers_user', JSON.stringify(data.message.user));
  //     // console.log(JSON.parse(localStorage.getItem('triggers_user')));
  //
  //     window.open(urlParams.get('ref'), '_blank');
  //     goto(dashboard_path);
  //   }
  //   else {
  //     // show error
  //     console.log("error");
  //   }
  // });

  let { user, error } = await _supabase.auth.signIn({
    email: email,
    password: pass
  })

  if (user) {
    // console.log(user);
    setCookie(cname, user);

    // var msg_to_ext = {type: "login", data: JSON.stringify(_supabase)};
    // triggers_send_msg_to_ext(triggers_ext_id, msg_to_ext);

    if (urlParams.get('ref')) window.open(urlParams.get('ref'), '_blank');
    goto(dashboard_path);
  }

  if (error) {
    console.log("error "+error);
  }
}

async function signin (email, pass){
  let { user, error } = await _supabase.auth.signUp({
    email: email,
    password: pass
  });

  if (user) {
    console.log(user);
  }

  if (error) {
    console.log("error "+error);
  }
}

function logout (){
  deleteCookie(cname);
  goto("/");
}

function send_to_dashboard_if_logged() {
  if(is_logged()) {
    goto(dashboard_path);
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
