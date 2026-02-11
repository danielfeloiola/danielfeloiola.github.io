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


// ** LANGUAGE SELECTOR **
function Lang(language) {
    
    // Atualiza o lang do documento
    document.documentElement.lang = language;
    
    // Seleciona só elementos internos, não html/body
    var en = document.querySelectorAll("[lang='en']:not(html):not(body)");
    var pt = document.querySelectorAll("[lang='pt']:not(html):not(body)");

    if (language == "en") {
        // change the selector active state
        document.querySelector("#enSelector").classList.add("active");
        document.querySelector("#ptSelector").classList.remove("active");
        // change title
        document.title = 'Daniel Loiola - Portfolio';
        // hide pt and show en
        pt.forEach(el => { el.style.display = "none"; });
        en.forEach(el => {
            // Check if element has inline class
            var displayType = el.classList.contains('inline') ? 'inline' : '';
            fadeIn(el, displayType);
        });
    }

    if (language == "pt") {
        // change the selector active state
        document.querySelector("#ptSelector").classList.add("active");
        document.querySelector("#enSelector").classList.remove("active");
        // change title
        document.title = 'Daniel Loiola - Portfólio';
        // hide en and show pt
        en.forEach(el => { el.style.display = "none"; });
        pt.forEach(el => {
            // Check if element has inline class
            var displayType = el.classList.contains('inline') ? 'inline' : '';
            fadeIn(el, displayType);
        });
    }
}


// ** PROJECT TABS SELECTOR **
function showTab(tab, event) {
    // Hide all project grids
    document.querySelectorAll('.projects-grid').forEach(grid => {
        grid.classList.remove('active');
    });
    // Show the selected tab
    document.getElementById(tab).classList.add('active');

    // Update button active states
    document.querySelectorAll('.project-tabs button').forEach(btn => {
        btn.classList.remove('active');
    });

    // If event is provided, mark the clicked button as active
    if (event) {
        event.target.closest('button').classList.add('active');
    }
}
