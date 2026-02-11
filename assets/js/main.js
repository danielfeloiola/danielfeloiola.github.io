// ** MAIN INITIALIZATION **
document.addEventListener('DOMContentLoaded', function() {
    // Hide all English text on page load (default to Portuguese)
    document.querySelectorAll("[lang='en']").forEach(el => {
        el.style.display = "none";
    });

    // Add initial-load class to Portuguese greeting and tagline for animation
    document.querySelectorAll("[lang='pt'].greeting, [lang='pt'].tagline").forEach(el => {
        el.classList.add('initial-load');
        // Remove the class after animation completes to prevent re-animation on language switch
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
