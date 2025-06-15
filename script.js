document.addEventListener("DOMContentLoaded", function () {
  ("use strict");

  // --- GSAP ANIMATIONS ---
  function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Intro Animation
    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTimeline
      .from(".greeting", { y: 30, opacity: 0, duration: 0.8, delay: 0.5 })
      .from(".name", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".description", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".btn-group", { y: 20, opacity: 0, duration: 1 }, "-=0.6")
      .from(".right-content", { x: 100, opacity: 0, duration: 1.2 }, "-=1.2")
      .from(
        ".hero-social a",
        { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
        "-=0.8"
      );

    // General Scroll-Triggered Animations for Sections
    const sections = document.querySelectorAll("section, footer");
    sections.forEach((section) => {
      const heading = section.querySelector("h2");
      if (heading) {
        gsap.from(heading, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
        });
      }
      const items = section.querySelectorAll(
        ".service-card, .project-card, .timeline-item, .stack-icons i, .about-content, .contact-container > div"
      );
      if (items.length > 0) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
        });
      }
    });
  }

  // --- HAMBURGER MENU ---
  function initHamburgerMenu() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.classList.toggle("active");
      navMenu.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isExpanded);
    });
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("open")) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("open");
          hamburger.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // --- TESTIMONIAL CAROUSEL ---
  function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll(".testimonial");
    const prevBtn = document.querySelector(".prev-testimonial");
    const nextBtn = document.querySelector(".next-testimonial");
    if (testimonials.length === 0) return;

    let currentTestimonial = 0;
    function showTestimonial(index) {
      testimonials.forEach((el, i) => {
        el.classList.toggle("active", i === index);
      });
    }
    showTestimonial(currentTestimonial);

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        currentTestimonial =
          (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
      });
      nextBtn.addEventListener("click", () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
      });
    }
  }

  // --- CHAT WIDGET ---
  function initChatWidget() {
    const chatToggle = document.querySelector(".chat-toggle");
    const chatContainer = document.querySelector(".chat-container");
    const closeChat = document.querySelector(".close-chat");
    const contactLink = document.querySelector(".chat-contact-btn");
    if (!chatToggle || !chatContainer) return;

    chatToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      chatContainer.classList.toggle("active");
    });
    closeChat.addEventListener("click", () =>
      chatContainer.classList.remove("active")
    );
    contactLink.addEventListener("click", () =>
      chatContainer.classList.remove("active")
    );

    document.addEventListener("click", (e) => {
      if (!chatContainer.contains(e.target) && !chatToggle.contains(e.target)) {
        chatContainer.classList.remove("active");
      }
    });
  }

  // --- PARTICLE BACKGROUND ---
  function initParticleBg() {
    if (typeof tsParticles === "undefined") return;
    tsParticles.load({
      id: "particle-background",
      options: {
        /* ... particle options from previous step ... */
      },
    });
  }

  // --- HIRE ME BUTTON (Global Scope) ---
  window.redirectToEmail = function () {
    const emailAddress = "contact@inucodeworks.com";
    const subject = "Project Inquiry from your Portfolio";
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}`;
  };

  // **** NEW FUNCTION TO HANDLE THE CONTACT FORM ****
  function initContactForm() {
    const form = document.getElementById("portfolioContactForm");
    const statusDiv = document.getElementById("form-status");

    if (!form) return;

    async function handleSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);

      statusDiv.style.display = "block";
      statusDiv.style.color = "#ccc";
      statusDiv.innerHTML = "Sending...";

      try {
        const response = await fetch(event.target.action, {
          method: form.method,
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          statusDiv.style.color = "#28a745"; // Green for success
          statusDiv.innerHTML =
            "Thanks for your message! I'll get back to you soon.";
          form.reset();
        } else {
          // Handle server-side errors from Formspree
          const data = await response.json();
          statusDiv.style.color = "#dc3545"; // Red for error
          if (Object.hasOwn(data, "errors")) {
            statusDiv.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            statusDiv.innerHTML =
              "Oops! There was a problem submitting your form.";
          }
        }
      } catch (error) {
        // Handle network errors
        statusDiv.style.color = "#dc3545";
        statusDiv.innerHTML =
          "Oops! There was a network error. Please try again.";
      }
    }

    form.addEventListener("submit", handleSubmit);
  }

  // --- HIRE ME / CONTACT BUTTON (Global Scope) ---
  window.openWhatsApp = function () {
    // 1. Your phone number in full international format (without '+', '00', or spaces).
    const phoneNumber = "2348101595840";

    // 2. The pre-filled message you want users to send.
    const message =
      "Hello! I saw your portfolio and I'm interested in discussing a project.";

    // 3. Encode the message for the URL.
    const encodedMessage = encodeURIComponent(message);

    // 4. Create the final WhatsApp URL.
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // 5. Open the URL in a new tab.
    window.open(whatsappURL, "_blank");
  };

  // --- INITIALIZE ALL MODULES ---
  initAnimations();
  initHamburgerMenu();
  initTestimonialCarousel();
  initChatWidget();
  initParticleBg();
  initContactForm(); // <-- Add this call
});
