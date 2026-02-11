# Portfolio Pessoal

Portfolio minimalista com hero animado de network graph e interface bilíngue.

## Features

- **Network Graph Hero** - Visualização interativa de partículas conectadas
- **Bilíngue** - Português/Inglês com troca suave
- **Performance** - Fontes locais, sem dependências externas pesadas
- **Responsivo** - Design adaptativo para mobile e desktop
- **Categorização** - Projetos organizados em Software e Pesquisa
- **Animações** - Transições suaves com CSS animations

## Stack

- HTML5 / CSS3 / JavaScript Vanilla
- [Particles.js](https://github.com/VincentGarreau/particles.js/) - Network graph
- Font Awesome - Ícones
- Fontes: Space Mono + Sora (hospedadas localmente)

## Estrutura

```
portfolio/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   ├── fonts.css       # @font-face rules
│   │   ├── hero-graph.css  # Estilos do hero
│   │   └── main.css        # Estilos globais
│   ├── js/
│   │   ├── main.js         # Inicialização
│   │   ├── selectors.js    # Seletores de idioma/tabs
│   │   └── particles.min.js
│   └── fonts/              # Fontes locais (woff2)
```

## Uso Local

Simplesmente abra o `index.html` em um navegador ou use um servidor local:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (http-server)
npx http-server
```

Acesse: `http://localhost:8000`

## Customização

### Cores
Edite as variáveis de cor em `assets/css/main.css` e `hero-graph.css`:
- `#0a0a0f` - Background
- `#64ffda` - Accent (cyan)
- `#8a8a9a` - Text secondary

### Conteúdo
- **Textos bilíngues**: Use atributos `lang="pt"` e `lang="en"` nas tags
- **Projetos**: Edite as seções com classe `.project-card` em `index.html`
- **Network graph**: Configure em `particles.js` inicialização

### Fontes
Fontes estão em `assets/fonts/` e definidas em `assets/css/fonts.css`.
Para trocar fontes, substitua os arquivos `.woff2` e atualize os `@font-face`.

## Performance

- Fontes locais (~9.6KB total em woff2)
- Sem dependências CDN (exceto Font Awesome)

## Créditos

Inspirado em:
- [Particle Jekyll Theme](https://github.com/nrandecker/particle) (original)
- [Particles.js](https://github.com/VincentGarreau/particles.js/) - Vincent Garreau
