document.addEventListener('DOMContentLoaded', function() {
    // Load the header component
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('site-header').innerHTML = data;
            highlightCurrentPage();
            
            // Add click event listener for works link in header
            const worksLink = document.querySelector('.nav-link[data-page="works"]');
            if (worksLink) {
                worksLink.addEventListener('click', function(e) {
                    e.preventDefault(); // 기본 링크 동작 방지
                    
                    // 현재 페이지가 about.html인 경우
                    if (window.location.pathname.includes('about.html')) {
                        window.location.href = 'index.html?scrollToWorks=true';
                    } else {
                        // 현재 페이지가 메인 페이지인 경우, 스무스 스크롤 동작
                        const worksSection = document.querySelector('#works');
                        if (worksSection) {
                            // 로고 하이라이트 제거
                            const logo = document.querySelector('.logo');
                            if (logo) {
                                logo.classList.remove('highlighted');
                            }
                            
                            // 다른 모든 링크의 active 클래스 제거
                            document.querySelectorAll('.nav-link').forEach(link => {
                                link.classList.remove('active');
                            });
                            
                            // 현재 링크만 active 클래스 추가
                            this.classList.add('active');
                            
                            // works-button의 위치로 스크롤 (헤더 높이 고려)
                            const worksButton = document.querySelector('.works-button');
                            if (worksButton) {
                                window.scrollTo({
                                    top: worksSection.offsetTop - 80, // 헤더 높이 및 여백 조정
                                    behavior: 'smooth'
                                });
                            } else {
                                // 버튼을 찾지 못한 경우, works 섹션 상단으로 스크롤
                                window.scrollTo({
                                    top: worksSection.offsetTop - 80, // 헤더 높이 및 여백 조정
                                    behavior: 'smooth'
                                });
                            }
                            
                            // URL의 해시 업데이트
                            history.pushState(null, null, '#works');
                        }
                    }
                });
            }
            
            // Add click event listener to works button in main content
            const worksButton = document.querySelector('.works-button');
            if (worksButton) {
                worksButton.addEventListener('click', function() {
                    // Scroll to works section
                    const worksSection = document.querySelector('#works');
                    if (worksSection) {
                        window.scrollTo({
                            top: worksSection.offsetTop - 80, // 헤더 높이 및 여백 조정
                            behavior: 'smooth'
                        });
                    }
                    
                    // Update URL hash
                    history.pushState(null, null, '#works');
                    
                    // Update navigation highlighting
                    const logo = document.querySelector('.logo');
                    if (logo) {
                        logo.classList.remove('highlighted');
                    }
                    
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Only highlight works
                    const worksLink = document.querySelector('.nav-link[data-page="works"]');
                    if (worksLink) {
                        worksLink.classList.add('active');
                    }
                });
            }
            
            // Add click event listener for publications header
            const publicationsHeader = document.querySelector('.publications-header');
            if (publicationsHeader) {
                // Initialize publications content to be visible
                const publicationsContent = document.querySelector('.publications-content');
                if (publicationsContent) {
                    publicationsContent.style.display = 'block';
                }
                
                // Publication header click functionality removed
                // No toggle functionality or arrow rotation
            }
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
        const currentHash = window.location.hash;
        
        // Default to index if no specific page
        let activePage = 'index';
        
        // Check if hash is #works
        if (currentHash === '#works') {
            activePage = 'works';
        } else if (currentPage.includes('about')) {
            activePage = 'about';
        } else if (currentPage.includes('cv')) {
            activePage = 'cv';
        } else if (currentPage.includes('works')) {
            activePage = 'works';
        }
        
        // Remove all highlights first
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.classList.remove('highlighted');
        }
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add highlight to the active page only
        if (activePage === 'index' && !currentHash) {
            // Only highlight logo on index page with no hash
            if (logo) {
                logo.classList.add('highlighted');
            }
        } else {
            // Highlight the correct nav item
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.dataset.page === activePage) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Initialize interactive circle movement with a delay to ensure all styles are applied
    setTimeout(initializeCircleInteraction, 100);

    function initializeCircleInteraction() {
        const hero = document.querySelector('.hero');
        const heroBackground = document.querySelector('.hero-background');
        const circle1 = document.querySelector('.circle-1');
        const circle2 = document.querySelector('.circle-2');
        const circle3 = document.querySelector('.circle-3');
        
        if (hero && heroBackground && circle1 && circle2 && circle3) {
            console.log("Circle interaction initialized");
            
            // 화면 너비에 따른 원 크기 조정 계수
            const scaleFactor = window.innerWidth <= 576 ? 0.9 : 1;
            
            // 원의 실제 DOM 크기 조정
            if (window.innerWidth <= 576) {
                circle1.style.width = "252px";  // 280px의 90%
                circle1.style.height = "252px";
                
                circle2.style.width = "180px";  // 200px의 90%
                circle2.style.height = "180px";
                
                circle3.style.width = "135px";  // 150px의 90%
                circle3.style.height = "126px";  // 140px의 90%
            }
            
            // Set initial positions and velocities for the circles
            const circles = [
                {
                    element: circle1,
                    radius: 153 * scaleFactor, // 작은 화면에서는 90%로 축소
                    x: 480,
                    y: 180,
                    vx: 0,
                    vy: 0,
                    mass: 3,
                    rotation: -167,
                    rotationSpeed: 0
                },
                {
                    element: circle2,
                    radius: 107 * scaleFactor, // 작은 화면에서는 90%로 축소
                    x: 480,
                    y: 320,
                    vx: 0,
                    vy: 0,
                    mass: 2,
                    rotation: 72,
                    rotationSpeed: 0
                },
                {
                    element: circle3,
                    radius: 90 * scaleFactor, // 작은 화면에서는 90%로 축소
                    x: 280,
                    y: 120,
                    vx: 0,
                    vy: 0,
                    mass: 1,
                    rotation: 6,
                    rotationSpeed: 0
                }
            ];
            
            // 화면 크기 변경 감지 및 원 크기 조정
            window.addEventListener('resize', function() {
                const newScaleFactor = window.innerWidth <= 576 ? 0.9 : 1;
                
                // 원의 반지름 조정
                circles[0].radius = 153 * newScaleFactor;
                circles[1].radius = 107 * newScaleFactor;
                circles[2].radius = 90 * newScaleFactor;
                
                // 원의 실제 DOM 크기 조정
                if (window.innerWidth <= 576) {
                    circle1.style.width = "252px";  // 280px의 90%
                    circle1.style.height = "252px";
                    
                    circle2.style.width = "180px";  // 200px의 90%
                    circle2.style.height = "180px";
                    
                    circle3.style.width = "135px";  // 150px의 90%
                    circle3.style.height = "126px";  // 140px의 90%
                } else {
                    circle1.style.width = "280px";
                    circle1.style.height = "280px";
                    
                    circle2.style.width = "200px";
                    circle2.style.height = "200px";
                    
                    circle3.style.width = "150px";
                    circle3.style.height = "140px";
                }
                
                // 화면 크기가 변경되면 배경 크기도 업데이트
                const currentBackgroundRect = heroBackground.getBoundingClientRect();
                const currentBackgroundWidth = currentBackgroundRect.width;
                const currentBackgroundHeight = currentBackgroundRect.height - 80;
                
                // 원들이 화면 범위를 벗어나지 않도록 위치 조정
                circles.forEach(circle => {
                    if (circle.x - circle.radius < 20) {
                        circle.x = circle.radius + 20;
                    }
                    if (circle.x + circle.radius > currentBackgroundWidth - 20) {
                        circle.x = currentBackgroundWidth - circle.radius - 20;
                    }
                    if (circle.y - circle.radius < 20) {
                        circle.y = circle.radius + 20;
                    }
                    if (circle.y + circle.radius > currentBackgroundHeight - 20) {
                        circle.y = currentBackgroundHeight - circle.radius - 20;
                    }
                    
                    // DOM 요소에 위치 적용
                    circle.element.style.transform = `translate(${circle.x - circle.radius}px, ${circle.y - circle.radius}px) rotate(${circle.rotation}deg)`;
                });
            });
            
            // Get hero background dimensions
            const backgroundRect = heroBackground.getBoundingClientRect();
            const backgroundWidth = backgroundRect.width;
            const backgroundHeight = backgroundRect.height - 80; // 조금 줄여서 밑으로 내려가지 않게 함
            
            // Track mouse position and mouse state
            let mouseX = backgroundWidth / 2;
            let mouseY = backgroundHeight / 2;
            let mouseInHero = false;
            let animationStarted = false;
            
            // Update mouse position on move over the entire document
            document.addEventListener('mousemove', function(e) {
                // Get hero position relative to the viewport
                const heroRect = hero.getBoundingClientRect();
                const backgroundRect = heroBackground.getBoundingClientRect();
                
                // Check if mouse is inside hero section
                if (
                    e.clientX >= heroRect.left && 
                    e.clientX <= heroRect.right && 
                    e.clientY >= heroRect.top && 
                    e.clientY <= heroRect.bottom
                ) {
                    mouseInHero = true;
                    // 마우스 위치를 hero-background 기준으로 계산
                    mouseX = e.clientX - backgroundRect.left;
                    mouseY = e.clientY - backgroundRect.top;
                    
                    // hero-background 내부로 제한
                    mouseX = Math.max(0, Math.min(mouseX, backgroundWidth));
                    mouseY = Math.max(0, Math.min(mouseY, backgroundHeight));
                } else {
                    mouseInHero = false;
                    
                    // Remove the random movement when mouse is outside hero
                }
            });
            
            // Animation loop - runs continuously once started
            function animate() {
                animationStarted = true;
                
                // 현재 hero-background의 크기 업데이트
                const currentBackgroundRect = heroBackground.getBoundingClientRect();
                const currentBackgroundWidth = currentBackgroundRect.width;
                const currentBackgroundHeight = currentBackgroundRect.height - 80;
                
                circles.forEach((circle, i) => {
                    // Apply different forces based on whether mouse is in hero
                    if (mouseInHero) {
                        // Calculate distance to mouse
                        const dx = mouseX - circle.x;
                        const dy = mouseY - circle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        // Add a small attraction to mouse position
                        const forceDirection = 1; // 1 for attraction, -1 for repulsion
                        const forceMagnitude = 0.5; // Adjust strength of mouse influence
                        const maxForce = 2; // Maximum force to apply
                        
                        // Only apply force if distance is significant
                        if (distance > 10) {
                            // Normalize direction and apply force with dampening based on distance
                            circle.vx += forceDirection * (dx / distance) * forceMagnitude * Math.min(100 / distance, maxForce);
                            circle.vy += forceDirection * (dy / distance) * forceMagnitude * Math.min(100 / distance, maxForce);
                        }
                        
                        // Apply friction to slow down movement
                        circle.vx *= 0.95;
                        circle.vy *= 0.95;
                        
                        // Update position based on velocity
                        circle.x += circle.vx;
                        circle.y += circle.vy;
                        
                        // Add a slight rotation based on movement
                        circle.rotationSpeed = (circle.vx + circle.vy) * 0.1;
                        circle.rotation += circle.rotationSpeed;
                    } else {
                        // Stop all movement when mouse is outside hero
                        circle.vx = 0;
                        circle.vy = 0;
                    }
                    
                    // Keep circles within the hero-background bounds with padding for radius
                    const leftPadding = 20; // 왼쪽 패딩을 다시 20px로 설정
                    const rightPadding = 20; // 오른쪽 패딩도 20px로 설정
                    const topBottomPadding = 20; // 상하 패딩은 기존과 동일하게 유지
                    
                    if (circle.x - circle.radius < leftPadding) {
                        circle.x = circle.radius + leftPadding;
                        circle.vx *= -0.7; // Bounce with energy loss
                    }
                    if (circle.x + circle.radius > currentBackgroundWidth - rightPadding) {
                        circle.x = currentBackgroundWidth - circle.radius - rightPadding;
                        circle.vx *= -0.7;
                    }
                    if (circle.y - circle.radius < topBottomPadding) {
                        circle.y = circle.radius + topBottomPadding;
                        circle.vy *= -0.7;
                    }
                    if (circle.y + circle.radius > currentBackgroundHeight - topBottomPadding) {
                        circle.y = currentBackgroundHeight - circle.radius - topBottomPadding;
                        circle.vy *= -0.7;
                    }
                    
                    // Check collisions with other circles
                    for (let j = i + 1; j < circles.length; j++) {
                        const other = circles[j];
                        const dx = other.x - circle.x;
                        const dy = other.y - circle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        const minDistance = circle.radius + other.radius;
                        
                        // If circles are colliding
                        if (distance < minDistance) {
                            // Calculate collision normal
                            const nx = dx / distance;
                            const ny = dy / distance;
                            
                            // Calculate relative velocity
                            const vx = other.vx - circle.vx;
                            const vy = other.vy - circle.vy;
                            
                            // Calculate relative velocity in terms of normal direction
                            const velocityAlongNormal = vx * nx + vy * ny;
                            
                            // Do not resolve if velocities are separating
                            if (velocityAlongNormal > 0) continue;
                            
                            // Calculate restitution (bounciness)
                            const restitution = 0.8;
                            
                            // Calculate impulse scalar
                            const impulseScalar = -(1 + restitution) * velocityAlongNormal / (1 / circle.mass + 1 / other.mass);
                            
                            // Apply impulse
                            const impulseX = impulseScalar * nx;
                            const impulseY = impulseScalar * ny;
                            
                            circle.vx -= (impulseX / circle.mass);
                            circle.vy -= (impulseY / circle.mass);
                            other.vx += (impulseX / other.mass);
                            other.vy += (impulseY / other.mass);
                            
                            // Prevent sticking by separating circles
                            const overlap = minDistance - distance;
                            const correction = (overlap / 2);
                            const correctionX = correction * nx;
                            const correctionY = correction * ny;
                            
                            circle.x -= correctionX;
                            circle.y -= correctionY;
                            other.x += correctionX;
                            other.y += correctionY;
                        }
                    }
                    
                    // Apply position and rotation to the DOM element
                    circle.element.style.transform = `translate(${circle.x - circle.radius}px, ${circle.y - circle.radius}px) rotate(${circle.rotation}deg)`;
                });
                
                // Continue animation loop
                requestAnimationFrame(animate);
            }
            
            // Start animation immediately
            animate();
        }
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
                
                // Update URL hash
                history.pushState(null, null, targetId);
                
                // Update active page highlighting
                setTimeout(highlightCurrentPage, 100);
            }
        }
    });

    // Handle scroll animations and header update
    window.addEventListener('scroll', function() {
        // Check if we're at the works section
        const worksSection = document.querySelector('#works');
        if (worksSection) {
            const worksSectionTop = worksSection.getBoundingClientRect().top;
            const headerHeight = 64; // Header height
            
            // If we're at or past the works section
            if (worksSectionTop <= headerHeight) {
                // Update URL hash if not already set
                if (window.location.hash !== '#works') {
                    history.replaceState(null, null, '#works');
                    
                    // Remove all highlights
                    const logo = document.querySelector('.logo');
                    if (logo) {
                        logo.classList.remove('highlighted');
                    }
                    
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Only highlight works
                    const worksLink = document.querySelector('.nav-link[data-page="works"]');
                    if (worksLink) {
                        worksLink.classList.add('active');
                    }
                }
            } else if (window.scrollY < 100 && window.location.hash === '#works') {
                // At the top of the page, clear hash
                history.replaceState(null, null, window.location.pathname);
                
                // Revert to index page highlighting (logo)
                const logo = document.querySelector('.logo');
                if (logo) {
                    logo.classList.add('highlighted');
                }
                
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
            }
        }
    });

    // 페이지 로드 시 URL 파라미터 확인
    if (window.location.search.includes('scrollToWorks=true')) {
        // URL 정리
        history.replaceState(null, null, '#works');
        
        // 하이라이트 처리
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.classList.remove('highlighted');
        }
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Works 링크만 하이라이트
        const worksLink = document.querySelector('.nav-link[data-page="works"]');
        if (worksLink) {
            worksLink.classList.add('active');
        }
        
        // 스크롤 위치를 조정하는 함수
        // - works-button이 있는 위치로 스크롤
        function scrollToWorksButtonPosition() {
            // works 섹션 찾기
            const worksSection = document.querySelector('#works');
            
            if (worksSection) {
                // works 섹션의 위치로 스크롤 (헤더 높이 고려)
                window.scrollTo(0, worksSection.offsetTop - 80); // 헤더 높이 및 여백 조정
            }
        }
        
        // 여러 시점에서 스크롤 시도
        // DOM이 완전히 로드된 후
        if (document.readyState === 'complete') {
            scrollToWorksButtonPosition();
        } else {
            window.addEventListener('DOMContentLoaded', function() {
                setTimeout(scrollToWorksButtonPosition, 0);
            });
            
            window.addEventListener('load', function() {
                setTimeout(scrollToWorksButtonPosition, 0);
            });
        }
        
        // 백업 시도 - 약간의 지연 후 재시도
        setTimeout(scrollToWorksButtonPosition, 100);
        setTimeout(scrollToWorksButtonPosition, 500);
    }
});