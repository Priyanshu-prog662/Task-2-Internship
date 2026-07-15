// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Greet Button Alert (Phase 1 Interactivity)
    // ==========================================
    const greetBtn = document.getElementById('greet-btn');
    if (greetBtn) {
        greetBtn.addEventListener('click', () => {
            alert('Hello! Welcome to my personal introduction page. This alert confirms that JavaScript is linked and working perfectly!');
        });
    }

    // ==========================================
    // 2. Contact Form Validation (Phase 2 Item 1 & 2)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            // Prevent default browser refresh on submit
            event.preventDefault();
            
            // Get form inputs
            const nameInput = document.getElementById('form-name');
            const emailInput = document.getElementById('form-email');
            const messageInput = document.getElementById('form-message');
            
            // Get error text spans
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const messageError = document.getElementById('message-error');
            const successAlert = document.getElementById('success-alert');
            
            // Reset previous validation states
            let isValid = true;
            resetErrorStates();
            
            // Validate Name
            if (!nameInput.value.trim()) {
                showError(nameInput, nameError, 'Name is required');
                isValid = false;
            }
            
            // Validate Email
            const emailValue = emailInput.value.trim();
            if (!emailValue) {
                showError(emailInput, emailError, 'Email address is required');
                isValid = false;
            } else if (!isValidEmail(emailValue)) {
                showError(emailInput, emailError, 'Please enter a valid email format (e.g., user@domain.com)');
                isValid = false;
            }
            
            // Validate Message
            if (!messageInput.value.trim()) {
                showError(messageInput, messageError, 'Message cannot be empty');
                isValid = false;
            }
            
            // If validation is successful
            if (isValid) {
                // Show dynamic inline success feedback
                successAlert.style.display = 'block';
                
                // Clear input values
                contactForm.reset();
                
                // Automatically hide success alert after 5 seconds
                setTimeout(() => {
                    successAlert.style.display = 'none';
                }, 5000);
            }
        });
    }
    
    // Helper function to show errors
    function showError(inputElement, errorElement, message) {
        inputElement.classList.add('invalid-field');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // Helper function to reset errors
    function resetErrorStates() {
        const inputs = document.querySelectorAll('.form-input');
        const errors = document.querySelectorAll('.error-msg');
        const successAlert = document.getElementById('success-alert');
        
        inputs.forEach(input => input.classList.remove('invalid-field'));
        errors.forEach(error => error.style.display = 'none');
        if (successAlert) {
            successAlert.style.display = 'none';
        }
    }
    
    // Regex helper for validating email format
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});
