console.log("contact.js loaded");

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                phone: contactForm.phone.value,
                subject: contactForm.subject.value,
                message: contactForm.message.value
            };

            // Validate form
            if (!validateForm(formData)) {
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                // ✅ Send actual email through FormSubmit
                await fetch('https://formsubmit.co/ajax/info@jamiarizviatrust.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                // Show success message
                showNotification('Message sent successfully! We will get back to you soon.', 'success');
                contactForm.reset();
                
            } catch (error) {
                // Show error message
                showNotification('Something went wrong. Please try again later.', 'error');
                console.error(error);
                
            } finally {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});

function validateForm(data) {
    if (!data.name.trim()) {
        showNotification('Please enter your name', 'error');
        return false;
    }

    if (!data.email.trim() || !isValidEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }

    if (!data.subject) {
        showNotification('Please select a subject', 'error');
        return false;
    }

    if (!data.message.trim()) {
        showNotification('Please enter your message', 'error');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function showNotification(message, type) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    const formContainer = document.querySelector('.form-container');
    formContainer.insertBefore(notification, document.getElementById('contactForm'));

    setTimeout(() => notification.remove(), 5000);
}

// ✅ Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        padding: 1.5rem;
        margin-bottom: 2rem;
        border-radius: 0.5rem;
        text-align: center;
        font-size: 1.4rem;
        animation: slideDown 0.3s ease-out;
    }
    .notification.success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    .notification.error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    @keyframes slideDown {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(style);
