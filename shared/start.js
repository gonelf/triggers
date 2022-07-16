
// declarations

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhaXBtYmpqZGlucmtxanpoc21tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU5MDE4ODksImV4cCI6MTk3MTQ3Nzg4OX0.PzJP_QTN7zW0Wz0euTlMoSgrlIJvn93tpfWpvgVQ4qA';
const SUPABASE_URL = "https://taipmbjjdinrkqjzhsmm.supabase.co";
const { createClient } = supabase;
supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

var tjq = jQuery.noConflict();
var trigger_client_id = tjq('script[data-user][data-user!=null]').attr('data-user');

var trigger_anon_user = {};
var trigger_page_events = [];

tjq.fn.xpathEvaluate = function (xpathExpression) {
   // NOTE: vars not declared local for debug purposes
   $this = this.first(); // Don't make me deal with multiples before coffee

   // Evaluate xpath and retrieve matching nodes
   xpathResult = this[0].evaluate(xpathExpression, this[0], null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

   result = [];
   while (elem = xpathResult.iterateNext()) {
      result.push(elem);
   }

   $result = jQuery([]).pushStack( result );
   var parts = $result.to
   return $result;
}

// functions
async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}

const getCountry = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!timezone || timezone === "") return null;
  const countryAbbreviation = timezones[timezone].c[0];
  const country = countries[countryAbbreviation];
  return country;
}

async function defineAnonUser(){
  let ip = await tjq.getJSON("https://api.ipify.org?format=json")
  ip = ip.ip;

  const RSS_URL = `https://feeds.feedblitz.com/english-word-of-the-day-for-portuguese&x=1`;
  let salt = await fetch(RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      let _salt = data.querySelectorAll("title")[1].textContent.split(":")[1].trim()
      return _salt
    })

  if (ip && salt) {
    // console.log(ip+":"+salt);
    digestMessage(salt+ip).then(hash => {
      // console.log("$w$"+hash);
      trigger_anon_user["id"] = "$w$"+hash;
    })
  }

  trigger_anon_user['country'] = getCountry();
  trigger_anon_user['userAgent'] = navigator.userAgent;
  //console.log(trigger_anon_user);
}

async function getClientEvents(client_id=""){
  let page = window.location.href.split("?")[0];
  //console.log(location);
  let { data, error } = await supabase.from('events').select().eq('user_id', client_id).in('page', [page, 'any']);

  if (data) {
    console.log(data);
    trigger_page_events = data;
    tjq.each(data, function(i, event){
      let target = tjq(document).xpathEvaluate(event.xpath)
      target.addClass("trigger_event")
      target.attr("trigger_event_count", i)
      console.log(event.xpath);

      tjq(document).xpathEvaluate(event.xpath).on(event.trigger, function(e){
  			console.log("event triggered");
        if (typeof evtnr_live_on !== 'undefined' && evtnr_live_on){
          window.postMessage({ type: "FROM_PAGE", action: "event_trigger", data: event });
        }

        var postData = { event_id: event.UID, client_id: client_id, user: trigger_anon_user };
        // console.log(postData);

        tjq.ajax("https://dev--triggers-destination.gonelf.autocode.gg/event/", {
          data : JSON.stringify(postData),
          contentType : 'application/json',
          type : 'POST'})
          // .success((e)=>{
          //   console.log(e);
          // });
  		});
    });
  }
  else {
    console.log(error);
  }
}



// actions
tjq(function() {
  console.log( "triggers ready!" );
  // console.log(user_id);
  if (trigger_client_id) {
    getClientEvents(trigger_client_id);
    defineAnonUser();
  }
});
