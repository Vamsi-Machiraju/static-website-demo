let currentIndex = 0;
const slides = document.querySelectorAll(".banner-slide");
const dots = document.querySelectorAll(".dot");
let slideInterval;

// Function to Show a Slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        dots[i].classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");
}

// Function to Change Slide (Manual Click)
function changeSlide(n) {
    currentIndex = n;
    showSlide(currentIndex);
}

// Function to Move to the Next Slide (Auto-Slide)
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

// Start Auto-Sliding
function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

// Stop Auto-Sliding
function stopSlideShow() {
    clearInterval(slideInterval);
}

// Start the slideshow initially
startSlideShow();

// Pause when hovering over the banner images
document.querySelector(".hero-banner").addEventListener("mouseenter", stopSlideShow);
document.querySelector(".hero-banner").addEventListener("mouseleave", startSlideShow);

// Allow manual navigation using dots
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => changeSlide(i));
});
