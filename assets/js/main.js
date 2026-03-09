// ** MAIN INITIALIZATION **
document.addEventListener('DOMContentLoaded', function() {
    // Check URL for language parameter
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const startLang = urlLang === 'en' ? 'en' : 'pt';
    const hideLang = startLang === 'en' ? 'pt' : 'en';

    // Hide the inactive language on page load
    document.querySelectorAll("[lang='" + hideLang + "']:not(html):not(body)").forEach(el => {
        el.style.display = "none";
    });

    // If starting in English, show EN elements with correct display type
    if (startLang === 'en') {
        document.documentElement.lang = 'en';
        document.title = 'Daniel Loiola - Portfolio';
        document.getElementById('ptSelector').classList.remove('active');
        document.getElementById('enSelector').classList.add('active');
        document.querySelectorAll("[lang='en']:not(html):not(body)").forEach(el => {
            el.style.display = el.classList.contains('inline') ? 'inline' : '';
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
