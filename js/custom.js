// part6 : album
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Lightbox Modal Logic ---
    const portfolioModal = document.getElementById('portfolioModal');
    if (portfolioModal) {
        portfolioModal.addEventListener('show.bs.modal', function (event) {
            // Button that triggered the modal
            const button = event.relatedTarget;
            
            // Extract info from data-* attributes
            const imgSrc = button.getAttribute('data-img-src');
            const title = button.getAttribute('data-title');
            
            // Update the modal's content
            const modalTitle = portfolioModal.querySelector('.modal-title');
            const modalImage = portfolioModal.querySelector('#portfolioModalImage');
            
            modalTitle.textContent = title;
            modalImage.src = imgSrc;
        });
    }

    // --- Portfolio Filter Logic ---
    const filterButtons = document.querySelectorAll('#portfolio-filters .nav-link');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Set active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                // Hide or show items based on filter
                if (filter === '*' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});


// END


// PART11: HAPPY CLIENT
document.addEventListener('DOMContentLoaded', function() {
    
    const feedbackCards = document.querySelectorAll('.feedback-card');
    
    // Desktop view elements
    const desktopReviewStars = document.getElementById('desktop-review-stars');
    const desktopReviewText = document.getElementById('desktop-review-text');
    const desktopReviewName = document.getElementById('desktop-review-name');
    const desktopProjectImg = document.getElementById('desktop-project-img');

    // Function to generate star icons
    function generateStars(rating) {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHTML += '<i class="fas fa-star"></i>'; // Full star
            } else {
                starsHTML += '<i class="far fa-star"></i>'; // Empty star
            }
        }
        return starsHTML;
    }

    // Set initial view for the first card
    const firstCard = feedbackCards[0];
    if (firstCard) {
        desktopReviewStars.innerHTML = generateStars(firstCard.dataset.rating);
        firstCard.style.backgroundImage = `url('${firstCard.dataset.projectImg}')`;
    }

    // Add click listeners to all cards
    feedbackCards.forEach((card, index) => {
        // Set background image for all cards on load
        card.style.backgroundImage = `url('${card.dataset.projectImg}')`;

        card.addEventListener('click', function() {
            // Get data from the clicked card
            const review = this.dataset.review;
            const name = this.dataset.name;
            const rating = this.dataset.rating;

            // Update desktop view content
            desktopReviewStars.innerHTML = generateStars(rating);
            desktopReviewText.textContent = review;
            desktopReviewName.textContent = name;
            desktopProjectImg.src = this.dataset.projectImg;
            
            // Update active state
            document.querySelector('.feedback-card.active').classList.remove('active');
            this.classList.add('active');
        });
    });
});
// END




// states counter

document.addEventListener("DOMContentLoaded", () => {
    // Function to animate the number
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Ensure the final value is exact
                obj.innerHTML = end;
            }
        };
        window.requestAnimationFrame(step);
    }

    // Intersection Observer to trigger the animation when the section is visible
    const statsSection = document.getElementById('stats-counter-section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.dataset.target;
                    animateValue(counter, 0, target, 2000); // Animate over 2 seconds
                });
                // Disconnect the observer once the animation has been triggered
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe the stats section
    observer.observe(statsSection);
});
    

// END OF STATES COUNTER

