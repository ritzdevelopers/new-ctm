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
  const heroSection = document.querySelector(".s1");
  if (!heroSection) return;

  // Check if GSAP is loaded
  if (typeof gsap !== "undefined") {
    // Initialize ScrollTrigger plugin if available
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.defaults({
        markers: false, // Set to true for debugging
      });
    }

    // Set initial state (hidden)
    gsap.set(".s1 .txt-div h1", { opacity: 0, y: 50 });
    gsap.set(".s1 .txt-div p", { opacity: 0, y: 50 });
    gsap.set(".s1 .txt-div button", { opacity: 0, y: 50 });

    // Create animation timeline
    const heroTl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.3, // Small delay to ensure everything's ready
    });

    // Animate elements in sequence
    heroTl
      .to(".s1 .txt-div h1", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.2)",
      })
      .to(
        ".s1 .txt-div p",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.4" // Overlap with previous animation
      )
      .to(
        ".s1 .txt-div button",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
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
          toggleActions: "play none none none",
        },
      });
    }
  } else {
    // Fallback if GSAP isn't loaded
    document
      .querySelectorAll(".s1 .txt-div h1, .s1 .txt-div p, .s1 .txt-div button")
      .forEach((el) => {
        el.style.opacity = 1;
        el.style.transform = "none";
      });
  }
}

// Call the function when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
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
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.s5Card');
  const dots = document.querySelectorAll('.tracker-dot');
  let currentIndex = 0;

  // Show initial card
  showCard(currentIndex);

  // Set up click handlers for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showCard(index);
    });
  });

  // Auto-rotate cards (optional)
  setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    showCard(currentIndex);
  }, 5000);

  function showCard(index) {
    // Hide all cards
    cards.forEach(card => {
      card.classList.remove('active');
      card.style.opacity = '0';
      card.style.position = 'absolute';
    });
    
    // Deactivate all dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show selected card
    cards[index].classList.add('active');
    cards[index].style.opacity = '1';
    cards[index].style.position = 'relative';
    
    // Activate corresponding dot
    dots[index].classList.add('active');
    
    currentIndex = index;
  }
});
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


function initBlogCarousel() {
  document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector('.blog-carousel');
    const container = carousel?.querySelector('.blog-card-container');
    const cards = container?.querySelectorAll('.blog-card');
    const dotsContainer = carousel?.querySelector('.carousel-dots');
    const prevBtn = carousel?.querySelector('.carousel-prev');
    const nextBtn = carousel?.querySelector('.carousel-next');
    
    if (!carousel || !container || !cards || cards.length === 0) return;
    
    let currentIndex = 0;
    let autoSlideInterval;
    let isDragging = false;
    let startPosX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationId;
    let cardsPerView;
    
    // Initialize carousel
    function initCarousel() {
      updateCardsPerView();
      createDots();
      updateCarousel();
      startAutoSlide();
      setupEventListeners();
    }
    
    function updateCardsPerView() {
      const width = window.innerWidth;
      if (width >= 1024) {
        cardsPerView = 3;
      } else if (width >= 640) {
        cardsPerView = 2;
      } else {
        cardsPerView = 1;
      }
    }
    
    function createDots() {
      if (!dotsContainer) return;
      
      dotsContainer.innerHTML = '';
      const totalSlides = Math.ceil(cards.length / cardsPerView);
      
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (i === currentIndex) dot.classList.add('active');
        dot.dataset.index = i;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }
    
    function updateCarousel(animate = true) {
      const cardWidth = container.offsetWidth / cardsPerView;
      const newTranslate = -currentIndex * cardWidth * cardsPerView;
      
      if (animate) {
        gsap.to(container, {
          x: newTranslate,
          duration: 0.5,
          ease: "power2.out"
        });
      } else {
        gsap.set(container, { x: newTranslate });
      }
      
      // Update active dot
      document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
      
      // Update button states
      const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
      prevBtn?.toggleAttribute('disabled', currentIndex === 0);
      nextBtn?.toggleAttribute('disabled', currentIndex >= maxIndex);
    }
    
    function goToSlide(index) {
      const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      updateCarousel();
      resetAutoSlide();
    }
    
    function goToPrev() {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
        resetAutoSlide();
      }
    }
    
    function goToNext() {
      const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
        resetAutoSlide();
      }
    }
    
    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
        if (currentIndex >= maxIndex) {
          currentIndex = 0;
        } else {
          currentIndex++;
        }
        updateCarousel();
      }, 5000);
    }
    
    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }
    
    // Touch/Mouse events
    function touchStart(e) {
      isDragging = true;
      startPosX = getPositionX(e);
      prevTranslate = currentTranslate;
      cancelAnimationFrame(animationId);
      container.style.cursor = 'grabbing';
      clearInterval(autoSlideInterval);
    }
    
    function touchMove(e) {
      if (!isDragging) return;
      const currentPosX = getPositionX(e);
      currentTranslate = prevTranslate + currentPosX - startPosX;
      animationId = requestAnimationFrame(() => {
        gsap.set(container, { x: currentTranslate });
      });
    }
    
    function touchEnd() {
      if (!isDragging) return;
      isDragging = false;
      cancelAnimationFrame(animationId);
      container.style.cursor = '';
      
      const cardWidth = container.offsetWidth / cardsPerView;
      const movedBy = currentTranslate - prevTranslate;
      
      if (movedBy < -cardWidth * 0.25) {
        goToNext();
      } else if (movedBy > cardWidth * 0.25) {
        goToPrev();
      } else {
        updateCarousel();
      }
      
      resetAutoSlide();
    }
    
    function getPositionX(e) {
      return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    }
    
    function setupEventListeners() {
      // Navigation buttons
      prevBtn?.addEventListener('click', goToPrev);
      nextBtn?.addEventListener('click', goToNext);
      
      // Drag events
      container.addEventListener('mousedown', touchStart);
      container.addEventListener('touchstart', touchStart, { passive: true });
      window.addEventListener('mouseup', touchEnd);
      window.addEventListener('touchend', touchEnd);
      window.addEventListener('mousemove', touchMove);
      window.addEventListener('touchmove', touchMove, { passive: false });
      
      // Window resize
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          updateCardsPerView();
          createDots();
          updateCarousel(false);
        }, 100);
      });
    }
    
    // Initialize carousel
    initCarousel();
  });
}

initBlogCarousel();


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
      const rightSide = document.querySelector(".s9 .rightSide") || document.querySelectorAll(".s9 .leftSide")[1];

      // Set initial state for animation
      if (leftSide) gsap.set(leftSide, { autoAlpha: 0, x: -50 });
      if (rightSide) gsap.set(rightSide, { autoAlpha: 0, x: 50 });
      if (centerDiv) gsap.set(centerDiv, { autoAlpha: 0, y: 50 });

      // Create timeline for section animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: testimonialSection,
          start: "top 70%",
          end: "bottom bottom",
          toggleActions: "play none none none",
          markers: false,
        },
      });

      if (leftSide) tl.to(leftSide, { autoAlpha: 1, x: 0, duration: 0.8, ease: "power2.out" });
      if (rightSide) tl.to(rightSide, { autoAlpha: 1, x: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");
      if (centerDiv) tl.to(centerDiv, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");

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
      const dots = document.querySelectorAll(".slideTracker .dot");
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          // Remove active class from all dots
          dots.forEach((d) => d.classList.remove("active"));
          // Add active class to clicked dot
          dot.classList.add("active");

          // Animate the dot click
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
  document.addEventListener("DOMContentLoaded", function () {
    // GSAP Animation and Slider Functionality
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Animation for section entrance
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

      // Testimonial slider functionality
      const testimonials = document.querySelectorAll(".testimonial");
      const dots = document.querySelectorAll(".dot");
      let currentIndex = 0;
      let interval;
      let isHovering = false;

      function showTestimonial(index) {
        // Ensure index is within bounds
        if (index < 0) index = testimonials.length - 1;
        if (index >= testimonials.length) index = 0;
        
        currentIndex = index;

        // Hide all testimonials
        testimonials.forEach(testimonial => {
          testimonial.classList.remove("active");
          gsap.set(testimonial, { opacity: 0, visibility: "hidden" });
        });

        // Show the selected testimonial
        testimonials[currentIndex].classList.add("active");
        gsap.to(testimonials[currentIndex], {
          opacity: 1,
          visibility: "visible",
          duration: 0.8,
          ease: "power2.out"
        });

        // Update dots
        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentIndex].classList.add("active");
      }

      function nextTestimonial() {
        if (!isHovering) {
          showTestimonial(currentIndex + 1);
        }
      }

      // Start auto-sliding
      function startSlider() {
        clearInterval(interval);
        interval = setInterval(nextTestimonial, 5000); // Increased to 5 seconds for better UX
      }

      // Pause auto-sliding when hovering
      const sliderContainer = document.querySelector(".testimonial-slider");
      if (sliderContainer) {
        sliderContainer.addEventListener("mouseenter", () => {
          isHovering = true;
          clearInterval(interval);
        });
        
        sliderContainer.addEventListener("mouseleave", () => {
          isHovering = false;
          startSlider();
        });
      }

      // Dot click navigation
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showTestimonial(index);
          startSlider();
        });
      });

      // Initialize the slider
      if (testimonials.length > 0) {
        showTestimonial(0);
        startSlider();
      }

      // Handle window resize
      let resizeTimeout;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
          showTestimonial(currentIndex);
        }, 100);
      });
    }
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

document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  const carouselTrack = document.querySelector(".infinite-carousel-track");
  const cards = document.querySelectorAll(".portfolio-card");
  const cardCount = cards.length;

  // Calculate angle between each card
  const angleIncrement = 360 / cardCount;
  let currentRotation = 0;

  // Position cards in a circle
  function positionCards() {
    const radius =
      window.innerWidth > 1200
        ? 600
        : window.innerWidth > 992
        ? 500
        : window.innerWidth > 768
        ? 400
        : 350;

    cards.forEach((card, index) => {
      const angle = index * angleIncrement;
      gsap.set(card, {
        rotationY: angle,
        z: radius,
        transformOrigin: `center center -${radius}px`,
      });
    });
  }

  // Animate carousel rotation
  function animateCarousel() {
    gsap.to(carouselTrack, {
      rotationY: "-=360",
      duration: 30,
      ease: "none",
      repeat: -1,
      onUpdate: function () {
        currentRotation = this.targets()[0]._gsap.rotationY;
        updateCardScales();
      },
    });
  }

  // Update card scales based on position
  function updateCardScales() {
    cards.forEach((card) => {
      const cardAngle =
        (parseFloat(card._gsap.rotationY) + currentRotation) % 360;
      const distanceFromCenter = Math.abs(180 - Math.abs(cardAngle - 180));
      const scale = 1 - (distanceFromCenter / 180) * 0.5;

      gsap.to(card, {
        // scale: scale,
        // opacity: 1 - (distanceFromCenter / 180) * 0.7,
        duration: 0.5,
      });
    });
  }

  // Pause animation on hover
  carouselTrack.addEventListener("mouseenter", () => {
    gsap.to(carouselTrack, { timeScale: 0.3 });
  });

  carouselTrack.addEventListener("mouseleave", () => {
    gsap.to(carouselTrack, { timeScale: 1 });
  });

  // Initialize
  positionCards();
  animateCarousel();
  updateCardScales();

  // Handle window resize
  window.addEventListener("resize", () => {
    positionCards();
    updateCardScales();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".swiper-slider");
  const cards = document.querySelectorAll(".card");

  // Clone cards for infinite loop
  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    slider.appendChild(clone);
  });

  // Calculate total width needed for animation
  function calculateTotalWidth() {
    const firstCard = cards[0];
    const cardWidth = firstCard.offsetWidth;
    const gap = 20; // Your gap value
    return cards.length * (cardWidth + gap) * 2; // Double for clones
  }

  // GSAP animation
  let animation;

  function setupAnimation() {
    const totalWidth = calculateTotalWidth();

    // Kill existing animation if it exists
    if (animation) animation.kill();

    // Set initial position
    gsap.set(slider, { x: 0 });

    // Create animation
    animation = gsap.to(slider, {
      x: -totalWidth / 2,
      duration: 80,
      ease: "none",
      repeat: -1,
      onRepeat: function () {
        // Reset position for seamless looping
        gsap.set(slider, { x: 0 });
        this.restart();
      },
    });
  }

  // Initialize animation
  setupAnimation();

  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      setupAnimation();
    }, 250);
  });
});
