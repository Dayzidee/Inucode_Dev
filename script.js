"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Add loading class to body during preloader
  document.body.classList.add('loading');
  
  // --- PRELOADER ---
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) {
      document.body.classList.remove('loading');
      return;
    }

    // Hide preloader after 3.5 seconds
    setTimeout(() => {
      preloader.classList.add('fade-out');
      document.body.classList.remove('loading');
      // Remove from DOM after fade out animation
      setTimeout(() => {
        preloader.remove();
      }, 800);
    }, 3500);
  }

  // --- SCROLL PROGRESS INDICATOR ---
  function initScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    if (!scrollProgress) return;

    function updateScrollProgress() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min((scrollTop / scrollHeight) * 100, 100);
      
      scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
      scrollProgress.style.width = '100%';
    }

    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('resize', updateScrollProgress);
    updateScrollProgress(); // Initial call
  }

  // --- ENHANCED NAVBAR EFFECTS ---
  function initNavbarEffects() {
    const navbar = document.querySelector('.sticky-nav');
    if (!navbar) return;

    let ticking = false;
    
    function updateNavbar() {
      if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.98)';
      } else {
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    });
  }

  // --- GSAP ANIMATIONS ---
  function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Wait for preloader to finish before starting hero animations
    setTimeout(() => {
      // Hero Section Intro Animation
      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTimeline
        .from(".greeting", { y: 30, opacity: 0, duration: 0.8, delay: 0.2 })
        .from(".description", { y: 20, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(".btn-group", { y: 20, opacity: 0, duration: 1 }, "-=0.6")
        .from(".right-content", { x: 100, opacity: 0, duration: 1.2 }, "-=1.2")
        .from(
          ".hero-social a",
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
          "-=0.8"
        );
    }, 4000);

    // Typewriter effect for name
    setTimeout(() => {
      const nameElement = document.querySelector(".animated-name");
      if (nameElement) {
        nameElement.style.width = "100%";
        // Remove blinking cursor after animation completes
        setTimeout(() => {
          nameElement.classList.add("finished");
        }, 4000);
      }
    }, 1000);

    // Enhanced Section Animations with Different Types
    const sections = document.querySelectorAll("section, footer");
    sections.forEach((section, sectionIndex) => {
      const heading = section.querySelector("h2");
      if (heading) {
        // Add dropdown animation class to headings
        heading.classList.add('dropdown-animation');
        
        // Ensure heading is visible by default
        heading.style.opacity = '1';
        heading.style.visibility = 'visible';
        
        gsap.fromTo(heading, 
          {
            opacity: 0,
            y: -30,
            rotationX: -10,
            scale: 0.98
          },
          {
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
              refreshPriority: 1,
              onEnter: () => {
                heading.classList.add('visible');
                heading.style.opacity = '1';
              },
              onLeave: () => {
                heading.classList.remove('visible');
              },
              onEnterBack: () => {
                heading.classList.add('visible');
                heading.style.opacity = '1';
              },
              onLeaveBack: () => {
                heading.classList.remove('visible');
              }
            },
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          }
        );
      }
      
      // Service Cards - Bounce animation
      const serviceCards = section.querySelectorAll(".service-card");
      if (serviceCards.length > 0) {
        serviceCards.forEach((card, index) => {
          card.classList.add('animate-on-scroll');
          gsap.fromTo(card,
            {
              opacity: 0,
              y: 60,
              scale: 0.9,
              rotation: -3
            },
            {
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play reverse play reverse",
                onEnter: () => card.classList.add('visible'),
                onLeave: () => card.classList.remove('visible'),
                onEnterBack: () => card.classList.add('visible'),
                onLeaveBack: () => card.classList.remove('visible')
              },
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 0.8,
              delay: index * 0.15,
              ease: "back.out(1.7)",
            }
          );
        });
      }
      
      // Project Cards - Slide from left with rotation
      const projectCards = section.querySelectorAll(".project-card");
      if (projectCards.length > 0) {
        projectCards.forEach((card, index) => {
          card.classList.add('slide-in-left');
          gsap.fromTo(card,
            {
              opacity: 0,
              x: -80,
              rotationY: -15,
              scale: 0.95
            },
            {
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play reverse play reverse",
                onEnter: () => card.classList.add('visible'),
                onLeave: () => card.classList.remove('visible'),
                onEnterBack: () => card.classList.add('visible'),
                onLeaveBack: () => card.classList.remove('visible')
              },
              opacity: 1,
              x: 0,
              rotationY: 0,
              scale: 1,
              duration: 0.9,
              delay: index * 0.2,
              ease: "power2.out",
            }
          );
        });
      }
      
      // Timeline Items - Slide from right
      const timelineItems = section.querySelectorAll(".timeline-item");
      if (timelineItems.length > 0) {
        timelineItems.forEach((item, index) => {
          item.classList.add('slide-in-right');
          gsap.fromTo(item,
            {
              opacity: 0,
              x: 100,
              scale: 0.9
            },
            {
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play reverse play reverse",
                onEnter: () => item.classList.add('visible'),
                onLeave: () => item.classList.remove('visible'),
                onEnterBack: () => item.classList.add('visible'),
                onLeaveBack: () => item.classList.remove('visible')
              },
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.15,
              ease: "power2.out",
            }
          );
        });
      }
      
      // Tech Stack Icons - Bounce with rotation
      const stackIcons = section.querySelectorAll(".stack-icons i");
      if (stackIcons.length > 0) {
        stackIcons.forEach((icon, index) => {
          icon.classList.add('bounce-in');
          gsap.fromTo(icon,
            {
              opacity: 0,
              y: 50,
              scale: 0.7,
              rotation: -20
            },
            {
              scrollTrigger: {
                trigger: icon,
                start: "top 95%",
                end: "bottom 5%",
                toggleActions: "play reverse play reverse",
                onEnter: () => icon.classList.add('visible'),
                onLeave: () => icon.classList.remove('visible'),
                onEnterBack: () => icon.classList.add('visible'),
                onLeaveBack: () => icon.classList.remove('visible')
              },
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 0.7,
              delay: index * 0.1,
              ease: "back.out(2)",
            }
          );
        });
      }
      
      // About Content - Scale and fade
      const aboutContent = section.querySelector(".about-content");
      if (aboutContent) {
        aboutContent.classList.add('scale-fade');
        gsap.fromTo(aboutContent,
          {
            opacity: 0,
            scale: 0.9,
            rotation: 2
          },
          {
            scrollTrigger: {
              trigger: aboutContent,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
              onEnter: () => aboutContent.classList.add('visible'),
              onLeave: () => aboutContent.classList.remove('visible'),
              onEnterBack: () => aboutContent.classList.add('visible'),
              onLeaveBack: () => aboutContent.classList.remove('visible')
            },
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "power2.out",
          }
        );
      }
      
      // Contact Container - Split animation
      const contactInfo = section.querySelector(".contact-info");
      const contactForm = section.querySelector(".contact-form");
      
      if (contactInfo) {
        contactInfo.classList.add('slide-in-left');
        gsap.fromTo(contactInfo,
          {
            opacity: 0,
            x: -60,
            scale: 0.95
          },
          {
            scrollTrigger: {
              trigger: contactInfo,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
              onEnter: () => contactInfo.classList.add('visible'),
              onLeave: () => contactInfo.classList.remove('visible'),
              onEnterBack: () => contactInfo.classList.add('visible'),
              onLeaveBack: () => contactInfo.classList.remove('visible')
            },
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      }
      
      if (contactForm) {
        contactForm.classList.add('slide-in-right');
        gsap.fromTo(contactForm,
          {
            opacity: 0,
            x: 60,
            scale: 0.95
          },
          {
            scrollTrigger: {
              trigger: contactForm,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
              onEnter: () => contactForm.classList.add('visible'),
              onLeave: () => contactForm.classList.remove('visible'),
              onEnterBack: () => contactForm.classList.add('visible'),
              onLeaveBack: () => contactForm.classList.remove('visible')
            },
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out",
          }
        );
      }
      
      // Testimonials - Flip animation
      const testimonials = section.querySelectorAll(".testimonial");
      if (testimonials.length > 0) {
        testimonials.forEach((testimonial, index) => {
          testimonial.classList.add('flip-in');
          gsap.fromTo(testimonial,
            {
              opacity: 0,
              rotationX: -30,
              scale: 0.9
            },
            {
              scrollTrigger: {
                trigger: testimonial,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play reverse play reverse",
                onEnter: () => testimonial.classList.add('visible'),
                onLeave: () => testimonial.classList.remove('visible'),
                onEnterBack: () => testimonial.classList.add('visible'),
                onLeaveBack: () => testimonial.classList.remove('visible')
              },
              opacity: 1,
              rotationX: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
            }
          );
        });
      }
    });
    
    // Enhanced Footer Animation
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach((footerSection, index) => {
      footerSection.classList.add('stagger-animation');
      gsap.fromTo(footerSection,
        {
          opacity: 0,
          y: 40
        },
        {
          scrollTrigger: {
            trigger: footerSection,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
            onEnter: () => footerSection.classList.add('visible'),
            onLeave: () => footerSection.classList.remove('visible'),
            onEnterBack: () => footerSection.classList.add('visible'),
            onLeaveBack: () => footerSection.classList.remove('visible')
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.15,
          ease: "power2.out",
        }
      );
    });
    
    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();
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
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#d4af37",
          },
          links: {
            color: "#d4af37",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
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

  // --- ENHANCED SCROLL ANIMATIONS ---
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -20px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Ensure element maintains base visibility
        entry.target.style.opacity = entry.target.style.opacity || '1';
        entry.target.style.visibility = 'visible';
        
        if (entry.isIntersecting) {
          // Element is entering the viewport
          entry.target.classList.add("visible");
          entry.target.classList.remove("hidden");
        } else {
          // Element is leaving the viewport - only add hidden if it has animation classes
          if (entry.target.classList.contains('animate-on-scroll') || 
              entry.target.classList.contains('slide-in-left') || 
              entry.target.classList.contains('slide-in-right') ||
              entry.target.classList.contains('dropdown-animation') ||
              entry.target.classList.contains('scale-fade') ||
              entry.target.classList.contains('bounce-in') ||
              entry.target.classList.contains('flip-in') ||
              entry.target.classList.contains('stagger-animation')) {
            entry.target.classList.remove("visible");
            entry.target.classList.add("hidden");
          }
        }
      });
    }, observerOptions);

    // Enhanced element selection with different animation types
    const elementsToAnimate = {
      // Dropdown animations for headings
      'h2': 'dropdown-animation',
      // Bounce animations for service cards
      '.service-card': 'animate-on-scroll',
      // Slide animations for project cards  
      '.project-card': 'slide-in-left',
      // Slide from right for timeline items
      '.timeline-item': 'slide-in-right',
      // Scale fade for about content
      '.about-content': 'scale-fade',
      // Bounce for tech icons
      '.stack-icons i': 'bounce-in',
      // Flip for testimonials
      '.testimonial': 'flip-in',
      // Slide animations for contact sections
      '.contact-info': 'slide-in-left',
      '.contact-form': 'slide-in-right',
      // Stagger for footer sections
      '.footer-section': 'stagger-animation'
    };

    // Apply animations to elements
    Object.keys(elementsToAnimate).forEach(selector => {
      const elements = document.querySelectorAll(selector);
      const animationClass = elementsToAnimate[selector];
      
      elements.forEach((el, index) => {
        // Ensure base visibility
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        
        if (!el.classList.contains(animationClass)) {
          el.classList.add(animationClass);
        }
        
        // Only add hidden class if element supports animations
        if (selector !== 'section' && selector !== 'footer') {
          el.classList.add("hidden");
        }
        
        observer.observe(el);
        
        // Add staggered delay for elements in the same container
        if (el.parentElement) {
          const siblings = el.parentElement.querySelectorAll(selector);
          if (siblings.length > 1) {
            el.style.transitionDelay = `${index * 0.08}s`;
          }
        }
      });
    });
    
    // Special handling for elements that should animate together
    const groupAnimations = document.querySelectorAll('.services-list, .project-cards, .stack-icons, .timeline');
    groupAnimations.forEach(group => {
      const children = group.children;
      Array.from(children).forEach((child, index) => {
        child.style.transitionDelay = `${index * 0.1}s`;
      });
    });
  }


  // --- ENHANCED GLOW EFFECTS ON SCROLL ---
  function initGlowEffects() {
    const elements = document.querySelectorAll(
      ".service-card, .project-card, .hire-me, .btn-secondary"
    );

    elements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        el.style.transform = "translateY(-5px)";
        el.style.transition = "all 0.3s ease";
      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = "translateY(0)";
      });
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('nav .menu a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // --- ENSURE CONTENT VISIBILITY ---
  function ensureContentVisibility() {
    // Ensure all main content is visible
    const mainContent = document.querySelectorAll('section, footer, .hero-section');
    mainContent.forEach(element => {
      element.style.opacity = '1';
      element.style.visibility = 'visible';
      element.style.display = element.style.display || 'block';
    });
  }

  // --- INITIALIZE ALL MODULES ---
  ensureContentVisibility();
  initPreloader();
  initScrollProgress();
  initNavbarEffects();
  initAnimations();
  initHamburgerMenu();
  initTestimonialCarousel();
  initChatWidget();
  initParticleBg();
  initContactForm();
  initScrollAnimations();
  initGlowEffects();
  
  // Final visibility check after all initializations
  setTimeout(ensureContentVisibility, 100);
});
