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
