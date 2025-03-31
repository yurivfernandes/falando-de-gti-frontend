// Inicialização do GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    setupMobileMenu();
    setupTabs(); // Garantir que as abas são inicializadas corretamente
    setupPlaceholderInstagramFeed();
    setupGalleryModal();
    initHeroImage();
    initAboutImage();

    // Carrega os detalhes dos vídeos se estiverem disponíveis
    loadVideoDetails();

    // Inicializar imagem do apresentador com fallback
    const presenterImage = document.getElementById('presenterImage');
    if (presenterImage) {
        const mobileImage = 'https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/galeria/hero.jpg';
        const desktopImage = 'https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/retrato/sobre.jpeg';
        
        // Função para definir a imagem baseado no tamanho da tela
        function setImageSource() {
            presenterImage.src = window.innerWidth <= 768 ? mobileImage : desktopImage;
            
            // Adicionar manipulador de erro para tentar novo caminho se a imagem falhar
            presenterImage.onerror = function() {
                // Se falhar com protocolo https, tenta com http
                if (this.src.startsWith('https://')) {
                    this.src = this.src.replace('https://', 'http://');
                } else {
                    // Imagem de fallback local
                    this.src = './public/retrato/sobre.jpeg';
                    this.onerror = null; // Impede loop infinito
                }
            };
        }
        
        // Definir a imagem inicial
        setImageSource();
        
        // Recalcular quando a janela for redimensionada
        window.addEventListener('resize', setImageSource);
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

// Setup das abas de curiosidades - CORRIGIDA para funcionar no Cloudflare
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const modelImages = document.querySelectorAll('.model-img');
    
    // Primeiro, esconder todos os conteúdos exceto o primeiro
    tabContents.forEach((content, index) => {
        if (index === 0) {
            content.style.display = 'block';
            content.classList.add('active');
        } else {
            content.style.display = 'none';
            content.classList.remove('active');
        }
    });
    
    modelImages.forEach((img, index) => {
        if (index === 0) {
            img.style.display = 'block';
            img.classList.add('active');
        } else {
            img.style.display = 'none';
            img.classList.remove('active');
        }
    });
    
    // Adicionar classes ativas para o primeiro botão se nenhum estiver ativo
    let hasActiveButton = false;
    tabButtons.forEach(btn => {
        if (btn.classList.contains('active')) {
            hasActiveButton = true;
        }
    });
    
    if (!hasActiveButton && tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
    }

    // Função para trocar de aba
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
        const activeButton = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(tabId);
        const activeImage = document.querySelector(`.model-img[data-tab="${tabId}"]`);

        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        if (activeContent) {
            activeContent.style.display = 'block';
            activeContent.classList.add('active');
            
            // Garantir que a opacidade seja 1 para visibilidade
            setTimeout(() => {
                activeContent.style.opacity = '1';
            }, 10);
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

    // Ativar a primeira tab por padrão ou a tab correspondente à URL hash
    const hash = window.location.hash.substring(1);
    const hashTab = document.getElementById(hash);
    
    if (hashTab && hashTab.classList.contains('tab-content')) {
        switchTab(hash);
    } else if (tabButtons.length > 0) {
        const firstTabId = tabButtons[0].getAttribute('data-tab');
        switchTab(firstTabId);
    }
}

// Placeholder para feed do Instagram
function setupPlaceholderInstagramFeed() {
    const instagramFeed = document.getElementById('instagramFeed');
    
    if (instagramFeed) {
        instagramFeed.innerHTML = `
            <div class="instagram-post">
                <a href="https://www.instagram.com/falandodegti" target="_blank">
                    <img src="https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/galeria/slide6.jpg" alt="Siga no Instagram" loading="lazy">
                    <div class="instagram-overlay">
                        <p>Siga @falandodegti no Instagram para conteúdo exclusivo!</p>
                    </div>
                </a>
            </div>
        `;
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
    
    videoCards.forEach(card => {
        // Como não temos uma API_KEY configurada, vamos usar apenas o que já está no HTML
        const iframe = card.querySelector('iframe');
        if (iframe) {
            const videoId = getVideoId(iframe.src);
            if (videoId) {
                // Verificamos se já existem elementos de título e descrição
                const hasTitle = card.querySelector('h4');
                const hasDesc = card.querySelector('p');
                
                // Se não existirem, adicionamos placeholder
                if (!hasTitle && !hasDesc) {
                    const titleElement = document.createElement('h4');
                    titleElement.textContent = "Vídeo Golf GTI";
                    card.appendChild(titleElement);
                    
                    const descElement = document.createElement('p');
                    descElement.textContent = "Conheça mais sobre o Golf GTI neste vídeo do canal Falando de GTI.";
                    card.appendChild(descElement);
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
    if (aboutImage && !aboutImage.getAttribute('src')) {
        aboutImage.src = 'https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/retrato/sobre.jpeg';
        aboutImage.onerror = () => {
            aboutImage.src = './public/retrato/sobre.jpeg';
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
});

// Garantir que as abas funcionem mesmo após o carregamento completo da página
window.addEventListener('load', () => {
    setupTabs();
});