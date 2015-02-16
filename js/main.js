var svgIcon = (function(){

    var toggled = false;
    var snapCanvas;
    var load = function(svgId, svgUrl){
        /* Load hamburger svg icon that represents menu icon to html. */
	var svgElement = document.getElementById(svgId);
    snapCanvas = Snap( svgElement );
//    snapCanvas.attr( 'viewBox', '0 0 32 32' );
    Snap.load( svgUrl, function (fragment) {
			var g = fragment.select( 'g' );
			snapCanvas.append( g );
    });
    /* Execute hamburger icon animation. */
    svgElement.addEventListener("click", toggle);
    }

    var toggle = function(){
        for( var i = 0; i < hamburgerCross.animation.length; i++ ) {
			var a = hamburgerCross.animation[ i ];
            var el = snapCanvas.select( a.el );
            var animProp = toggled ? a.animProperties.from :
                        a.animProperties.to;
            var val = animProp.val;

			if( animProp.before ) {
				el.attr( JSON.parse( animProp.before ) );
			}
            el.attr( JSON.parse( val ) );
        }/*  for loop*/
        toggled = !toggled;
    }

    return{
        load: load
    }
})();

var siteNavigator = (function(){
    /* TODO: optimize any code that is repeated in this module or even sepatate corresponding
    code snippets to anothe meaningful module. */
    var pages = {};
    var links={};
    var numLinks = 0;
    var numPages = 0;

    var initNavBarListeners = function(){
        var pagesArray = document.querySelectorAll('[data-role="page"]');
        numPages = pagesArray.length;
        var linksArray = document.querySelectorAll('[data-role="pagelink"]');
        numLinks = linksArray.length;

        /* TODO: add check that lenght of links is equal to lenght of pages and
        given ids are equal to given links href.*/

        /* save pages into js object where the key is the same as the given page id*/
        for(var i=0; i< numPages; i++){
            pages[pagesArray[i].getAttribute("id")] = pagesArray[i];
        }
        delete pagesArray; //Free the memory to increase performance.

        for(var i=0;i<numLinks; i++){
            /* Get href attribute and remove hashtag (first character in string value) using
            substr method.*/
            links[linksArray[i].getAttribute("href").substr(1)] = linksArray[i];
            //either add a touch or click listener
            if(detectTouchSupport( )){
                linksArray[i].addEventListener("touchend", handleTouch, false);
            }
            linksArray[i].addEventListener("click", handleNav, false);
        }
        delete linksArray; // Free the memory to increase perfromance.

        //add the listener for the back button
        window.addEventListener("popstate", browserBackButton, false);
        doPageTransition(null, "home");
    }

        //handle the touchend event
    var handleTouch = function (ev){
        ev.preventDefault();
        ev.stopImmediatePropagation();
        var touch = evt.changedTouches[0];        //this is the first object touched
        var newEvt = document.createEvent("MouseEvent");
        //old method works across browsers, though it is deprecated.
        newEvt.initMouseEvent("click", true, true, window, 1, touch.screenX, touch.screenY,
                              touch.clientX, touch.clientY);
        ev.originalTarget.dispatchEvent(newEvt);
        //send the touch to the click handler
    }

    //handle the click event
    var handleNav = function (ev){
        ev.preventDefault();
        var href = ev.target.href;
        var destPageId = href.split("#")[1];
        var srcPageId = document.URL.split("#")[1];
        doPageTransition(srcPageId, destPageId);
        return false;
    }

    var animatePage = function(pg){
        pg.classList.add("active-page");
    }

    var hidePage = function(pg){
        pg.className = "hide";
    }

    //Deal with history API and switching divs
    var doPageTransition = function( srcPageId, destPageId ){

        if(srcPageId == null){
            //home page first call
            pages[destPageId].classList.add("show");
            history.replaceState(null, null, "#"+destPageId);
        }else{
            /* Set active-link class to the corresponding link in Nav-Bar*/
            links[srcPageId].className = "";
            links[destPageId].className = "active-link";

            /* Set active-page class to the corresponding page. First hide the current
            page, then show the destination page. Finally start animation while showing
            the destiation page.*/
            pages[srcPageId].className = "hide";
            pages[destPageId].className =  "show";

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
            history.pushState(null, null, "#" + destPageId);
        }/* else srcPageId is not null*/
    }

    //TODO: Need a listener for the popstate event to handle the back button
    var browserBackButton = function (ev){
      url = location.hash;  //hash will include the "#"
      //update the visible div and the active tab
      for(var i=0; i < numPages; i++){
          if(("#" + pages[i].id) == url){
            pages[i].style.display = "block";
          }else{
            pages[i].style.display = "none";
          }
      }
      for(var t=0; t < numLinks; t++){
        links[t].className = "";
        if(links[t].href == location.href){
          links[t].className = "active-link";
        }
      }
    }

    //Test for browser support of touch events
    var detectTouchSupport = function ( ){
      msGesture = navigator && navigator.msPointerEnabled &&
                    navigator.msMaxTouchPoints > 0 && MSGesture;
      var touchSupport = (("ontouchstart" in window) || msGesture ||
                          (window.DocumentTouch && document instanceof DocumentTouch));
      return touchSupport;
    }

    return{
        initNavBarListeners : initNavBarListeners
    }
})();

document.addEventListener("DOMContentLoaded", function(){

    svgIcon.load("svg-hamburger", hamburgerCross.url);

    siteNavigator.initNavBarListeners();
    /* Execute HTML animatin of hamburger menu.
    Note that hamburger menu has two listeners for the click event:
    1. Handler for HTML animation to push the page from left to right.
    2. Handler for svg icon animation to change it from 3 staked lines to x
    */
    window.scrollTo(0, 1);
    var hamburgerMenu = document.querySelector("#svg-hamburger");
    hamburgerMenu.addEventListener("click", function(e){
        e.preventDefault();
        document.body.classList.toggle("active");
    });
});
