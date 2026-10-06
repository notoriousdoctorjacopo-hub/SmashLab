# SmashLab — sito marketing

React + Vite, Tailwind, GSAP + ScrollTrigger, Lenis, Framer Motion. Desktop-first (1440px).

## Avvio

```bash
npm install
npm run dev      # sviluppo
npm run build    # produzione in /dist
```

## Struttura

- `src/components/` sezioni: Hero, MenuRail (scroll orizzontale), BurgerModal (esplosione ingredienti), NeonWall (showpiece), Vibe, Footer, Cursor, Nav
- `src/art/` illustrazioni vettoriali: `layers.jsx` (ingredienti), `BurgerArt.jsx` (impilamento + esplosione), `Posters.jsx` (procione, ragazza, toro), `Cutouts.jsx` (patatine, cheddar, onion ring, lattina, salvietta, logo)
- `src/data/menu.js` ricette, prezzi e testi: si modifica tutto da qui
- `public/media/` foto del locale ritoccate e `vibe.mp4` (12 s)

## Modificare un panino

Ogni ricetta in `menu.js` è una lista dal basso verso l'alto. Gli ingredienti disponibili sono le chiavi di `LAYERS` in `src/art/layers.jsx`; le salse accettano `color: 'smashlab' | 'bbq' | 'sriracha' | 'sesame' | 'mustard'`.
