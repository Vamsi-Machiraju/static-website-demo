document.querySelectorAll(".nav-panel a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault(); // Prevent default jump behavior

        const targetID = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetID);

        if (targetElement) {
            const headerHeight = document.querySelector(".top-hd-flex-con").offsetHeight; // Get fixed header height
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 120; // Adjust offset

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth" // Smooth scrolling effect
            });
        }
    });
});
