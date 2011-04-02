document.body.addEventListener('touchmove', function(e) {
    // This prevents native scrolling from happening.
    e.preventDefault();
}, false);