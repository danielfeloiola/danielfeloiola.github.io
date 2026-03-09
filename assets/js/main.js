// ** MAIN INITIALIZATION **
document.addEventListener('DOMContentLoaded', function() {
    // Check URL for language parameter
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const startLang = urlLang === 'en' ? 'en' : 'pt';

    // Initialize language (Lang() is defined in selectors.js)
    if (startLang === 'en') {
        Lang('en');
    } else {
        // Default: hide English elements
        document.querySelectorAll("[lang='en']:not(html):not(body)").forEach(el => {
            el.style.display = "none";
        });
    }

    // Add initial-load class to greeting and tagline for animation
    document.querySelectorAll("[lang='" + startLang + "'].greeting, [lang='" + startLang + "'].tagline").forEach(el => {
        el.classList.add('initial-load');
        setTimeout(() => {
            el.classList.remove('initial-load');
        }, 1000);
    });

    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
