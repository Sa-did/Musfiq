// Add this at the beginning of the file
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Mobile Navigation Enhancement
const mobileMenu = document.querySelector('.nav-links');
const menuItems = document.querySelectorAll('.nav-links a');

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const isOpen = mobileMenu.classList.contains('active');
    if (isOpen && !e.target.closest('.navbar')) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        toggleBodyScroll(false);
    }
});

// Close menu when clicking on a link
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Prevent body scroll when mobile menu is open
function toggleBodyScroll(disable) {
    document.body.style.overflow = disable ? 'hidden' : '';
}

hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent document click from firing
    const isOpen = mobileMenu.classList.contains('active');
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    toggleBodyScroll(!isOpen);
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Contact Form Validation
const contactForm = document.getElementById('contact-form');

// Initialize EmailJS with your actual credentials
emailjs.init("public_key"); // Replace with your actual public key

// Update contact form submission with proper error handling
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    try {
        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            throw new Error('Please fill in all fields');
        }

        if (!isValidEmail(email)) {
            throw new Error('Please enter a valid email address');
        }

        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Send email
        await emailjs.sendForm(
            'service_id', // Replace with your EmailJS service ID
            'template_id', // Replace with your EmailJS template ID
            contactForm
        );

        // Success
        alert('Message sent successfully!');
        contactForm.reset();

    } catch (error) {
        // Error handling
        console.error('Error:', error);
        alert(error.message || 'Failed to send message. Please try again later.');

    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Project Modal
const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');

// Project data
const projectData = {
    'e-commerce-platform': {
        title: 'E-commerce Platform',
        description: `A comprehensive e-commerce solution built with modern web technologies. 
        Features include product filtering, shopping cart, secure checkout, and user authentication.
        The platform is fully responsive and provides an intuitive shopping experience.`,
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API'],
        liveLink: 'https://example.com/ecommerce',
        codeLink: 'https://github.com/username/ecommerce',
        image: 'assets/images/project1.jpg'
    },
    'finance-app': {
        title: 'Finance App UI',
        description: `Modern banking application interface designed with focus on user experience.
        The design system includes dark/light mode, accessibility features, and animated transitions.`,
        technologies: ['Figma', 'Adobe XD', 'Protopie', 'Material Design'],
        liveLink: 'https://example.com/finance-app',
        codeLink: 'https://github.com/username/finance-app',
        image: 'assets/images/project2.jpg'
    }
    // Add data for other projects
};

// Open modal with project details
function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    const modalTitle = modal.querySelector('.modal-title');
    const modalImage = modal.querySelector('.modal-image');
    const modalDescription = modal.querySelector('.modal-description');
    const techList = modal.querySelector('.tech-list');
    const liveLink = modal.querySelector('.modal-live-link');
    const codeLink = modal.querySelector('.modal-code-link');

    modalTitle.textContent = project.title;
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalDescription.textContent = project.description;
    
    // Update tech list
    techList.innerHTML = project.technologies
        .map(tech => `<li>${tech}</li>`)
        .join('');

    // Update links
    liveLink.href = project.liveLink;
    codeLink.href = project.codeLink;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close modal
function closeProjectModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Event listeners for modal
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project-id');
        openProjectModal(projectId);
    });
});

closeModal.addEventListener('click', closeProjectModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeProjectModal();
    }
});

// Add smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // Height of your fixed header
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                toggleBodyScroll(false);
            }
        }
    });
});

// Back to top button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add after the existing code
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = function() {
            this.src = 'assets/images/fallback.jpg';
            this.alt = 'Image not available';
        };
    });
}

window.addEventListener('load', handleImageErrors); 