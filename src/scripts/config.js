// Configurações da landing page "Falando de GTI"

const CONFIG = {
    // Informações do canal
    channel: {
        name: "Falando de GTI",
        description: "Canal dedicado a GTIs e carros esportivos da Volkswagen",
        social: {
            youtube: "https://www.youtube.com/user/falandodegti",
            instagram: "https://www.instagram.com/falandodegti",
            facebook: "https://www.facebook.com/falandodegti"
        }
    },
    
    // Vídeos em destaque (IDs do YouTube)
    featuredVideos: {
        video1: {
            id: "jiSVP7OrCe0",
            title: "Restauração Completa do Golf GTI MK3",
            description: "Acompanhe o processo de restauração detalhado passo a passo."
        },
        video2: {
            id: "GKSlbrdavMY",
            title: "Upgrades de Performance: Vale a Pena?",
            description: "Análise completa das melhores modificações para aumentar a potência."
        },
        video3: {
            id: "03WVF6TqJQU",
            title: "História do GTI: Da MK1 à MK8",
            description: "Conheça a evolução do lendário Golf GTI através das gerações."
        }
    },
    
    // Configurações do Instagram
    instagram: {
        username: "falandodegti",
        token: "SEU_TOKEN_DE_ACESSO_AQUI" // Token de acesso à API do Instagram
    },
    
    // Configurações de animação
    animation: {
        speedometer: {
            maxSpeed: 220, // Velocidade máxima no velocímetro (km/h)
            initialPosition: -120 // Posição inicial da agulha (graus)
        },
        powerCounter: {
            maxPower: 150 // Potência máxima em cavalos (cv)
        }
    },
    
    // Caminhos das imagens
    images: {
        hero: "https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/galeria/hero.jpg",
        presenter: "https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/retrato/sobre.jpeg",
        gallery: [
            "https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/galeria/slide1.jpg",
            "https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/galeria/slide2.jpg",
            "https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/galeria/slide3.jpg",
            "https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/galeria/slide4.jpg",
            "https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/galeria/slide5.jpg",
            "https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/galeria/slide7.jpeg",
            "https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/galeria/slide8.jpg",
            "https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/galeria/slide9.jpg",
            "https://raw.githubusercontent.com/yurivfernandes/falando-de-gti-frontend/refs/heads/main/src/public/galeria/slide10.jpeg"
        ],
        instagram: "public/instagram-post.jpg"
    }
};

// Exportar as configurações
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}