// ** FADE IN FUNCTION **
function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display;
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .05) >= 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};


function Lang(language) {

    if(language == "en") {
        // Qeury for tags with text
        var en = document.querySelectorAll("[lang='en']")
        var pt = document.querySelectorAll("[lang='pt']");
        // change the selector
        var enselector = document.querySelector("#enSelector").innerHTML = "<u>English</u>";
        var ptselector = document.querySelector("#ptSelector").innerHTML = "Português";
        // change title
        document.title = 'My portfolio';

        //var webselector = document.querySelector("#webSelectorEn").innerHTML = "<u>web</u>";

        // hide en and show pt
        pt.forEach(el=>{
            el.style.display = "none";
        })
        en.forEach(el=>{
            //el.style.display = "";
            fadeIn(el, "");
        })

    }
    if(language == "pt") {
        // Qeury for tags with text
        var en = document.querySelectorAll("[lang='en']");
        var pt = document.querySelectorAll("[lang='pt']");
        // change the selector
        var selector = document.querySelector("#ptSelector").innerHTML = "<u>Português</u>"
        var enselector = document.querySelector("#enSelector").innerHTML = "English"

        // change title
        document.title = 'Meu portfólio';

        // reset project selector
        //var webselector = document.querySelector("#webSelector").innerHTML = "<u>web</u>";

        // hide en and show pt
        en.forEach(el=>{
            el.style.display = "none";
        })
        pt.forEach(el=>{
            //el.style.display = "";
            fadeIn(el, "");
        })

    }

}
