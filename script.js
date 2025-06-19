// ===== ENHANCED MODERN PORTFOLIO JS =====

// Preloader with enhanced animation
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    // Add fade out animation
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 0.5s ease-out";
      setTimeout(() => {
        preloader.style.display = "none";
        // Initialize continuous animations after preloader
        initContinuousAnimations();
      }, 500);
    }, 1200);
  }
});

// Hamburger menu
document.addEventListener("DOMContentLoaded", () => {
  // Hamburger
  const hamburger = document.querySelector(".hamburger");
  const menu = document.getElementById("nav-menu");
  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }
  // Close menu on link click (mobile)
  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Smooth scroll
  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section)
          section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Enhanced Tech-like Particle background
  if (window.tsParticles) {
    tsParticles.load("particle-background", {
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        color: {
          value: ["#ffd700", "#00d4ff", "#ffffff"],
          animation: {
            enable: true,
            speed: 20,
            sync: false,
          },
        },
        links: {
          enable: true,
          color: "#ffd700",
          opacity: 0.15,
          width: 1.5,
          distance: 150,
          triangles: {
            enable: true,
            opacity: 0.02,
          },
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: "none",
          outModes: { default: "bounce" },
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200,
          },
        },
        number: { value: 60, density: { enable: true, area: 1000 } },
        opacity: {
          value: { min: 0.1, max: 0.4 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
            sync: false,
          },
        },
        shape: {
          type: ["circle", "triangle", "polygon"],
          polygon: { sides: 6 },
        },
        size: {
          value: { min: 1, max: 4 },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.5,
            sync: false,
          },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: ["repulse", "connect"] },
          onClick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          repulse: { distance: 100, duration: 0.4, factor: 100 },
          connect: { distance: 80, links: { opacity: 0.5 } },
          push: { quantity: 6 },
        },
      },
      detectRetina: true,
    });
  }

  // Enhanced GSAP Animations with proper visibility
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Set initial visibility to ensure content is always visible
    gsap.set("section, .service-card, .project-card", { opacity: 1 });

    // Hero animations
    gsap.from(".hero-section .left-content", {
      opacity: 0.3,
      x: -40,
      duration: 1,
      delay: 0.2,
      ease: "power2.out",
    });
    gsap.from(".hero-section .right-content", {
      opacity: 0.3,
      x: 40,
      duration: 1,
      delay: 0.4,
      ease: "power2.out",
    });

    // Section animations with proper fallback
    gsap.utils.toArray("section:not(.hero-section)").forEach((sec, i) => {
      gsap.fromTo(
        sec,
        { opacity: 0.5, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play none none reverse",
            onEnter: () => gsap.set(sec, { opacity: 1 }),
            onLeave: () => gsap.set(sec, { opacity: 1 }),
          },
        }
      );
    });

    // Service cards with stagger and visibility fallback
    gsap.utils.toArray(".service-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0.3, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: i * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            onEnter: () => gsap.set(card, { opacity: 1 }),
            onLeave: () => gsap.set(card, { opacity: 1 }),
          },
        }
      );
    });

    // Project cards with enhanced animations
    gsap.utils.toArray(".project-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0.3, y: 30, rotationY: 15 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            onEnter: () => gsap.set(card, { opacity: 1 }),
            onLeave: () => gsap.set(card, { opacity: 1 }),
          },
        }
      );
    });

    // Timeline items animation
    gsap.utils.toArray(".timeline-item").forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0.3, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: i * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            onEnter: () => gsap.set(item, { opacity: 1 }),
          },
        }
      );
    });
  } else {
    // Fallback: ensure all elements are visible if GSAP fails
    document
      .querySelectorAll("section, .service-card, .project-card, .timeline-item")
      .forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
  }

  // Testimonials carousel
  const testimonials = document.querySelectorAll(".testimonial");
  let current = 0;
  function showTestimonial(idx) {
    testimonials.forEach((t, i) => t.classList.toggle("active", i === idx));
  }
  showTestimonial(current);
  document.querySelector(".next-testimonial")?.addEventListener("click", () => {
    current = (current + 1) % testimonials.length;
    showTestimonial(current);
  });
  document.querySelector(".prev-testimonial")?.addEventListener("click", () => {
    current = (current - 1 + testimonials.length) % testimonials.length;
    showTestimonial(current);
  });
  setInterval(() => {
    current = (current + 1) % testimonials.length;
    showTestimonial(current);
  }, 6000);

  // Contact form (Formspree)
  const form = document.getElementById("portfolioContactForm");
  const status = document.getElementById("form-status");
  if (form && status) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      status.textContent = "Sending...";
      try {
        const data = new FormData(form);
        const res = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          status.textContent = "Message sent! Thank you.";
          form.reset();
        } else {
          status.textContent = "Oops! Something went wrong.";
        }
      } catch {
        status.textContent = "Network error. Try again.";
      }
      setTimeout(() => (status.textContent = ""), 4000);
    });
  }

  // Chat widget
  const chatWidget = document.querySelector(".chat-widget");
  const chatToggle = document.querySelector(".chat-toggle");
  const chatContainer = document.querySelector(".chat-container");
  const closeChat = document.querySelector(".close-chat");
  if (chatWidget && chatToggle && chatContainer) {
    chatToggle.addEventListener("click", () =>
      chatWidget.classList.toggle("active")
    );
    closeChat?.addEventListener("click", () =>
      chatWidget.classList.remove("active")
    );
  }
});

// WhatsApp Hire Me button
function openWhatsApp() {
  const url =
    "https://wa.me/2348101595840?text=Hi%20Sanni!%20I%20am%20interested%20in%20working%20with%20you.";
  window.open(url, "_blank");
}

// ===== ENHANCED CONTINUOUS ANIMATIONS =====

// Initialize continuous animations that persist without page reload
function initContinuousAnimations() {
  // Floating animation for hero image
  const heroImage = document.querySelector(".right-content img");
  if (heroImage) {
    let floatDirection = 1;
    let floatPosition = 0;

    setInterval(() => {
      floatPosition += floatDirection * 0.5;
      if (floatPosition > 20 || floatPosition < -20) {
        floatDirection *= -1;
      }
      heroImage.style.transform = `translateY(${floatPosition}px)`;
    }, 50);
  }

  // Glowing effect for service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card, index) => {
    let glowIntensity = 0;
    let glowDirection = 1;

    setInterval(() => {
      glowIntensity += glowDirection * 2;
      if (glowIntensity > 100 || glowIntensity < 0) {
        glowDirection *= -1;
      }

      const opacity = 0.1 + glowIntensity / 1000;
      card.style.boxShadow = `0 0 20px rgba(255, 215, 0, ${opacity})`;
    }, 100 + index * 50); // Stagger the animation
  });

  // Bouncing tech stack icons
  const techIcons = document.querySelectorAll(".stack-icons i");
  techIcons.forEach((icon, index) => {
    let bouncePosition = 0;
    let bounceDirection = 1;

    setInterval(() => {
      bouncePosition += bounceDirection * 0.3;
      if (bouncePosition > 10 || bouncePosition < -10) {
        bounceDirection *= -1;
      }
      icon.style.transform = `translateY(${bouncePosition}px)`;
    }, 80 + index * 100); // Different timing for each icon
  });

  // Pulsing timeline dots
  const timelineDots = document.querySelectorAll(".timeline-dot");
  timelineDots.forEach((dot, index) => {
    let scale = 1;
    let scaleDirection = 1;

    setInterval(() => {
      scale += scaleDirection * 0.02;
      if (scale > 1.3 || scale < 0.8) {
        scaleDirection *= -1;
      }
      dot.style.transform = `scale(${scale})`;
    }, 150 + index * 200);
  });

  // Animated background gradient shift
  const body = document.body;
  let hueShift = 0;

  setInterval(() => {
    hueShift += 0.5;
    if (hueShift > 360) hueShift = 0;

    body.style.background = `linear-gradient(135deg, 
      hsl(${hueShift}, 10%, 4%) 0%, 
      hsl(${hueShift + 30}, 15%, 7%) 50%, 
      hsl(${hueShift + 60}, 20%, 10%) 100%)`;
  }, 200);
}

// Enhanced scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");

        // Add special effects for different elements
        if (entry.target.classList.contains("service-card")) {
          setTimeout(() => {
            entry.target.style.transform = "translateY(0) scale(1)";
            entry.target.style.opacity = "1";
          }, Math.random() * 200);
        }

        if (entry.target.classList.contains("project-card")) {
          setTimeout(() => {
            entry.target.style.transform = "translateY(0) rotateY(0)";
            entry.target.style.opacity = "1";
          }, Math.random() * 300);
        }
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  document
    .querySelectorAll(
      ".service-card, .project-card, .timeline-item, .testimonial"
    )
    .forEach((el) => {
      el.classList.add("animate-on-scroll");
      observer.observe(el);
    });
}

// Enhanced particle effects for interactions
function enhanceParticleEffects() {
  if (window.tsParticles && window.tsParticles.domItem) {
    const container = window.tsParticles.domItem(0);

    // Add mouse move effect
    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      if (container && container.particles) {
        // Create ripple effect near cursor
        container.particles.array.forEach((particle) => {
          const dx = particle.position.x - (x * window.innerWidth) / 100;
          const dy = particle.position.y - (y * window.innerHeight) / 100;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            particle.velocity.x += (dx / distance) * 0.5;
            particle.velocity.y += (dy / distance) * 0.5;
          }
        });
      }
    });

    // Add click burst effect
    document.addEventListener("click", (e) => {
      if (container && container.particles) {
        // Add particles at click position
        for (let i = 0; i < 5; i++) {
          container.particles.addParticle({
            x: e.clientX,
            y: e.clientY,
            options: {
              life: { duration: { value: 1000 } },
              move: {
                speed: { value: 5 },
                direction: { value: Math.random() * 360 },
              },
              size: { value: { min: 2, max: 6 } },
              opacity: { value: 0.8 },
            },
          });
        }
      }
    });
  }
}

// Mobile-specific enhancements
function initMobileEnhancements() {
  if (window.innerWidth <= 768) {
    // Reduce animation intensity on mobile for better performance
    const style = document.createElement("style");
    style.textContent = `
      @media (max-width: 768px) {
        .service-card, .project-card {
          animation-duration: 0.6s !important;
        }
        .stack-icons i {
          animation-duration: 1.5s !important;
        }
        .right-content img {
          animation-duration: 4s !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Touch interactions for mobile
    document.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);

      if (
        element &&
        (element.classList.contains("service-card") ||
          element.classList.contains("project-card"))
      ) {
        element.style.transform = "scale(0.95)";
        element.style.transition = "transform 0.1s ease";

        setTimeout(() => {
          element.style.transform = "scale(1)";
        }, 100);
      }
    });
  }
}

// Initialize all enhanced features when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Wait a bit for other animations to settle
  setTimeout(() => {
    initScrollAnimations();
    enhanceParticleEffects();
    initMobileEnhancements();
  }, 1500);
});
