xdLocalStorage.init(
    {
        /* required */
        iframeUrl:'https://9c56-79-169-178-176.eu.ngrok.io/start.html',
        //an option function to be called right after the iframe was loaded and ready for action
        initCallback: function () {
            console.log('Got iframe ready');
        }
    }
);
