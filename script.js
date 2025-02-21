document.addEventListener("DOMContentLoaded", function () {
    // Ensure GSAP is loaded
    if (typeof gsap === "undefined") {
        console.error("GSAP is not loaded. Please include GSAP before running this script.");
        return;
    }

    // Splash screen transition
    setTimeout(() => {
        const splashScreen = document.getElementById("splash-screen");
        const mainContent = document.getElementById("main-content");
        const homeButton = document.querySelector(".home-button");
        const navLinks = document.querySelector(".nav-links");

        if (splashScreen) splashScreen.style.display = "none";
        if (mainContent) mainContent.style.display = "block";
        if (homeButton) homeButton.style.display = "block";
        if (navLinks) navLinks.style.display = "flex";

        // GSAP Animations for Hero Section
        gsap.to(".hero-title", { opacity: 1, y: -20, duration: 1, ease: "power2.out" });
        gsap.to(".hero-subtitle", { opacity: 1, y: -10, duration: 1, delay: 0.5, ease: "power2.out" });
        gsap.from(".hero-image", { opacity: 0, y: 30, duration: 1, delay: 1, stagger: 0.3, ease: "power2.out" });
    }, 4500);

    // Hero images hover effect (Increased sensitivity & hover area)
    document.querySelectorAll(".hero-image").forEach(img => {
        img.addEventListener("mouseenter", () => {
            img.style.zIndex = "100"; // Bring hovered image forward
            img.style.transition = "transform 0.1s ease-out"; // Faster response
        });

        img.addEventListener("mousemove", (e) => {
            const { left, top, width, height } = img.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) / 4;  // Increased sensitivity
            const y = (e.clientY - top - height / 2) / 4;

            img.style.transform = `translate(${x}px, ${y}px) scale(1.2)`; // Larger scale effect
        });

        img.addEventListener("mouseleave", () => {
            img.style.transition = "transform 0.2s ease-out, z-index 0.2s";
            img.style.transform = "translate(0px, 0px) scale(1)";
            setTimeout(() => img.style.zIndex = "5", 200);
        });
    });

    // Hide other images and text when hovering over an image
    const heroImages = document.querySelectorAll(".hero-image");
    const heroTitle = document.querySelector(".hero-title");

    heroImages.forEach(image => {
        image.addEventListener("mouseenter", function () {
            heroImages.forEach(img => {
                if (img !== image) img.style.opacity = "0.0"; // Slightly visible instead of completely hiding
            });
            heroTitle.style.opacity = "0";
        });

        image.addEventListener("mouseleave", function () {
            heroImages.forEach(img => img.style.opacity = "1");
            heroTitle.style.opacity = "1";
        });
    });

    // Hamburger Menu Toggle
    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".nav-links");

    if (menuIcon && navLinks) {
        menuIcon.addEventListener("click", function () {
            navLinks.classList.toggle("show");
        });
    } else {
        console.error("Menu icon or nav-links not found in the document.");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const heroImages = document.querySelectorAll(".hero-image");
    const heroTitle = document.querySelector(".hero-title");

    // Create rectangles with proper diagonals for each image
    const rectangles = [];
    heroImages.forEach((image, index) => {
        const rect = document.createElement("div");
        rect.classList.add("hero-rectangle");
        rect.style.position = "absolute";
        rect.style.background = "rgba(255, 255, 255, 0.08)";
        rect.style.border = "2px solid white";
        rect.style.borderRadius = "10px";
        rect.style.transition = "opacity 0.3s ease-in-out";
        rect.style.opacity = "0"; // Initially hidden
        rect.style.pointerEvents = "none"; // No interaction
        rect.style.overflow = "hidden"; // Prevents diagonals from exceeding borders

        // Create diagonal lines inside the rectangle
        rect.innerHTML = `
            <div class="diagonal-line" style="position: absolute; width: 141%; height: 2px; background: white; top: 50%; left: -20%; transform: rotate(45deg);"></div>
            <div class="diagonal-line" style="position: absolute; width: 141%; height: 2px; background: white; top: 50%; left: -20%; transform: rotate(-45deg);"></div>
        `;

        document.body.appendChild(rect);
        rectangles.push(rect);
    });

    heroImages.forEach((image, index) => {
        image.addEventListener("mouseenter", function () {
            heroImages.forEach((img, i) => {
                if (i !== index) {
                    img.style.opacity = "0"; // Hide other images

                    // Show rectangles where images are hidden
                    const { left, top, width, height } = img.getBoundingClientRect();
                    rectangles[i].style.left = `${left}px`;
                    rectangles[i].style.top = `${top}px`;
                    rectangles[i].style.width = `${width}px`;
                    rectangles[i].style.height = `${height}px`;
                    rectangles[i].style.opacity = "1";
                }
            });

            heroTitle.style.opacity = "0";
        });

        image.addEventListener("mouseleave", function () {
            heroImages.forEach(img => img.style.opacity = "1"); // Show images
            heroTitle.style.opacity = "1";

            // Hide all rectangles
            rectangles.forEach(rect => rect.style.opacity = "0");
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const heroImages = document.querySelectorAll(".hero-image");

    heroImages.forEach(image => {
        // Create a label for each image
        const label = document.createElement("span");
        label.classList.add("image-label");
        label.textContent = image.dataset.letter; // Get letter from data attribute
        document.body.appendChild(label);

        image.addEventListener("mouseenter", function () {
            label.style.display = "block"; // Show label
            updateLabelPosition(image, label);
        });

        image.addEventListener("mousemove", function () {
            updateLabelPosition(image, label);
        });

        image.addEventListener("mouseleave", function () {
            label.style.display = "none"; // Hide when leaving
        });
    });

    function updateLabelPosition(image, label) {
        const rect = image.getBoundingClientRect();
        label.style.left = `${rect.right - 40}px`;  // Position at bottom-right
        label.style.top = `${rect.bottom - 40}px`;
    }
});
