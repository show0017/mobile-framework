document.addEventListener("DOMContentLoaded", function(){
    window.scrollTo(0, 1);

    var menuToggle = document.querySelector("#menu-toggle");
    menuToggle.addEventListener("click", function(e){
        document.body.classList.toggle("active");
        e.preventDefault();
    })
});
