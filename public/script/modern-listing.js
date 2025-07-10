document.addEventListener('DOMContentLoaded', function() {
  // Calculate dynamic pricing based on selected dates
  const checkInInput = document.querySelector('.modern-listing-check-in input');
  const checkOutInput = document.querySelector('.modern-listing-check-out input');
  const reserveBtn = document.querySelector('.modern-listing-reserve-btn');
  
  if (checkInInput && checkOutInput && reserveBtn) {
    // Set minimum dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    checkInInput.min = formatDate(today);
    checkInInput.value = formatDate(today);
    
    checkOutInput.min = formatDate(tomorrow);
    checkOutInput.value = formatDate(tomorrow);
    
    // Ensure checkout is after checkin
    checkInInput.addEventListener('change', function() {
      const newMinCheckout = new Date(this.value);
      newMinCheckout.setDate(newMinCheckout.getDate() + 1);
      checkOutInput.min = formatDate(newMinCheckout);
      
      if (new Date(checkOutInput.value) <= new Date(this.value)) {
        checkOutInput.value = formatDate(newMinCheckout);
      }
    });
    
    // Reserve button action
    reserveBtn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Booking functionality would be implemented here!');
    });
  }
});