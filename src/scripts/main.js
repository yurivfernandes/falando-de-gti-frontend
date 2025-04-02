// Inicialização do GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    setupMobileMenu();
    setupTabs();
    setupGalleryModal();
    loadVideoDetails();
    initHeroImage();
    initAboutImage();

    // Inicializar imagem do apresentador
    const presenterImage = document.getElementById('presenterImage');
    if (presenterImage) {
        presenterImage.src = window.innerWidth <= 768 ? 
            'https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/galeria/hero.jpg' : 
            'https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/retrato/sobre.jpeg';

        window.addEventListener('resize', () => {
            presenterImage.src = window.innerWidth <= 768 ? 
                'https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/galeria/hero.jpg' : 
                'https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/retrato/sobre.jpeg';
        });
    }
});

// Inicializa as transições entre seções
function initAnimations() {
    // Hero animation
    gsap.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power3.out'
    });

    // Animação das seções
    const sections = gsap.utils.toArray('.section-fade');
    sections.forEach((section, i) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Animar título da seção
        const title = section.querySelector('.section-title');
        if (title) {
            tl.from(title, {
                opacity: 0,
                y: 30,
                duration: 0.8
            });
        }

        // Animar elementos específicos em cada seção
        if (section.classList.contains('about-section')) {
            tl.from(section.querySelector('.about-text'), {
                opacity: 0,
                x: -50,
                duration: 0.8
            })
            .from(section.querySelector('.about-image'), {
                opacity: 0,
                x: 50,
                duration: 0.8
            }, '-=0.6');
        }

        if (section.classList.contains('videos-section')) {
            tl.from(section.querySelectorAll('.video-card'), {
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.2
            });
        }

        if (section.classList.contains('gallery-section')) {
            tl.from(section.querySelectorAll('.gallery-item'), {
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.1
            });
        }

        if (section.classList.contains('specs-section')) {
            tl.from('.tab-buttons', {
                opacity: 0,
                y: 20,
                duration: 0.6
            })
            .from('.specs-card', {
                opacity: 0,
                y: 30,
                duration: 0.8
            }, '-=0.3')
            .from('.specs-image', {
                opacity: 0,
                x: 50,
                duration: 0.8
            }, '-=0.5');
        }

        if (section.classList.contains('docs-section')) {
            tl.from('.docs-card', {
                opacity: 0,
                scale: 0.9,
                duration: 0.8
            });
        }
    });

    // Animação do header no scroll
    gsap.to('.header', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top -80',
            end: '+=80',
            toggleActions: 'play none none reverse'
        },
        backgroundColor: 'rgba(18, 18, 18, 0.95)',
        backdropFilter: 'blur(10px)',
        duration: 0.3
    });
}

// Configuração do menu mobile
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar em links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Setup das abas de curiosidades
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const modelImages = document.querySelectorAll('.model-img');

    // Primeiro, esconder todos os conteúdos
    tabContents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
    });
    
    modelImages.forEach(img => {
        img.style.display = 'none';
        img.classList.remove('active');
    });

    function switchTab(tabId) {
        // Desativar todas as tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => {
            content.style.display = 'none';
            content.classList.remove('active');
        });
        modelImages.forEach(img => {
            img.style.display = 'none';
            img.classList.remove('active');
        });

        // Ativar a tab selecionada
        const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(tabId);
        const activeImage = document.querySelector(`.model-img[data-tab="${tabId}"]`);

        if (activeButton) activeButton.classList.add('active');
        if (activeContent) {
            activeContent.style.display = 'block';
            activeContent.classList.add('active');
        }
        if (activeImage) {
            activeImage.style.display = 'block';
            activeImage.classList.add('active');
        }
    }

    // Adicionar event listeners
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Ativar a primeira tab por padrão
    if (tabButtons.length > 0) {
        const firstTabId = tabButtons[0].getAttribute('data-tab');
        switchTab(firstTabId);
    }
}

// Galeria Modal
function setupGalleryModal() {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    document.body.appendChild(modal);

    const modalImg = document.createElement('img');
    modalImg.className = 'modal-image';
    modalImg.setAttribute('oncontextmenu', 'return false');
    modal.appendChild(modalImg);

    const closeButton = document.createElement('button');
    closeButton.className = 'modal-close';
    closeButton.innerHTML = '×';
    modal.appendChild(closeButton);

    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            modalImg.src = imgSrc;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        } 
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Função para extrair ID do vídeo da URL do YouTube
function getVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Função para carregar informações dos vídeos
async function loadVideoDetails() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(async (card) => {
        const iframe = card.querySelector('iframe');
        if (iframe) {
            const videoId = getVideoId(iframe.src);
            if (videoId) {
                try {
                    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${config.YOUTUBE_API_KEY}`);
                    const data = await response.json();
                    
                    if (data.items && data.items[0]) {
                        const videoTitle = data.items[0].snippet.title;
                        const description = data.items[0].snippet.description;
                        
                        // Criar ou atualizar título
                        let titleElement = card.querySelector('h4');
                        if (!titleElement) {
                            titleElement = document.createElement('h4');
                            card.appendChild(titleElement);
                        }
                        titleElement.textContent = videoTitle;
                        
                        // Adicionar descrição curta
                        let descElement = card.querySelector('p');
                        if (!descElement) {
                            descElement = document.createElement('p');
                            card.appendChild(descElement);
                        }
                        descElement.textContent = description.split('\n')[0].substring(0, 100) + '...';
                    }
                } catch (error) {
                    console.error('Erro ao carregar detalhes do vídeo:', error);
                }
            }
        }
    });
}

// Função para carregar imagem do hero
function initHeroImage() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroImage = window.innerWidth <= 768 ? 
            'https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/retrato/sobre.jpeg' : 
            'https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/galeria/hero.jpg';
            
        heroSection.style.background = `linear-gradient(rgba(18, 18, 18, 0.5), rgba(18, 18, 18, 0.6)), url('${heroImage}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'top center';
        heroSection.style.backgroundAttachment = window.innerWidth <= 768 ? 'scroll' : 'fixed';
    }
}

// Função para carregar imagem do apresentador
function initAboutImage() {
    const aboutImage = document.querySelector('.presenter-img');
    if (aboutImage) {
        aboutImage.src = '/src/public/retrato/sobre.jpeg';
        aboutImage.onerror = () => {
            aboutImage.src = '/public/retrato/sobre.jpeg';
        };
    }
}

// RPM Meter Control
function updateRPMMeter() {
    const maxRPM = 8000;
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const currentRPM = Math.round((scrollPercentage / 100) * maxRPM);
    const rpmValue = document.querySelector('.rpm-value');
    if (rpmValue) {
        rpmValue.textContent = currentRPM.toLocaleString();
        // Mudança de cor baseada nas RPM
        if (currentRPM > 7000) {
            rpmValue.style.color = '#ff0000';
        } else if (currentRPM > 5000) {
            rpmValue.style.color = '#ff6b00';
        } else {
            rpmValue.style.color = '#ffffff';
        }
    }
}

window.addEventListener('scroll', updateRPMMeter);
updateRPMMeter(); // Inicialização

// Atualizar imagens quando a janela for redimensionada
window.addEventListener('resize', () => {
    initHeroImage();
    initAboutImage();
});