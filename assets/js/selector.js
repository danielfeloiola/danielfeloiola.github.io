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

function pSelect(projects) {


    if(projects == "web") {
        // Qeury for tags with text
        var dataviz = document.querySelectorAll("[type='dataviz']");
        var web = document.querySelectorAll("[type='web']")
        var others = document.querySelectorAll("[type='others']");
        // change the selector in pt
        var datavizselector = document.querySelector("#datavizSelector").innerHTML = "dataviz";
        var webselector = document.querySelector("#webSelector").innerHTML = "<u>web</u>";
        var otherselector = document.querySelector("#otherSelector").innerHTML = "outros";
        // change the selector in en
        var datavizselector = document.querySelector("#datavizSelectorEn").innerHTML = "dataviz";
        var webselector = document.querySelector("#webSelectorEn").innerHTML = "<u>web</u>";
        var otherselector = document.querySelector("#otherSelectorEn").innerHTML = "others";


        // hide en and show pt
        others.forEach(el=>{
            el.style.display = "none";
        })
        web.forEach(el=>{
            fadeIn(el, "");
        })
        dataviz.forEach(el=>{
            el.style.display = "none";
        })

    }
    if(projects == "other") {
        // Qeury for tags with text
        var dataviz = document.querySelectorAll("[type='dataviz']");
        var web = document.querySelectorAll("[type='web']")
        var others = document.querySelectorAll("[type='others']");
        /// change the selector in pt
        var datavizselector = document.querySelector("#datavizSelector").innerHTML = "dataviz";
        var webselector = document.querySelector("#webSelector").innerHTML = "web";
        var otherselector = document.querySelector("#otherSelector").innerHTML = "<u>outros</u>";
        // change the selector in en
        var datavizselector = document.querySelector("#datavizSelectorEn").innerHTML = "dataviz";
        var webselector = document.querySelector("#webSelectorEn").innerHTML = "web";
        var otherselector = document.querySelector("#otherSelectorEn").innerHTML = "<u>others</u>";



        // hide en and show pt
        others.forEach(el=>{
            fadeIn(el, "");
        })
        web.forEach(el=>{
            el.style.display = "none";
        })
        dataviz.forEach(el=>{
            el.style.display = "none";
        })

    }
    if(projects == "dataviz") {
        // Qeury for tags with text
        var dataviz = document.querySelectorAll("[type='dataviz']");
        var web = document.querySelectorAll("[type='web']")
        var others = document.querySelectorAll("[type='others']");
        // change the selector in pt
        var datavizselector = document.querySelector("#datavizSelector").innerHTML = "<u>dataviz</u>";
        var webselector = document.querySelector("#webSelector").innerHTML = "web";
        var otherselector = document.querySelector("#otherSelector").innerHTML = "outros";
        // change the selector in en
        var datavizselector = document.querySelector("#datavizSelectorEn").innerHTML = "<u>dataviz</u>";
        var webselector = document.querySelector("#webSelectorEn").innerHTML = "web";
        var otherselector = document.querySelector("#otherSelectorEn").innerHTML = "others";

        // hide en and show pt
        others.forEach(el=>{
            el.style.display = "none";
        })
        web.forEach(el=>{
            el.style.display = "none";
        })
        dataviz.forEach(el=>{
            fadeIn(el, "");
        })

    }

}
