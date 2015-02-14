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

document.addEventListener("DOMContentLoaded", function(){

    svgIcon.load("svg-hamburger", hamburgerCross.url);

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
