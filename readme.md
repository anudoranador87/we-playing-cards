# 🃏 We Playing Cards

🇪🇸 [Español](#español) · 🇬🇧 [English](#english)

![Status](https://img.shields.io/badge/estado-completado-green) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow) ![Vanilla](https://img.shields.io/badge/sin%20frameworks-vanilla%20JS-blue)

🌐 **[Jugar en vivo / Play live](https://anudoranador87.github.io/we-playing-cards/)**

---

## Español

### Qué es esto

Juego de cartas estratégico por turnos construido en JavaScript vanilla. Sin frameworks, sin librerías de juegos, sin canvas. Solo DOM, eventos y lógica de estado.

Fue el primer proyecto donde conecté datos con el DOM de forma real — una carta en el HTML disparando lógica en JS contra un objeto del mazo. El momento en que `dataset`, `find()` y `Math.random()` dejaron de ser teoría.

---

### Cómo jugar

```bash
git clone https://github.com/anudoranador87/we-playing-cards.git
cd we-playing-cards
open index.html
```

Sin npm. Sin dependencias. Abre en el navegador directamente.

---

### Mecánicas del juego

**Mazo** — 6 cartas con tipos elementales: fuego, agua, tierra, aire. Cada carta tiene ataque, defensa y coste de maná.

**Sistema elemental** — las cartas tienen ventajas y debilidades entre sí:

| Elemento | Vence a | Pierde contra |
|---|---|---|
| Fuego | Tierra | Agua |
| Agua | Fuego | Aire |
| Aire | Agua | Tierra |
| Tierra | Aire | Fuego |

**Ventaja elemental:** +20 de ataque. **Debilidad elemental:** −20 de ataque.

**Maná** — cada carta tiene un coste. Sin maná suficiente, no puedes jugarla.

**Dado de bono** — tira el dado antes de atacar. Cada punto vale ×5 de ataque extra.

**Modo defensa** — activa el escudo antes del duelo para reducir el daño recibido a la mitad.

**Habilidad especial** — uso único por partida. Activa un bono de ataque fijo.

---

### Qué hay dentro

```
we-playing-cards/
├── index.html    # Estructura del juego — cartas, paneles, barras de estado
├── style.css     # Estilos con animaciones shake y transiciones
└── script.js     # Toda la lógica del juego
```

---

### Arquitectura del código

**Estado centralizado en un objeto.**  
Toda la información del juego vive en `estadoJuego`. No hay variables sueltas. Cualquier función lee y escribe del mismo sitio.

```javascript
const estadoJuego = {
    hpJugador: 100,
    hpCpu: 100,
    manaJugador: 100,
    turno: 1,
    especialUsado: false,
    modoDefensivo: false,
    dados: 0,
    estaBloqueado: false
};
```

**`data-nombre` como puente HTML → JS.**  
Cada carta en el HTML tiene un atributo `data-nombre`. Al hacer clic, `dataset.nombre` recupera ese valor y `find()` lo busca en el array del mazo. El DOM no contiene lógica — solo referencias.

```javascript
const nombreCarta = this.dataset.nombre;
const miCarta = mazo.find(c => c.nombre.toLowerCase() === nombreCarta.toLowerCase());
```

**Ventaja elemental con diccionario de debilidades.**  
En lugar de un bloque de condicionales anidados, un objeto simple define las relaciones entre elementos. Una sola consulta determina ventaja o desventaja.

```javascript
const debilidades = { fuego: "agua", agua: "aire", aire: "tierra", tierra: "fuego" };

if (debilidades[cartaCpu.tipo] === miCarta.tipo) {
    miAtaque += 20; // ventaja elemental
} else if (debilidades[miCarta.tipo] === cartaCpu.tipo) {
    miAtaque -= 20; // debilidad elemental
}
```

**`actualizarUI()` como única fuente de verdad visual.**  
Todas las funciones modifican `estadoJuego` y llaman a `actualizarUI()` al final. Las barras de HP, maná y el contador de turno nunca se actualizan directamente — siempre a través de esta función.

**Feedback visual con `classList` + `setTimeout`.**  
Las animaciones de impacto (`shake`) se añaden y eliminan con un timeout. Sin librerías de animación.

```javascript
cpuSlot.classList.add('shake');
setTimeout(() => cpuSlot.classList.remove('shake'), 500);
```

---

### Decisiones técnicas

**Estado global en un objeto, no en variables sueltas.** Facilita el reset entre turnos y hace el flujo predecible: cualquier bug de estado tiene un solo sitio donde buscar.

**Diccionario de debilidades en lugar de switch/if encadenados.** Más limpio, más escalable. Añadir un nuevo elemento es una línea, no un bloque.

**`find()` sobre el mazo en lugar de índices.** Las cartas se identifican por nombre, no por posición. El orden del array puede cambiar sin romper nada.

**Sin canvas, sin librerías de juegos.** Decisión pedagógica: entender manipulación del DOM y gestión de estado antes de abstracciones.

---

### Stack

`HTML5` · `CSS3 (animaciones, Flexbox)` · `JavaScript ES6+ (ES Modules, DOM API)` · `GitHub Pages`

---

### Autor

Jose Aparicio — Frontend developer en transición desde hostelería.

📧 josemaparicio87@gmail.com · [LinkedIn](https://www.linkedin.com/in/joseaparicio87/) · [GitHub](https://github.com/anudoranador87) · [Dev Log 365](https://anudoranador87.github.io/Mi-Camino-Web-365/)

---

## English

### What this is

A turn-based strategic card game built in vanilla JavaScript. No frameworks, no game libraries, no canvas. Just DOM, events and state management.

This was the first project where I connected data to the DOM for real — a card in the HTML firing logic in JS against an object in the deck array. The moment `dataset`, `find()` and `Math.random()` stopped being theory.

---

### How to play

```bash
git clone https://github.com/anudoranador87/we-playing-cards.git
cd we-playing-cards
open index.html
```

No npm. No dependencies. Opens directly in the browser.

---

### Game mechanics

**Deck** — 6 cards with elemental types: fire, water, earth, air. Each card has attack, defence and mana cost.

**Elemental system** — cards have advantages and weaknesses against each other:

| Element | Beats | Loses to |
|---|---|---|
| Fire | Earth | Water |
| Water | Fire | Air |
| Air | Water | Earth |
| Earth | Air | Fire |

**Elemental advantage:** +20 attack. **Elemental weakness:** −20 attack.

**Mana** — each card has a cost. Without enough mana, you can't play it.

**Bonus dice** — roll before attacking. Each point is worth ×5 extra attack.

**Defence mode** — activate the shield before a duel to halve incoming damage.

**Special ability** — single use per game. Activates a fixed attack bonus.

---

### What's inside

```
we-playing-cards/
├── index.html    # Game structure — cards, panels, status bars
├── style.css     # Styles with shake animations and transitions
└── script.js     # All game logic
```

---

### Code architecture

**State centralised in one object.**  
All game information lives in `estadoJuego`. No loose variables. Every function reads and writes from the same place.

```javascript
const estadoJuego = {
    hpJugador: 100,
    hpCpu: 100,
    manaJugador: 100,
    turno: 1,
    especialUsado: false,
    modoDefensivo: false,
    dados: 0,
    estaBloqueado: false
};
```

**`data-nombre` as the HTML → JS bridge.**  
Each card in the HTML has a `data-nombre` attribute. On click, `dataset.nombre` retrieves it and `find()` looks it up in the deck array. The DOM holds no logic — only references.

```javascript
const nombreCarta = this.dataset.nombre;
const miCarta = mazo.find(c => c.nombre.toLowerCase() === nombreCarta.toLowerCase());
```

**Elemental advantage via weakness dictionary.**  
Instead of nested conditionals, a simple object defines the relationships between elements. One lookup determines advantage or disadvantage.

```javascript
const debilidades = { fuego: "agua", agua: "aire", aire: "tierra", tierra: "fuego" };

if (debilidades[cartaCpu.tipo] === miCarta.tipo) {
    miAtaque += 20; // elemental advantage
} else if (debilidades[miCarta.tipo] === cartaCpu.tipo) {
    miAtaque -= 20; // elemental weakness
}
```

**`actualizarUI()` as the single source of visual truth.**  
All functions modify `estadoJuego` and call `actualizarUI()` at the end. HP bars, mana and turn counter are never updated directly — always through this function.

**Visual feedback with `classList` + `setTimeout`.**  
Impact animations (`shake`) are added and removed with a timeout. No animation libraries.

```javascript
cpuSlot.classList.add('shake');
setTimeout(() => cpuSlot.classList.remove('shake'), 500);
```

---

### Technical decisions

**Global state in one object, not loose variables.** Makes turn resets straightforward and keeps the flow predictable: any state bug has one place to look.

**Weakness dictionary instead of chained switch/if.** Cleaner, more scalable. Adding a new element is one line, not a block.

**`find()` over the deck instead of indices.** Cards are identified by name, not position. The array order can change without breaking anything.

**No canvas, no game libraries.** Pedagogical decision: understand DOM manipulation and state management before abstractions.

---

### Stack

`HTML5` · `CSS3 (animations, Flexbox)` · `JavaScript ES6+ (DOM API)` · `GitHub Pages`

---

### Author

Jose Aparicio — Frontend developer transitioning from hospitality.

📧 josemaparicio87@gmail.com · [LinkedIn](https://www.linkedin.com/in/joseaparicio87/) · [GitHub](https://github.com/anudoranador87) · [Dev Log 365](https://anudoranador87.github.io/Mi-Camino-Web-365/)
