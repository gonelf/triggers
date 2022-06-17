var PERMITTED_DOMAIN = "http://popil.lol";
/**
 * Receiving message from other domain
 */
window.addEventListener('message', function(event) {
    if (event.origin === PERMITTED_DOMAIN) {
      console.log(event.data);
        //var msg = JSON.parse(event.data);
        // var msgKey = Object.keys(msg)[0];
        if (event.data) {
            localStorage.setItem("localstorage", event.data);
        } else {
            localStorage.removeItem("localstorage");
        }
    }

});