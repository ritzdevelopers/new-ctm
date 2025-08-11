// Scroll behavior with GSAP
function navbarAnimations() {
  let lastScroll = 0;
  const header = document.querySelector("header nav");
  const mobileHeader = document.querySelector(".mobile-nav");

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      // At top of page
      gsap.to([header, mobileHeader], { y: 0, duration: 0.3 });
      return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrolling down
      gsap.to([header, mobileHeader], { y: -200, duration: 0.3 });
    } else if (currentScroll < lastScroll) {
      // Scrolling up
      gsap.to([header, mobileHeader], { y: 0, duration: 0.3 });
    }

    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  const hamburger = document.getElementById("hamburger");
  const mobileNavMenu = document.getElementById("mobileNavMenu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileNavMenu.classList.toggle("active");

    // Animate hamburger to X
    if (hamburger.classList.contains("active")) {
      gsap.to(hamburger.querySelectorAll("span"), {
        rotation: 45,
        y: 8,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(hamburger.querySelectorAll("span")[1], { opacity: 0 });
      gsap.to(hamburger.querySelectorAll("span")[2], {
        rotation: -45,
        y: -8,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(hamburger.querySelectorAll("span"), {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(hamburger.querySelectorAll("span")[1], { opacity: 1 });
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileNavMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("active");
      mobileNavMenu.classList.remove("active");
      gsap.to(hamburger.querySelectorAll("span"), {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(hamburger.querySelectorAll("span")[1], { opacity: 1 });
    }
  });
}
navbarAnimations();

function heroSectionAnimations() {
  // Check if elements exist
  const heroSection = document.querySelector('.s1');
  if (!heroSection) return;

  // Check if GSAP is loaded
  if (typeof gsap !== "undefined") {
    // Initialize ScrollTrigger plugin if available
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.defaults({
        markers: false // Set to true for debugging
      });
    }

    // Set initial state (hidden)
    gsap.set(".s1 .txt-div h1", { opacity: 0, y: 50 });
    gsap.set(".s1 .txt-div p", { opacity: 0, y: 50 });
    gsap.set(".s1 .txt-div button", { opacity: 0, y: 50 });

    // Create animation timeline
    const heroTl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.3 // Small delay to ensure everything's ready
    });

    // Animate elements in sequence
    heroTl
      .to(".s1 .txt-div h1", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.2)"
      })
      .to(
        ".s1 .txt-div p", 
        {
          opacity: 1,
          y: 0,
          duration: 0.6
        },
        "-=0.4" // Overlap with previous animation
      )
      .to(
        ".s1 .txt-div button", 
        {
          opacity: 1,
          y: 0,
          duration: 0.6
        },
        "-=0.3" // Overlap with previous animation
      );

    // Only add scroll-triggered animation if ScrollTrigger exists
    if (typeof ScrollTrigger !== "undefined") {
      gsap.to(".s1 .txt-div", {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: ".s1",
          start: "top top", // Changed from "bottom bottom"
          end: "bottom top",
          scrub: true,
          // Disable this trigger until entrance animation completes
          toggleActions: "play none none none" 
        }
      });
    }
  } else {
    // Fallback if GSAP isn't loaded
    document.querySelectorAll(".s1 .txt-div h1, .s1 .txt-div p, .s1 .txt-div button")
      .forEach((el) => {
        el.style.opacity = 1;
        el.style.transform = "none";
      });
  }
}

// Call the function when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add small delay to ensure GSAP is loaded if loaded async
  setTimeout(heroSectionAnimations, 300);
});

function section2Animations() {
  // Section 2 Animations
  document.addEventListener("DOMContentLoaded", function () {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      // Set initial states
      gsap.set(".s2 .s2Banner", { opacity: 0, y: 50 });
      gsap.set(".s2 .lftSide", { opacity: 0, x: -50 });
      gsap.set(".s2 .rghtSide", { opacity: 0, x: 50 });
      gsap.set(".s2 .s2Tap", { opacity: 0, y: 50 });

      // Create ScrollTriggers for each element
      ScrollTrigger.batch(".s2 .s2Banner", {
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
          }),
      });

      ScrollTrigger.batch(".s2 .main-containt", {
        onEnter: (batch) =>
          gsap.to(".s2 .lftSide", {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
          }),
      });

      ScrollTrigger.batch(".s2 .main-containt", {
        onEnter: (batch) =>
          gsap.to(".s2 .rghtSide", {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2,
          }),
      });

      ScrollTrigger.batch(".s2 .s2Tap", {
        onEnter: (batch) => {
          gsap.to(".s2 .s2Tap", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });

          // Animate the stats counters
          const counters = document.querySelectorAll(".s2 .s2abs div .pr h2");
          counters.forEach((counter) => {
            const target = +counter.innerText.replace("+", "");
            gsap.from(counter, {
              innerText: 0,
              duration: 2,
              ease: "power1.out",
              snap: { innerText: 1 },
              modifiers: {
                innerText: function (innerText) {
                  return Math.floor(parseFloat(innerText)) + "+";
                },
              },
              scrollTrigger: {
                trigger: counter,
                start: "top 80%",
              },
            });
          });
        },
      });

      // Parallax effect for the floating elements
      gsap.to(".s2 .s2abs div .pnk", {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    } else {
      // Fallback if GSAP/ScrollTrigger not available
      document
        .querySelectorAll(
          ".s2 .s2Banner, .s2 .lftSide, .s2 .rghtSide, .s2 .s2Tap"
        )
        .forEach((el) => {
          el.style.opacity = 1;
          el.style.transform = "none";
        });
    }
  });
}
section2Animations();

function section3Animations() {
  // Section 3 Animations
  document.addEventListener("DOMContentLoaded", function () {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      // Set initial states
      gsap.set(".s3 .card-ct-1 .card1", {
        opacity: 0,
        y: 50,
        scale: 0.9,
      });
      gsap.set(".s3 .s3MainCardsContainer .lftSide .card1", {
        opacity: 0,
        x: -50,
      });
      gsap.set(".s3 .s3MainCardsContainer .rightSide", {
        opacity: 0,
        x: 50,
      });

      // Card container 1 animations
      ScrollTrigger.batch(".s3 .card-ct-1 .card1", {
        start: "top 70%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
            stagger: 0.2,
          }),
      });

      // Main cards container animations
      ScrollTrigger.create({
        trigger: ".s3 .s3MainCardsContainer",
        start: "top 60%",
        onEnter: () => {
          // Left side cards
          gsap.to(".s3 .s3MainCardsContainer .lftSide .card1", {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.3,
          });

          // Right side image
          gsap.to(".s3 .s3MainCardsContainer .rightSide", {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.4,
          });
        },
      });

      // Floating animation for circle elements
      gsap.to(".card1 .pngContainer", {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Background circle parallax effect
      gsap.to(".s3 .absoluteCircleDiv", {
        y: 50,
        scrollTrigger: {
          trigger: ".s3",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    } else {
      // Fallback if GSAP/ScrollTrigger not available
      document
        .querySelectorAll(".s3 .card1, .s3 .s3MainCardsContainer .rightSide")
        .forEach((el) => {
          el.style.opacity = 1;
          el.style.transform = "none";
        });
    }
  });
}
section3Animations();

function section4Animations() {
  // Section 4 Animations
  document.addEventListener("DOMContentLoaded", function () {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      // Set initial states
      gsap.set(".s4 .s4CarouselTapp", { opacity: 0, y: 50 });
      gsap.set(".s4 .iframeContainer", { opacity: 0, scale: 0.95 });

      // ScrollTrigger animations
      ScrollTrigger.batch(".s4 .s4CarouselTapp", {
        onEnter: () =>
          gsap.to(".s4 .s4CarouselTapp", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          }),
      });

      ScrollTrigger.batch(".s4 .iframeContainer", {
        onEnter: () =>
          gsap.to(".s4 .iframeContainer", {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
          }),
      });

      // Auto-sliding carousel
      const carousel = document.querySelector(".s4 .tapCardContainer");
      const cards = document.querySelectorAll(".s4 .s4Card");
      const cardWidth = cards[0].offsetWidth + 30; // card width + gap

      // Duplicate cards for seamless looping
      const originalCards = Array.from(cards).slice(0, 7); // Get original 7 cards
      originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        carousel.appendChild(clone);
      });

      // Animation timeline
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(carousel, {
        x: -cardWidth * 7, // Move by 7 cards (original set)
        duration: 35,
        ease: "none",
      });

      // Reset position when animation completes
      tl.eventCallback("onRepeat", () => {
        gsap.set(carousel, { x: 0 });
      });

      // Pause on hover
      carousel.parentElement.parentElement.addEventListener(
        "mouseenter",
        () => {
          tl.pause();
        }
      );

      carousel.parentElement.parentElement.addEventListener(
        "mouseleave",
        () => {
          tl.play();
        }
      );

      // Responsive cleanup
      window.addEventListener("resize", () => {
        tl.progress(0).kill();
        gsap.set(carousel, { x: 0 });

        const newCardWidth =
          cards[0].offsetWidth +
          parseInt(window.getComputedStyle(carousel).gap.replace("px", ""));

        tl.to(carousel, {
          x: -newCardWidth * 7,
          duration: 35,
          ease: "none",
          repeat: -1,
        });
      });
    } else {
      // Fallback if GSAP isn't available
      document
        .querySelectorAll(".s4 .s4CarouselTapp, .s4 .iframeContainer")
        .forEach((el) => {
          el.style.opacity = 1;
          el.style.transform = "none";
        });

      // Simple CSS animation fallback for carousel
      const style = document.createElement("style");
      style.textContent = `
      @keyframes carouselSlide {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(-147px * 7 - 30px * 6)); }
      }
      .s4 .tapCardContainer {
        animation: carouselSlide 30s linear infinite;
      }
    `;
      document.head.appendChild(style);
    }
  });
}
section4Animations();

function section5Animations() {
  document.addEventListener("DOMContentLoaded", function () {
    // Section 5 Carousel with GSAP
    if (typeof gsap !== "undefined") {
      const carousel = document.querySelector(".s5Carousel");
      const cards = document.querySelectorAll(".s5Card");
      const dots = document.querySelectorAll(".tracker-dot");
      let currentIndex = 0;
      const totalCards = cards.length;
      const intervalDuration = 3000; // 3 seconds

      // Initialize first card
      cards[0].classList.add("active");
      dots[0].classList.add("active");

      // GSAP animations for card transitions
      function animateToNextCard() {
        const currentCard = cards[currentIndex];
        const nextIndex = (currentIndex + 1) % totalCards;
        const nextCard = cards[nextIndex];

        // GSAP timeline for smooth transition
        const tl = gsap.timeline();

        tl.to(currentCard, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            currentCard.classList.remove("active");
          },
        }).fromTo(
          nextCard,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.inOut",
            onStart: () => {
              nextCard.classList.add("active");
            },
          },
          0
        );

        // Update tracker dots
        dots.forEach((dot, index) => {
          dot.classList.toggle("active", index === nextIndex);
        });

        currentIndex = nextIndex;
      }

      // Auto-slide functionality
      let autoSlideInterval = setInterval(animateToNextCard, intervalDuration);

      // Pause on hover
      carousel.addEventListener("mouseenter", () => {
        clearInterval(autoSlideInterval);
      });

      carousel.addEventListener("mouseleave", () => {
        autoSlideInterval = setInterval(animateToNextCard, intervalDuration);
      });

      // Click handler for tracker dots
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          if (index !== currentIndex) {
            clearInterval(autoSlideInterval);

            // Update tracker dots
            dots.forEach((d) => d.classList.remove("active"));
            dot.classList.add("active");

            // Animate to selected card
            const currentCard = cards[currentIndex];
            const selectedCard = cards[index];

            const tl = gsap.timeline();

            tl.to(currentCard, {
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut",
              onComplete: () => {
                currentCard.classList.remove("active");
              },
            }).fromTo(
              selectedCard,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.5,
                ease: "power2.inOut",
                onStart: () => {
                  selectedCard.classList.add("active");
                },
              },
              0
            );

            currentIndex = index;

            // Restart auto-slide
            autoSlideInterval = setInterval(
              animateToNextCard,
              intervalDuration
            );
          }
        });
      });

      // ScrollTrigger animation for section entrance
      if (typeof ScrollTrigger !== "undefined") {
        gsap.from(".s5-header", {
          scrollTrigger: {
            trigger: ".s5",
            start: "top 70%",
            toggleActions: "play none none none",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.from(".s5Carousel", {
          scrollTrigger: {
            trigger: ".s5",
            start: "top 60%",
            toggleActions: "play none none none",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
        });

        gsap.from(".cardTracker", {
          scrollTrigger: {
            trigger: ".s5",
            start: "top 50%",
            toggleActions: "play none none none",
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: 0.4,
          ease: "power2.out",
        });
      }
    }
  });
}
// section5Animations();

function section6Animations() {
  document.addEventListener("DOMContentLoaded", function () {
    if (typeof gsap !== "undefined") {
      const carousel = document.querySelector(".s6 .carousel-container");
      const cards = document.querySelectorAll(".s6 .card");
      const prevBtn = document.querySelector(".s6 .carousel-prev");
      const nextBtn = document.querySelector(".s6 .carousel-next");
      const cardWidth = 415; // Base card width
      const gap = 30; // Gap between cards
      let currentIndex = 0;
      let autoSlideInterval;

      // Set initial positions with 3D effect
      function positionCards() {
        const centerIndex = Math.floor(cards.length / 2);
        const perspective = 1000;

        cards.forEach((card, index) => {
          const distanceFromCenter = index - centerIndex;
          const zOffset = -Math.abs(distanceFromCenter) * 100;
          const rotationY = distanceFromCenter * 15;
          const xPos = distanceFromCenter * (cardWidth + gap);
          const scale = 1 - Math.abs(distanceFromCenter) * 0.1;
          const opacity = 1 - Math.abs(distanceFromCenter) * 0.3;

          gsap.set(card, {
            x: xPos,
            z: zOffset,
            rotationY: rotationY,
            scale: scale,
            opacity: opacity,
            transformOrigin: "center center",
            filter: `blur(${Math.abs(distanceFromCenter) * 0.5}px)`,
          });
        });
      }

      // Animate to specific index
      function goToIndex(index) {
        const centerIndex = Math.floor(cards.length / 2);
        const distanceFromCenter = index - centerIndex;

        gsap.to(carousel, {
          x: -distanceFromCenter * (cardWidth + gap),
          duration: 1,
          ease: "power3.out",
          onUpdate: () => {
            cards.forEach((card, i) => {
              const newDistance = i - index;
              const zOffset = -Math.abs(newDistance) * 100;
              const rotationY = newDistance * 15;
              const scale = 1 - Math.abs(newDistance) * 0.1;
              const opacity = 1 - Math.abs(newDistance) * 0.3;

              gsap.to(card, {
                z: zOffset,
                rotationY: rotationY,
                scale: scale,
                opacity: opacity,
                filter: `blur(${Math.abs(newDistance) * 0.5}px)`,
                duration: 1,
                ease: "power3.out",
              });
            });
          },
        });

        currentIndex = index;
      }

      // Auto-slide functionality
      function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
          const nextIndex = (currentIndex + 1) % cards.length;
          goToIndex(nextIndex);
        }, 3000);
      }

      // Initialize
      positionCards();
      startAutoSlide();

      // Navigation controls
      prevBtn.addEventListener("click", () => {
        clearInterval(autoSlideInterval);
        const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
        goToIndex(prevIndex);
        startAutoSlide();
      });

      nextBtn.addEventListener("click", () => {
        clearInterval(autoSlideInterval);
        const nextIndex = (currentIndex + 1) % cards.length;
        goToIndex(nextIndex);
        startAutoSlide();
      });

      // Pause on hover
      carousel.addEventListener("mouseenter", () => {
        clearInterval(autoSlideInterval);
      });

      carousel.addEventListener("mouseleave", () => {
        startAutoSlide();
      });

      // Responsive adjustments
      function handleResize() {
        const newCardWidth = cards[0].offsetWidth;
        const newGap = parseInt(
          window.getComputedStyle(carousel).gap.replace("px", "")
        );

        // Recalculate positions
        positionCards();
        goToIndex(currentIndex);
      }

      window.addEventListener("resize", handleResize);

      // ScrollTrigger animation for section entrance
      if (typeof ScrollTrigger !== "undefined") {
        gsap.from(".s6 .heading", {
          scrollTrigger: {
            trigger: ".s6",
            start: "top 70%",
            toggleActions: "play none none none",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.from(".s6 .silkyCarousel", {
          scrollTrigger: {
            trigger: ".s6",
            start: "top 60%",
            toggleActions: "play none none none",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
        });
      }
    }
  });
}
section6Animations();

function section7Animations() {
  // GSAP Carousel Implementation
  document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".blogCardContainer");
    const cards = document.querySelectorAll(".blogCard");
    const cardCount = cards.length;
    const cardWidth = cards[0].offsetWidth + 30; // width + margin

    // Set initial position
    gsap.set(carousel, { x: 0 });

    // Create dots for navigation
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "carousel-dots";
    for (let i = 0; i < cardCount; i++) {
      const dot = document.createElement("div");
      dot.className = "carousel-dot";
      if (i === 0) dot.classList.add("active");
      dot.dataset.index = i;
      dotsContainer.appendChild(dot);
    }
    carousel.parentNode.appendChild(dotsContainer);

    const dots = document.querySelectorAll(".carousel-dot");
    let currentIndex = 0;
    let autoSlideInterval;

    // Function to move carousel
    function moveCarousel(index, animate = true) {
      currentIndex = index;
      const newX = -index * cardWidth;

      if (animate) {
        gsap.to(carousel, {
          x: newX,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.set(carousel, { x: newX });
      }

      // Update active dot
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    // Auto slide function
    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % cardCount;
        moveCarousel(nextIndex);
      }, 3000);
    }

    // Start auto slide
    startAutoSlide();

    // Pause on hover
    carousel.addEventListener("mouseenter", () => {
      clearInterval(autoSlideInterval);
    });

    carousel.addEventListener("mouseleave", startAutoSlide);

    // Dot navigation
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = parseInt(dot.dataset.index);
        if (index !== currentIndex) {
          clearInterval(autoSlideInterval);
          moveCarousel(index);
          startAutoSlide();
        }
      });
    });

    // Responsive adjustments
    function handleResize() {
      cardWidth = cards[0].offsetWidth + 30;
      moveCarousel(currentIndex, false);
    }

    window.addEventListener("resize", handleResize);
  });
}
section7Animations();

function section9Animations() {
  // GSAP ScrollTrigger Animation Implementation
  document.addEventListener("DOMContentLoaded", function () {
    // Only run if GSAP and ScrollTrigger are loaded
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Animation for the testimonial section
      const testimonialSection = document.querySelector(".s9");
      const leftSide = document.querySelector(".s9 .leftSide");
      const centerDiv = document.querySelector(".s9 .centerDiv");
      const rightSide = document.querySelectorAll(".s9 .leftSide")[1];

      // Set initial state for animation
      gsap.set([leftSide, rightSide], { autoAlpha: 0, x: -50 });
      gsap.set(centerDiv, { autoAlpha: 0, y: 50 });

      // Create timeline for section animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: testimonialSection,
          start: "top 70%",
          end: "bottom bottom",
          toggleActions: "play none none none",
          markers: false, // Set to true for debugging
        },
      });

      tl.to(leftSide, { autoAlpha: 1, x: 0, duration: 0.8, ease: "power2.out" })
        .to(
          rightSide,
          { autoAlpha: 1, x: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        )
        .to(
          centerDiv,
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );

      // Animation for individual elements
      const images = document.querySelectorAll(".s9 .leftSide > div");
      images.forEach((img, i) => {
        gsap.from(img, {
          scale: 0.5,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.1 + 0.5,
          scrollTrigger: {
            trigger: img,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });

      // Make slide tracker interactive
      const dots = document.querySelectorAll(".slideTracker p");
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          // Remove active class from all dots
          dots.forEach((d) => d.classList.remove("active"));
          // Add active class to clicked dot
          dot.classList.add("active");

          // Here you would typically change the testimonial content
          // For now we'll just animate the dot click
          gsap.fromTo(
            dot,
            { scale: 0.8 },
            { scale: 1.2, duration: 0.3, ease: "back.out" }
          );
        });
      });

      // Activate first dot by default
      if (dots.length > 0) {
        dots[0].classList.add("active");
      }
    } else {
      console.warn("GSAP or ScrollTrigger not loaded - animations disabled");
    }
  });
}
section9Animations();

function section9Slider() {
  // GSAP Animation and Slider Functionality
  document.addEventListener("DOMContentLoaded", function () {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animate the section when it comes into view
    gsap.from(".s9", {
      scrollTrigger: {
        trigger: ".s9",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
    });

    // Animate the side images
    gsap.from(".leftSide div", {
      scrollTrigger: {
        trigger: ".s9",
        start: "top 70%",
        toggleActions: "play none none none",
      },
      x: -50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out",
    });

    gsap.from(".rightSide div", {
      scrollTrigger: {
        trigger: ".s9",
        start: "top 70%",
        toggleActions: "play none none none",
      },
      x: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out",
    });

    // Testimonial slider functionality
    const testimonials = document.querySelectorAll(".testimonial");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;
    let interval;

    function showTestimonial(index) {
      // Reset all testimonials and dots
      testimonials.forEach((testimonial) =>
        testimonial.classList.remove("active")
      );
      dots.forEach((dot) => dot.classList.remove("active"));

      // Show the selected testimonial and dot
      testimonials[index].classList.add("active");
      dots[index].classList.add("active");

      // Animate the testimonial
      gsap.from(testimonials[index], {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    function nextTestimonial() {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    }

    // Start auto-sliding
    function startSlider() {
      interval = setInterval(nextTestimonial, 3000);
    }

    // Pause auto-sliding when hovering
    const sliderContainer = document.querySelector(".testimonial-slider");
    sliderContainer.addEventListener("mouseenter", () =>
      clearInterval(interval)
    );
    sliderContainer.addEventListener("mouseleave", startSlider);

    // Dot click navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index;
        showTestimonial(currentIndex);
        // Reset the interval
        clearInterval(interval);
        startSlider();
      });
    });

    // Initialize the slider
    showTestimonial(0);
    startSlider();
  });
}
section9Slider();

function footerSectionAnimations() {
  document.addEventListener("DOMContentLoaded", function () {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Footer entrance animation
    gsap.from("footer", {
      scrollTrigger: {
        trigger: "footer",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    });

    // Contact info animation
    gsap.from(".footer-contact", {
      scrollTrigger: {
        trigger: ".footer-contact",
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      x: -30,
      duration: 0.6,
      delay: 0.2,
      ease: "back.out(1.7)",
    });

    // Form animation
    gsap.from(".footer-form", {
      scrollTrigger: {
        trigger: ".footer-form",
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      x: 30,
      duration: 0.6,
      delay: 0.4,
      ease: "back.out(1.7)",
    });

    // Input fields animation
    gsap.from(".contact-form input, .contact-form textarea", {
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 90%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.1,
      delay: 0.6,
    });

    // Button animation
    gsap.from(".submit-btn", {
      scrollTrigger: {
        trigger: ".submit-btn",
        start: "top 90%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  });
}
footerSectionAnimations();
