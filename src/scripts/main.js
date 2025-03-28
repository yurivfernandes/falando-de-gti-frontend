// Inicialização do GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    setupMobileMenu();
    setupTabs();
    loadInstagramFeed();
    setupGalleryModal();
    loadVideoDetails();
    initHeroImage();
    initAboutImage();
});

// Inicializa as transições entre seções
function initAnimations() {
    // Hero animations
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from('.animated-title', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        })
        .from('.hero-content p', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5');

    // O botão agora permanecerá visível
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.style.opacity = '1';
        ctaBtn.style.visibility = 'visible';
    }

    // Scroll animations for sections
    const sections = gsap.utils.toArray('.section-fade');
    sections.forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Videos animation
    gsap.from('.video-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.videos-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Gallery animation
    gsap.from('.gallery-item', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
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

    // Função para ativar tab
    function activateTab(tabId) {
        // Desativa todos os botões, conteúdos e imagens
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });
        modelImages.forEach(img => img.classList.remove('active'));

        // Ativa os elementos da tab selecionada
        const selectedButton = document.querySelector(`[data-tab="${tabId}"]`);
        const selectedContent = document.getElementById(tabId);
        const selectedImage = document.querySelector(`.model-img[data-tab="${tabId}"]`);

        if (selectedButton) selectedButton.classList.add('active');
        if (selectedContent) {
            selectedContent.classList.add('active');
            selectedContent.style.display = 'block';
        }
        if (selectedImage) selectedImage.classList.add('active');
    }

    // Ativar MK3 por padrão
    activateTab('mk3');

    // Setup dos cliques das tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            activateTab(tabId);
        });
    });
}

// Carregar feed do Instagram
async function loadInstagramFeed() {
    const instagramFeed = document.getElementById('instagramFeed');
    
    try {
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${instagramConfig.accessToken}`);
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            const latestPost = data.data[0];
            const mediaUrl = latestPost.media_type === 'VIDEO' ? latestPost.thumbnail_url : latestPost.media_url;
            
            instagramFeed.innerHTML = `
                <div class="instagram-post">
                    <a href="${latestPost.permalink}" target="_blank">
                        <img src="${mediaUrl}" alt="Última postagem do Instagram" loading="lazy">
                        <div class="instagram-overlay">
                            <p>${latestPost.caption || ''}</p>
                        </div>
                    </a>
                </div>
            `;
        }
    } catch (error) {
        console.error('Erro ao carregar feed do Instagram:', error);
        instagramFeed.innerHTML = '<p>Erro ao carregar a última postagem.</p>';
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
        aboutImage.src = window.innerWidth <= 768 ? 
            'https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/galeria/hero.jpg' : 
            'https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/retrato/sobre.jpeg';
    }
}

// Atualizar imagens quando a janela for redimensionada
window.addEventListener('resize', () => {
    initHeroImage();
    initAboutImage();
});