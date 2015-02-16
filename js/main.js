var svgIcon = (function(){

    var toggled = false;
    var snapCanvas;
    var load = function(svgId, svgUrl){
        /* Load hamburger svg icon that represents menu icon to html. */
	var svgElement = document.getElementById(svgId);
    snapCanvas = Snap( svgElement );
    //viewBox must match the same value in the original svg file. This represents the artboard.
    snapCanvas.attr( 'viewBox', '0 0 64 64' );
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
            links[linksArray[i].getAttribute("href")] = linksArray[i];
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
//            pages[srcPageId].classList.remove("active-page");
            /*Since opacity tranision takes 2sec as set on css file.
              We must wait till the animation is finished to hide the last active page.*/
//            setTimeout(hidePage, 10, pages[srcPageId]);
            pages[srcPageId].className = "hide";

            pages[destPageId].className =  "show";
            setTimeout(animatePage, 10, pages[destPageId]);
            history.pushState(null, null, "#" + destPageId);
        }/* else url is not null*/
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
