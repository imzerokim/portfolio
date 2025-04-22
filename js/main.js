document.addEventListener('DOMContentLoaded', function() {
    // Load the header component
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('site-header').innerHTML = data;
            highlightCurrentPage();
        });

    // Load the footer component
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('site-footer').innerHTML = data;
        });

    // Highlight current page in navigation
    function highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop();
        
        // Default to index if no specific page
        let activePage = 'index';
        
        if (currentPage.includes('about')) {
            activePage = 'about';
        }
        
        // Add active class to current page link
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.dataset.page === activePage) {
                if (activePage === 'about') {
                    // Find the parent element to add the background color
                    const parentElement = link.closest('li');
                    if (parentElement) {
                        const background = document.createElement('div');
                        background.className = 'nav-background';
                        parentElement.appendChild(background);
                        parentElement.style.position = 'relative';
                        link.style.position = 'relative';
                        link.style.zIndex = '2';
                    }
                }
                link.classList.add('active');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.body.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 64, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        }
    });

    // Handle scroll animations
    window.addEventListener('scroll', function() {
        // You can add scroll-based animations here
    });
}); 