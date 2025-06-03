document.addEventListener('DOMContentLoaded', function() {
    // Image Gallery Thumbnail Click
    const thumbs = document.querySelectorAll('.thumb');
    const mainImage = document.getElementById('mainImage');
    
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbs
            thumbs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumb
            this.classList.add('active');
            
            // Change main image
            const newImageSrc = this.getAttribute('data-image');
            mainImage.src = newImageSrc;
            
            // Add fade effect
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 300);
        });
    });
    
    // Initialize date pickers
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format dates for input fields
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Set min dates for check-in/check-out
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        checkinInput.min = formatDate(today);
        checkoutInput.min = formatDate(tomorrow);
        
        // Update checkout min date when checkin changes
        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            const nextDay = new Date(checkinDate);
            nextDay.setDate(nextDay.getDate() + 1);
            checkoutInput.min = formatDate(nextDay);
            
            // If checkout is before new min date, reset it
            if (new Date(checkoutInput.value) < nextDay) {
                checkoutInput.value = formatDate(nextDay);
            }
        });
    }
    
    // Booking form submission
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const checkin = checkinInput.value;
            const checkout = checkoutInput.value;
            const adults = document.getElementById('adults').value;
            const children = document.getElementById('children').value;
            
            // In a real implementation, you would send this data to your booking system
            console.log('Booking submitted:', {
                checkin,
                checkout,
                adults,
                children,
                room: 'Deluxe Ocean View'
            });
            
            // Show success message
            alert(`Thank you for your booking request for our Deluxe Ocean View room from ${checkin} to ${checkout}. We will contact you shortly to confirm your reservation.`);
            
            // Reset form
            this.reset();
            
            // Reset min dates
            checkinInput.min = formatDate(today);
            checkoutInput.min = formatDate(tomorrow);
        });
    }
    
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});