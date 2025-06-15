document.addEventListener('DOMContentLoaded', function() {
    const donationForm = document.getElementById('donationForm');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.querySelector('.custom-amount-input');
    
    // Handle amount button selection
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show/hide custom amount input
            if (this.classList.contains('custom')) {
                customAmountInput.style.display = 'block';
            } else {
                customAmountInput.style.display = 'none';
            }
        });
    });

    // Form submission handling
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically:
        // 1. Validate the form
        // 2. Process the payment
        // 3. Send confirmation
        // 4. Redirect to thank you page
        
        alert('Thank you for your generous donation! This is a demo version. In the live version, you would be redirected to a secure payment gateway.');
    });
});
