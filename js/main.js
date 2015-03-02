var anacondaApp = (function(){
    var init = function(){
        document.addEventListener("deviceready", onDeviceReady, false);
        document.addEventListener("DOMContentLoaded", onPageLoaded, false);
        window.addEventListener("resize", onWindowResize, true);
    }

    var onDeviceReady = function(){
        console.log("***************** Device is ready to use its functionalities  ******************");
        contacts.load();
    }

    var onPageLoaded = function(){
        console.log("Page is loaded");
        svgIcons.load();
        siteNavigator.initNavBarListeners();
    }

    var onWindowResize = function(){
        var container = document.querySelector(".st-container");
        /* Check if the user is resizing the window and hamburger menu is opened. Then toggle the menu
        and remove st-menu-open class so that if the user resize the window for small screen again,
        the small-screen navigation bar is always hidden. */
        if ((720<window.innerWidth) &&
            (-1 !== container.className.indexOf("st-menu-open"))){
            var hamburgerMenu = document.querySelector("#hamburger-menu");
            /* Note that the remoaval of st-menu-open class is done inside toggling function of hamburger menu.*/
            hamburgerMenu.myToggleFunc();
        }
    }

    return {
        init: init
    }
})();

var touchModule = (function(){

    //Test for browser support of touch events
    var detectTouchSupport = function ( ){
      msGesture = navigator && navigator.msPointerEnabled &&
                    navigator.msMaxTouchPoints > 0 && MSGesture;
      var touchSupport = (("ontouchstart" in window) || msGesture ||
                          (window.DocumentTouch && document instanceof DocumentTouch));
      return touchSupport;
    }

    //handle the touchend event
    var handleTouch = function (ev){
      if( ev.type == "touchend"){
        ev.preventDefault();
        var touch = ev.changedTouches[0];        //this is the first object touched
        var newEvt = document.createEvent("MouseEvent");	//old method works across browsers, though it is deprecated.
        newEvt.initMouseEvent("click", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY);
        ev.currentTarget.dispatchEvent(newEvt);

      }
    }

    return{
        detectTouchSupport : detectTouchSupport,
        handleTouch : handleTouch
    }
})();

var contacts = (function(){
    var numOfEntries=-1;
    var entries;
    var load = function(){

        var options      = new ContactFindOptions();
        options.filter   = ""; // A string can be used as a search filter when querying the contacts database
        options.multiple = true; // return multiple results.

        var fields       = [navigator.contacts.fieldType.displayName,
                            navigator.contacts.fieldType.phoneNumbers,
                            navigator.contacts.fieldType.addresses,
                            navigator.contacts.fieldType.photos];

        /* Asynchronously method to query the device contacts database.It returns an array of Contact objects.*/
        navigator.contacts.find(fields, onSuccess, onError, options);
    }

    var onSuccess = function(contacts){
        console.log("Found "+ contacts.length+ " on the phone");
        entries = contacts;
        numOfEntries = contacts.length;
    }

    var onError = function(contacts){
        console.error("Error:"+ contacts.code);
        numOfEntries = -1;
        entries = [];
    }

    var getEntries = function(){
        return entries;
    }

    var getAddresses = function(index){
        var addressess=[];
        if(entries[index]){
            var array = entries[index].addresses;
            for (var i=0; array && i< array.length; i++){
                addressess.push(array[i].formatted);
            }
        }
        return addressess;
    }

    var getEmails = function(index){
        var emails=[];
        if(entries[index]){
            var array = entries[index].emails;
            for (var i=0; array && i< array.length; i++){
                emails.push(array[i].value);
            }
        }
        return emails;
    }

    var getPhoneNumbers = function(index){
        var phones=[];
        if(entries[index]){
            var array = entries[index].phoneNumbers;
            for (var i=0; array && i< array.length; i++){
                phones.push(array[i].value);
            }
        }
        return phones;
    }

    return{
        load: load,
        getEntries: getEntries,
        getAddresses: getAddresses,
        getEmails: getEmails,
        getPhoneNumbers: getPhoneNumbers
    }
})();

var svgIcons = (function(){

    var load = function(){
        /* Load all svg images and set their tap event listeners. */
        var svgElementsArray = document.querySelectorAll("svg[data-icon-name]");
        for(var i=0; i<svgElementsArray.length; i++){
            var svgElement = svgElementsArray[i];

            /* Get a reference to the embedded svg tag in the HTML document using Snap SVG*/
            var snapCanvas = Snap( svgElement );

            /* SVG tag must have a custom data set whose value matches the keys of
            svgIconsConfig object that is defined in svgicons-config.js */
            var iconNameDataSet = svgElement.getAttribute("data-icon-name");

            /* Get the value of the corresponding configuration object for each SVG.*/
            var svgConfig= svgIconsConfig[iconNameDataSet];

            /* Load SVG group content into HTML doc through snap svg canvas.
            Note that JS Closure must have been used because load method is asynchronous
            and snap svg canvas must be locked to load the vector graphic inside svg
            element correctly.*/
            Snap.load( svgConfig.url, (function (myCanvas) {
                return function(fragment){
                    var g = fragment.select( 'g' );
                    myCanvas.append( g );
                }
            })(snapCanvas));

            if(true === svgConfig.externalAnimationTrigger){
                /* Tap event listener will be set to the anchor tag that represents
                the parent node of SVG tag in HTML document. Exception for hamburger menu,
                the listener will be set to SVG tag itself.*/
                var targetElem = ("hamburgerCross" === iconNameDataSet)?
                    svgElement: svgElement.parentNode;

                /* Add touch support */
                //either add a touch or click listener
                if(touchModule.detectTouchSupport()){
                    targetElem.addEventListener("touchend", touchModule.handleTouch, false);
                }

                /* JS Closure must be used to lock the canvas and the configurations of
                each svg separately. Note that initial value of toggle flag is false.*/
                targetElem.addEventListener("click",
                        targetElem.myToggleFunc = toggle(svgConfig, snapCanvas, false));

            }
        }
    }

    var toggle = function(config, canvas, toggled){
        return function(){
            if(-1 !== config.url.indexOf("hamburger")){
                /* Execute HTML animatin of hamburger menu.
                Note that hamburger menu has to handle the following animations:
                1. HTML animation to push the page from left to right.
                2. SVG icon animation to change it from 3 staked lines to x
                */
                var container = document.querySelector(".st-container");
                container.classList.toggle("st-menu-open");
            }

            /* Loop on animation configurations of the given SVG. Select the
            given id, parse the attribute of that id. Finally apply the attribute
            to the id using snap svg library.*/
            for( var i = 0; i < config.animation.length; i++ ) {
                var a = config.animation[ i ];
                var el = canvas.select( a.el );
                var animProp = toggled ?
                    a.animProperties.from : a.animProperties.to;
                var val = animProp.val;

                if( animProp.before ) {
                    el.attr( JSON.parse( animProp.before ) );
                }
                el.attr( JSON.parse( val ) );
            }/*  for loop*/
            toggled = !toggled;
        }
    }

    return{
        load: load
    }
})();

var position = (function (){

    /* Note that these variables are going to be created only once so that we save memory
    allocation for any new instances of these variables.*/
    var svgLoadingIcon; //svg div whose id is "loading" in HTML document.
    var locationInfoContainerDiv; // location info div whose id is "loc-info-container" in HTML

    var getCurrentLocation = function(){
      if( navigator.geolocation ){
          var params = {enableHighAccuracy: false, timeout:3600, maximumAge:60000};
          navigator.geolocation.getCurrentPosition( reportPosition, gpsError, params );
      }else{
        //browser does not support geolocation api
        alert("Sorry, but your browser does not support location based awesomeness.")
      }
    }


    var reportPosition = function ( position ){
        var canvas = document.querySelector("#canvas-map");

        var canvasPaddingInPx = getComputedStyle(canvas,null).getPropertyValue("padding-left");
        /* remove px from the padding string*/
        canvasPaddingInPx = canvasPaddingInPx.substring(0, canvasPaddingInPx.length-2);
        console.log(canvasPaddingInPx);
        var canvasComputedWidth = canvas.width - 2* canvasPaddingInPx;
        var context = canvas.getContext("2d");

        // Create new img element
        var img = new Image();

        img.onload = function( ){
            context.drawImage(img, 0, 0);

            var info = document.getElementById("lat-lon");
            info.innerHTML = "Latitude: " + position.coords.latitude + "&deg;<br/>"
                + "Longitude: " + position.coords.longitude + "&deg;<br/>";

            svgLoadingIcon.style.display="none";
            locationInfoContainerDiv.style.display = "block";
        }

        // Set source path
        img.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' +
            position.coords.latitude+','+
            position.coords.longitude+'&'+
            'zoom=14'+ '&'+
            'size='+canvasComputedWidth+'x400'+'&'+
            'markers=color:red'+'|'+
            position.coords.latitude+','+
            position.coords.longitude+'&'+
            'key=AIzaSyCzGkfTYLGyBb9eM9bWgjlhmBdldBSBwNA';
    }

    var gpsError = function ( error ){
      var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
      };

      /* Hide the loading icon svg before showing user notification. */
      svgLoadingIcon.style.display="none";
      alert("Error: " + errors[error.code]);
    }

    var resetPositionDIVs= function(){
        /* Get a reference to svg loading icon and sibling node that contains map canvas and
        paragraph for showing latitue and longitude. */
        if(!svgLoadingIcon){
            svgLoadingIcon = document.querySelector("#loading");
        }
        if(!locationInfoContainerDiv){
            locationInfoContainerDiv = document.querySelector("#loc-info-container");
        }

        /* Always show loading icon hide the location information container div.*/
        svgLoadingIcon.style.display="block";
        locationInfoContainerDiv.style.display = "none";

    }

    return{
        getCurrentLocation: getCurrentLocation,
        resetPositionDIVs: resetPositionDIVs
    }
})();

var siteNavigator = (function(){
    var pages = {};
    var links={};
    var numLinks = 0;
    var numPages = 0;
    var currentPageId = null;

    var initNavBarListeners = function(){
        var key;
        var pagesArray = document.querySelectorAll('[data-role="page"]');
        numPages = pagesArray.length;
        var linksArray = document.querySelectorAll('[data-role="pagelink"]');
        numLinks = linksArray.length;

        /* save pages into js object where the key is the same as the given page id*/
        for(var i=0; i< numPages; i++){
            pages[pagesArray[i].getAttribute("id")] = pagesArray[i];
        }
        delete pagesArray; //Free the memory to increase performance.

        for(var i=0;i<numLinks; i++){
            /* Get href attribute and remove hashtag (first character in string value) using
            substr method.*/
            key = linksArray[i].getAttribute("href").substr(1);
            /* Since there are two navigation bars (one for small screen and another one for wide screen)
            with the same attributes, there must be saved in different keys to avoid any value overwriting.*/
            key += (i<numLinks/2)?"-smallScreen":"-wideScreen";
            links[key] = linksArray[i];

            //Add touch and click listeners.
            if(touchModule.detectTouchSupport()){
                linksArray[i].addEventListener("touchend", touchModule.handleTouch, false);
            }
            linksArray[i].addEventListener("click", handleNav, false);
        }
        delete linksArray; // Free the memory to increase perfromance.

        //add event listener for select random contact button
        var selectBtn = document.querySelector("#select-contact");
        if(touchModule.detectTouchSupport()){
            selectBtn.addEventListener("touchend", touchModule.handleTouch, false);
        }
        selectBtn.addEventListener("click", selectRandomContact, false);

        //add the listener for the back button
        window.addEventListener("popstate", browserBackButton, false);
        doPageTransition(null, "home");
    }

    //handle the click event
    var handleNav = function (ev){
        ev.preventDefault();

        /* Since the handlers of click/touch listeners are registered using bubbling
        propatation. Also the handlers are registered for acnhor tags not for SVG tags.
        Accordingly, currentTarget must be used instead of target to get href attribute
        of anchor tag.*/
        var href = ev.currentTarget.href;
        var destPageId = href.split("#")[1];
        var srcPageId = document.URL.split("#")[1];
        doPageTransition(srcPageId, destPageId, true);
        return false;
    }

    var loadDynamicContents = function(pageId){
        switch(pageId){
            case "home":
                break;
            case "location":
                /* Always make sure to display loading icon before showing map canvas*/
                position.resetPositionDIVs();
                /* wait for 2 sec before triggering the new location request. */
                setTimeout(position.getCurrentLocation, 2000);
                break;
            case "contacts":
                break;
            default:
        }
    }

    var animatePage = function(pg){
        pg.classList.add("active-page");
    }

    var hidePage = function(pg){
        pg.className = "hide";
    }

    //Deal with history API and switching divs
    var doPageTransition = function( srcPageId, destPageId, isHistoryPush, isBackBtnPressed ){

        if(srcPageId == null){

            //home page first call
            pages[destPageId].classList.add("show");
            history.replaceState(null, null, "#"+destPageId);
        }else{

            /* Set active-link class to the corresponding link in Nav-Bar. Note that actions must be taken
            for both navigation bars so that same user experience would be kept for all screens and even
            if user resizes the browser window. */
            links[srcPageId+"-smallScreen"].className = " ";
            links[srcPageId+"-wideScreen"].className = " ";

            links[destPageId+"-smallScreen"].className = "active-link";
            links[destPageId+"-wideScreen"].className = "active-link";

            /* Activate SVG animation for the navigation bar that is hidden.*/
            if(720>window.innerWidth){
                /* case: small screen navigation bar is displayed and user clicks on a link.
                The link SVG of the wide screen navigation bar must be acitvated as well.
                Thus the same user experience is kept upon window resizing.*/
                links[destPageId+"-wideScreen"].myToggleFunc();

                /* in case back button is pressed, toggle the svg anchor animation of the destination page.*/
                if(isBackBtnPressed){
                    links[destPageId+"-smallScreen"].myToggleFunc();
                }

                /* For small screen sizes, if hamburger menu is opened, make sure to close it after user's selection.*/
                var container = document.querySelector(".st-container");
                if (-1 !== container.className.indexOf("st-menu-open")){
                    var hamburgerMenu = document.querySelector("#hamburger-menu");
                    /* Note that the remoaval of st-menu-open class is done inside toggling function of hamburger menu.*/
                    hamburgerMenu.myToggleFunc();
                }

            }else{
                /* case: wide screen navigation bar is displayed and user clicks on a link.
                The link SVG of the small screen navigation bar must be activated as well.
                Thus the same user experience is kept upond window resizing. */
                links[destPageId+"-smallScreen"].myToggleFunc();

                /* in case back button is pressed, toggle the svg anchor animation of the destination page.*/
                if(isBackBtnPressed){
                    links[destPageId+"-wideScreen"].myToggleFunc();
                }

            }

            /* Reverse the animation of the source page's svg icon .
            The destination page animation will take place upon clicking the anchor/svg*/
            links[srcPageId+"-smallScreen"].myToggleFunc();
            links[srcPageId+"-wideScreen"].myToggleFunc();

            /* Set active-page class to the corresponding page. First hide the current
            page, then show the destination page. Finally start animation while showing
            the destiation page.*/
            pages[srcPageId].className = "hide";
            pages[destPageId].className =  "show";

            loadDynamicContents(destPageId);

            /* It looks weired to set zero opacity after displaying the destination page. But
            this is normal because page flicking (during the animation of page transition) will take
            place if opacity was not set to zero. The class "show" is first added to the destination page
            afterwards, animation takes place starting from opacity zero. This is the root cause of
            flicking. To have smooth animation, we must set opacity to zero directly after displaying the
            destination page and before starting the animation.*/
            pages[destPageId].style.opacity = 0;

            /* Wait for 30 msec before applying the animation of page transition. This gives the
            browser time to update all the divs before applying the animation*/
            setTimeout(animatePage, 30, pages[destPageId]);

            if (isHistoryPush)
                history.pushState(null, null, "#" + destPageId);

            currentPageId = destPageId;
        }/* else srcPageId is not null*/
    }

    //Listener for the popstate event to handle the back button
    var browserBackButton = function (ev){
        ev.preventDefault();
        var destPageId = location.hash.split("#")[1];  //hash will include the "#"

        //update the visible div and the active tab
        doPageTransition(currentPageId, destPageId, false, true);
    }

    var selectRandomContact = function(){
        /* Generate a random number from the available contacts to be displayed.
        Note that a random number will be generated in the range (0, maximum length of contacts -1)*/
        console.log("Button is pressed");
        if(contacts.getEntries()){
            var randomIndex = Math.floor(Math.random() * contacts.getEntries().length);
            console.log("randomIndex is:" + randomIndex);
            var contactInfo = contacts.getEntries()[randomIndex];
            var tablePlaceHolders = document.querySelectorAll("table tr td");

            tablePlaceHolders[0].innerHTML = contactInfo.displayName;

            tablePlaceHolders[1].innerHTML ="";
            var contactAddresses = contacts.getAddresses(randomIndex);
            for(var j=0; j<contactAddresses.length; j++ ){
                tablePlaceHolders[1].innerHTML += contactAddresses[j] + "<br>";
            }

            tablePlaceHolders[2].innerHTML = "";
            var contactPhoneNumbers = contacts.getPhoneNumbers(randomIndex);
            for(var j=0; j<contactPhoneNumbers.length; j++ ){
                tablePlaceHolders[2].innerHTML += contactPhoneNumbers[j] + "<br>";
            }

            tablePlaceHolders[3].innerHTML = "";
            var contactEmails = contacts.getEmails(randomIndex);
            for(var j=0; j< contactEmails.length; j++){
                tablePlaceHolders[3].innerHTML += contactEmails[j] + "<br>";
            }

            var img = tablePlaceHolders[4].querySelector("img");
            img.src="";
            if(contactInfo.photos){
                img.src = contactInfo.photos[0].value;
            }
        }
    }

    return {
        initNavBarListeners : initNavBarListeners
    }
})();

anacondaApp.init();
