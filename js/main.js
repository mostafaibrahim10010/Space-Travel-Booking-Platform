// Main JavaScript file for Dubai to the Stars Space Travel Booking Platform

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initCountdown();
    initPackageTabs();
    initBookingForm();
    initAnimations();
    initAccommodationSlider(); // Add this line to initialize the accommodation slider
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('.nav-links a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

// Countdown timer functionality
function initCountdown() {
    const countdownElement = document.getElementById('launch-countdown');
    if (!countdownElement) return;
    
    // Set the launch date (example: 30 days from now)
    const currentDate = new Date();
    const launchDate = new Date();
    launchDate.setDate(currentDate.getDate() + 30);
    
    function updateCountdown() {
        const currentTime = new Date();
        const diff = launchDate - currentTime;
        
        if (diff <= 0) {
            // Launch time has passed
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days < 10 ? `0${days}` : days;
        document.getElementById('hours').textContent = hours < 10 ? `0${hours}` : hours;
        document.getElementById('minutes').textContent = minutes < 10 ? `0${minutes}` : minutes;
        document.getElementById('seconds').textContent = seconds < 10 ? `0${seconds}` : seconds;
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Package tabs functionality
function initPackageTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const packageCards = document.querySelectorAll('.package-card');
    
    if (!tabButtons.length || !packageCards.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-tab');
            
            // Filter packages
            packageCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Booking form functionality
function initBookingForm() {
    const bookingForm = document.getElementById('space-booking-form');
    if (!bookingForm) return;
    
    // Set minimum dates for departure and return
    const departureDateInput = document.getElementById('departure-date');
    const returnDateInput = document.getElementById('return-date');
    
    if (departureDateInput && returnDateInput) {
        // Set minimum date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
        
        departureDateInput.setAttribute('min', tomorrowFormatted);
        returnDateInput.setAttribute('min', tomorrowFormatted);
        
        // Update return date min value when departure date changes
        departureDateInput.addEventListener('change', function() {
            returnDateInput.setAttribute('min', this.value);
            
            // If return date is before new departure date, update it
            if (returnDateInput.value < this.value) {
                returnDateInput.value = this.value;
            }
        });
    }
    
    // Form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            destination: document.getElementById('destination').value,
            departureDate: document.getElementById('departure-date').value,
            returnDate: document.getElementById('return-date').value,
            travelers: document.getElementById('travelers').value,
            travelClass: document.getElementById('class').value,
            accommodation: document.getElementById('accommodation').value
        };
        
        // Here you would typically send this data to a server
        // For now, we'll just show an alert
        alert('Your space journey search has been submitted! We will contact you shortly with available options.');
        
        // You could also redirect to a results page
        // window.location.href = 'search-results.html';
    });
    
    // Book now buttons functionality
    const bookNowButtons = document.querySelectorAll('.book-now');
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to booking section
            const bookingSection = document.getElementById('booking');
            window.scrollTo({
                top: bookingSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Pre-select the destination based on the card
            const destinationCard = this.closest('.destination-card');
            const destinationTitle = destinationCard.querySelector('h3').textContent;
            
            const destinationSelect = document.getElementById('destination');
            Array.from(destinationSelect.options).forEach(option => {
                if (option.text.includes(destinationTitle)) {
                    destinationSelect.value = option.value;
                }
            });
        });
    });
    
    // Book package buttons functionality
    const bookPackageButtons = document.querySelectorAll('.book-package');
    bookPackageButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to booking section
            const bookingSection = document.getElementById('booking');
            window.scrollTo({
                top: bookingSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
}

// Animation functionality
function initAnimations() {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.destination-card, .package-card, .info-card');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

// Accommodation slider functionality
function initAccommodationSlider() {
    const slides = document.querySelectorAll('.accommodation-slide');
    const dots = document.querySelectorAll('.nav-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slides.length || !dots.length || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    
    // Hide all slides except the first one
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.display = 'none';
        }
    });
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and activate corresponding dot
        slides[index].style.display = 'flex';
        dots[index].classList.add('active');
        
        // Add fade-in animation
        slides[index].classList.add('fade-in');
        setTimeout(() => {
            slides[index].classList.remove('fade-in');
        }, 500);
    }
    
    // Next button click event
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });
    
    // Previous button click event
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });
    
    // Dot indicators click event
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}