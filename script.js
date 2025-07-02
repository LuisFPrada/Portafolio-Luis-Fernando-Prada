// DOM Elements
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navbar = document.getElementById("navbar")
const navLinks = document.querySelectorAll(".nav-link")

// EmailJS Configuration - FUNCIONANDO ✅
const EMAIL_CONFIG = {
  serviceID: "service_038oa8f",
  templateID: "template_mx24ouc",
  confirmationTemplateID: "template_7dsgb3v",
  publicKey: "YADz0A6ElcxnbOS1z",
}

// Mobile Navigation Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Active navigation link highlighting
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section")
  const scrollPos = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"))
      if (navLink) {
        navLink.classList.add("active")
      }
    }
  })
}

window.addEventListener("scroll", updateActiveNavLink)

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// FORMULARIO DE CONTACTO - VERSIÓN CORREGIDA
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Página cargada")

  // Declare emailjs variable
  const emailjs = window.emailjs

  // Inicializar EmailJS
  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAIL_CONFIG.publicKey)
    console.log("✅ EmailJS inicializado correctamente")
    console.log("🔧 Configuración:", EMAIL_CONFIG)
  } else {
    console.error("❌ EmailJS no está disponible")
    return
  }

  // Obtener el formulario
  const contactForm = document.getElementById("contact-form")
  if (!contactForm) {
    console.error("❌ Formulario no encontrado")
    return
  }

  console.log("✅ Formulario encontrado")

  // Manejar envío del formulario
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    console.log("📝 Formulario enviado")

    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent

    // Cambiar estado del botón
    submitBtn.disabled = true
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'

    // Obtener datos del formulario
    const formData = new FormData(contactForm)
    const templateParams = {
      from_name: formData.get("name"),
      from_email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      send_date: new Date().toLocaleString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Bogota",
      }),
      to_email: "luifernando1997@hotmail.com",
    }

    console.log("📋 Parámetros:", templateParams)

    // Validación básica
    if (!validateForm(templateParams)) {
      resetButton()
      return
    }

    try {
      console.log("📧 Enviando email principal...")

      // Enviar email principal
      const response = await emailjs.send(
        EMAIL_CONFIG.serviceID,
        EMAIL_CONFIG.templateID,
        templateParams,
        EMAIL_CONFIG.publicKey,
      )

      console.log("✅ Email principal enviado:", response)

      // Enviar confirmación automática - DESACTIVADO TEMPORALMENTE
      /*
      try {
        console.log("📧 Enviando confirmación...")
        
        // Crear un template simple para confirmación
        const simpleConfirmation = {
          to_email: templateParams.from_email, // Email del visitante
          to_name: templateParams.from_name,   // Nombre del visitante
          from_name: "Luis Fernando Prada",
          reply_message: `Hola ${templateParams.from_name},\n\nGracias por contactarme a través de mi portafolio. He recibido tu mensaje sobre "${templateParams.subject}".\n\nTe contactaré pronto.\n\nSaludos,\nLuis Fernando Prada`,
          subject: `Re: ${templateParams.subject}`,
        }

        console.log("📋 Confirmación simplificada:", simpleConfirmation)

        // Usar el template principal pero con datos de confirmación
        await emailjs.send(
          EMAIL_CONFIG.serviceID,
          EMAIL_CONFIG.templateID, // Usar el mismo template que funciona
          {
            from_name: "Luis Fernando Prada",
            from_email: "luifernando1997@hotmail.com",
            to_email: templateParams.from_email, // Al visitante
            subject: `Confirmación: ${templateParams.subject}`,
            message: `Hola ${templateParams.from_name},\n\nGracias por contactarme. He recibido tu mensaje y te responderé pronto.\n\nSaludos,\nLuis Fernando Prada`,
            send_date: templateParams.send_date,
          },
          EMAIL_CONFIG.publicKey,
        )

        console.log("✅ Confirmación enviada exitosamente")
      } catch (confirmError) {
        console.warn("⚠️ Error en confirmación:", confirmError)
        // La confirmación es opcional, no afecta el funcionamiento principal
      }
      */
      console.log("ℹ️ Confirmación automática desactivada temporalmente")

      // Mostrar éxito
      showNotification("¡Mensaje enviado con éxito! Te contactaré pronto.", "success")
      contactForm.reset()
    } catch (error) {
      console.error("❌ Error al enviar:", error)

      let errorMessage = "Error al enviar el mensaje. "
      if (error.status === 400) {
        errorMessage += "Verifica los datos del formulario."
      } else if (error.status === 401) {
        errorMessage += "Error de autenticación."
      } else if (error.status === 403) {
        errorMessage += "Acceso denegado."
      } else {
        errorMessage += "Intenta de nuevo o contacta directamente."
      }

      showNotification(errorMessage, "error")
    } finally {
      resetButton()
    }

    function resetButton() {
      submitBtn.disabled = false
      submitBtn.textContent = originalText
    }
  })

  // Inicializar otras funciones
  initializeAnimations()
})

// Validación del formulario
function validateForm(data) {
  const { from_name, from_email, subject, message } = data

  if (!from_name || from_name.trim().length < 2) {
    showNotification("El nombre debe tener al menos 2 caracteres.", "error")
    return false
  }

  if (!from_email || !isValidEmail(from_email)) {
    showNotification("Por favor, ingresa un email válido.", "error")
    return false
  }

  if (!subject || subject.trim().length < 5) {
    showNotification("El asunto debe tener al menos 5 caracteres.", "error")
    return false
  }

  if (!message || message.trim().length < 10) {
    showNotification("El mensaje debe tener al menos 10 caracteres.", "error")
    return false
  }

  return true
}

// Validación de email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Sistema de notificaciones
function showNotification(message, type = "info") {
  console.log(`📢 Notificación (${type}): ${message}`)

  // Remover notificación existente
  const existing = document.querySelector(".notification")
  if (existing) {
    existing.remove()
  }

  // Crear nueva notificación
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Estilos
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: Arial, sans-serif;
        line-height: 1.4;
    `

  document.body.appendChild(notification)

  // Animar entrada
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Botón cerrar
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => notification.remove(), 300)
  })

  // Auto-cerrar
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => notification.remove(), 300)
    }
  }, 6000)
}

// Función para inicializar animaciones
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")

        // Animar barras de progreso
        const progressBars = entry.target.querySelectorAll(".progress-bar")
        progressBars.forEach((bar) => {
          const progress = bar.getAttribute("data-progress")
          setTimeout(() => {
            bar.style.width = progress + "%"
          }, 300)
        })
      }
    })
  }, observerOptions)

  const animatedElements = document.querySelectorAll(
    ".timeline-item, .project-card, .skill-category, .education-item, .stat-item",
  )

  animatedElements.forEach((el) => {
    observer.observe(el)

    // Inicializar barras de progreso en 0%
    const progressBars = el.querySelectorAll(".progress-bar")
    progressBars.forEach((bar) => {
      bar.style.width = "0%"
    })
  })
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const roleElement = document.querySelector(".hero-title .role")
  if (roleElement) {
    const originalText = roleElement.textContent
    typeWriter(roleElement, originalText, 150)
  }
})

// Scroll to top functionality
function createScrollToTopButton() {
  const scrollBtn = document.createElement("button")
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollBtn.className = "scroll-to-top"
  scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2563eb, #7c3aed);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 18px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `

  document.body.appendChild(scrollBtn)

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollBtn.style.opacity = "1"
      scrollBtn.style.visibility = "visible"
    } else {
      scrollBtn.style.opacity = "0"
      scrollBtn.style.visibility = "hidden"
    }
  })

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  scrollBtn.addEventListener("mouseenter", () => {
    scrollBtn.style.transform = "translateY(-3px)"
    scrollBtn.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.3)"
  })

  scrollBtn.addEventListener("mouseleave", () => {
    scrollBtn.style.transform = "translateY(0)"
    scrollBtn.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)"
  })
}

// Initialize scroll to top button
createScrollToTopButton()

// Preloader
function createPreloader() {
  const preloader = document.createElement("div")
  preloader.id = "preloader"
  preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-spinner"></div>
            <p>Cargando...</p>
        </div>
    `
  preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `

  const style = document.createElement("style")
  style.textContent = `
        .preloader-content {
            text-align: center;
        }
        .preloader-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #2563eb;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `

  document.head.appendChild(style)
  document.body.appendChild(preloader)

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0"
      setTimeout(() => {
        preloader.remove()
      }, 500)
    }, 1000)
  })
}

// Initialize preloader
createPreloader()

// Console message
console.log(`
🚀 Portafolio de Luis Fernando Prada Villadiego
📧 Contacto: luifernando1997@hotmail.com
🔗 LinkedIn: https://www.linkedin.com/in/luis-fernando-prada-villadiego/
💻 GitHub: https://github.com/LuisFPrada

✅ EmailJS configurado y funcionando
`)
