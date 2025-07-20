// Global variables
let isMenuOpen = false;
let activeSection = 'inicio';

// DOM elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const contactForm = document.getElementById('contactForm');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeForm();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
            updateActiveNavLink(sectionId);
            
            // Close mobile menu if open
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
}

function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

function updateActiveNavLink(sectionId) {
    // Update desktop navigation
    const desktopLinks = document.querySelectorAll('.nav-link');
    desktopLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
    
    // Update mobile navigation
    const mobileLinks = document.querySelectorAll('.nav-link-mobile');
    mobileLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
    
    activeSection = sectionId;
}

// Scroll effects
function initializeScrollEffects() {
    window.addEventListener('scroll', function() {
        handleScrollToTop();
        handleActiveSection();
    });
}

function handleScrollToTop() {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

function handleActiveSection() {
    const sections = ['inicio', 'servicos', 'sobre', 'contato'];
    const scrollPosition = window.scrollY + 100;
    
    for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                if (activeSection !== sectionId) {
                    updateActiveNavLink(sectionId);
                }
                break;
            }
        }
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Form functionality
function initializeForm() {
    contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        servico: formData.get('servico'),
        mensagem: formData.get('mensagem')
    };
    
    // Validate required fields
    if (!data.nome || !data.email || !data.mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Simulate form submission
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Reset form
    contactForm.reset();
}

// WhatsApp functionality
function openWhatsApp() {
    const message = 'Olá! Gostaria de saber mais sobre seus serviços.';
    const phoneNumber = '555199483619'; // Replace with your actual WhatsApp number
    const whatsappUrl = `https://wa.me/${555199483619}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Smooth scrolling for older browsers
function smoothScrollPolyfill() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
        document.head.appendChild(script);
    }
}

// Initialize polyfills
smoothScrollPolyfill();