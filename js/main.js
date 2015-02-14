document.addEventListener("DOMContentLoaded", function(){

    /* Load hamburger svg icon that represents menu icon to html. */
	var svgElement = document.getElementById("svg-hamburger");
    var snapCanvas = Snap( svgElement );
    snapCanvas.attr( 'viewBox', '0 0 64 64' );
    //svgElement.appendChild( snapCanvas.node );
    Snap.load( "svg/hamburger.svg", function (f) {
			var g = f.select( 'g' );
			snapCanvas.append( g );


    });

    /* Execute hamburger menu animation. */
    window.scrollTo(0, 1);

    var menuToggle = document.querySelector("#svg-hamburger");
    menuToggle.addEventListener("click", function(e){
        document.body.classList.toggle("active");
        e.preventDefault();
    })
});
