# Falando de GTI - Landing Page

Landing page moderna e responsiva para o canal "Falando de GTI", focado em carros esportivos da Volkswagen, especialmente o Golf GTI MK3.

## Características Principais

- Design moderno inspirado no universo automotivo com paleta de cores GTI
- Totalmente responsivo para dispositivos móveis e desktop
- Velocímetro interativo que reage ao scroll da página
- Contador de cavalos de potência baseado no progresso da página
- Integração com APIs do YouTube e Instagram
- Animações suaves e transições elegantes usando GSAP

## Estrutura do Projeto

```
falando-de-gti-frontend/
│
├── index.html              # Estrutura principal da página
├── styles/
│   └── main.css            # Estilos CSS da página
│
├── scripts/
│   ├── main.js             # JavaScript principal com funcionalidades
│   └── config.js           # Configurações do site (vídeos, redes sociais, etc.)
│
├── public/                 # Pasta com imagens do site
│   ├── golf-1.jpg
│   ├── golf-2.jpg
│   ├── ...
│   └── apresentador-golf.jpg
│
└── README.md               # Documentação do projeto
```

## Tecnologias Utilizadas

- HTML5, CSS3 e JavaScript
- GSAP para animações e ScrollTrigger
- APIs do YouTube e Instagram para integração de conteúdo

## Instalação e Uso

1. Clone este repositório:
   ```
   git clone https://github.com/seu-usuario/falando-de-gti-frontend.git
   ```

2. Navegue até a pasta do projeto:
   ```
   cd falando-de-gti-frontend
   ```

3. Abra o arquivo `index.html` em seu navegador ou utilize um servidor local.

## Configuração

Para personalizar a landing page, edite o arquivo `scripts/config.js`:

- **Redes Sociais**: Altere os links para as redes sociais do canal
- **Vídeos**: Substitua os IDs de vídeos do YouTube pelos IDs reais dos vídeos do canal
- **Instagram**: Configure o token de acesso da API do Instagram para exibir o último post
- **Animações**: Ajuste os valores máximos do velocímetro e do contador de potência

### Configuração da API do Instagram

Para integrar sua conta do Instagram:

1. Crie uma conta de desenvolvedor do Facebook
2. Configure um aplicativo no Facebook Developer Portal
3. Gere um token de acesso para o Instagram
4. Adicione o token gerado ao arquivo `config.js`

## Responsividade

O layout foi projetado para funcionar em todos os tamanhos de tela, desde dispositivos móveis até desktops grandes. Os breakpoints principais são:

- Mobile: até 576px
- Tablet: até 768px
- Desktop: até 992px
- Desktop grande: acima de 992px

## Recursos Adicionais

- Velocímetro que reage ao scroll, atingindo velocidade máxima no final da página
- Contador de "cavalos de potência" na seção Sobre
- Efeitos de parallax e transições entre as seções
- Menu responsivo para dispositivos móveis

## Desenvolvimento

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
