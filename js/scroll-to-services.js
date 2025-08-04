document.querySelectorAll(".scroll-link").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault(); // Prevent default anchor behavior
        const targetID = this.getAttribute("href").substring(1); // Get section ID
        document.getElementById(targetID).scrollIntoView({
            behavior: "smooth" // Enable smooth scrolling
        });
    });
});
