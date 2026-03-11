# 🎴 Playing Cards Page – freeCodeCamp Certification

![Project Banner](previewcards.png)

Welcome to my **Playing Cards Page**, a project built as part of the **Responsive Web Design** certification from [freeCodeCamp](https://www.freecodecamp.org/).  

> "Every card tells a story, every line of code builds the deck."  

This project transforms a classic lab exercise into a **polished, interactive, and visually engaging portfolio piece**, showcasing **semantic HTML, advanced CSS (Flexbox & 3D transforms), and preparation for dynamic JavaScript interactivity**.  

---

## 🚀 Project Vision

- Build a **responsive playing cards interface** that is both functional and visually striking.  
- Apply **Flexbox layouts, alignment, and spacing mastery** to create a clean and readable card arrangement.  
- Enhance **UX & accessibility**, ensuring semantic structure and smooth interaction.  
- Lay the groundwork for a **dynamic card game** with future JavaScript features.  

> "From a static deck to a live game — code as craftsmanship."  

---

## 🛠️ Tech Stack

| 🖥️ Technology | 🔧 Purpose |
|---------------|------------|
| **HTML5**     | Semantic structure, accessibility, clean markup |
| **CSS3 (Flexbox)** | Layout, spacing, alignment, hover effects, 3D transforms |
| **JavaScript** | Battle logic, DOM manipulation, event listeners, data attributes |
| **Git/GitHub** | Version control and progress tracking |

---

## 🎨 Key Features

- **Flexbox Mastery:** Align cards in rows and columns with precise spacing.  
- **Semantic Markup:** Proper `<section>`, `<article>`, `<ul>` hierarchy for clarity & accessibility.  
- **Interactive Battle System:** Click any card to trigger a real battle against the machine — powered by `find()`, `Math.random()` and `if/else` logic.
- **Level System:** Each card tracks its own level on click — resets at 11, unlocks legendary status at level 10.
- **data-attributes bridge:** HTML cards connected to JS objects via `data-nombre` — clean separation of structure and logic.
- **Responsive Layout:** Optimized for mobile, tablet, and desktop.  
- **Visual Polish:** Drop-shadows, gradients, and subtle 3D effects for a "board game" feel.  

---

## ⚔️ Battle System — How It Works

Each card in the HTML is connected to a full stats object in JavaScript via `data-nombre`:

```html
<div class="card" data-nombre="Dragón">...</div>
```

```javascript
const mazo = [
  { nombre: "Dragón",   tipo: "fuego",  ataque: 95, defensa: 40 },
  { nombre: "Sirena",   tipo: "agua",   ataque: 60, defensa: 80 },
  { nombre: "Fénix",    tipo: "fuego",  ataque: 85, defensa: 50 },
  { nombre: "Golem",    tipo: "tierra", ataque: 50, defensa: 95 },
  { nombre: "Rayo",     tipo: "aire",   ataque: 75, defensa: 35 },
  { nombre: "Kraken",   tipo: "agua",   ataque: 70, defensa: 75 },
];
```

When a card is clicked:
1. **Player card** is found using `find()` — matching `data-nombre` to the deck object
2. **Machine card** is selected randomly using `Math.floor(Math.random() * mazo.length)`
3. **Attacks are compared** with `if/else`
4. **Result is logged** to the console:

```
Dragón (95) vs Rayo (75) → Dragón wins!
Machine wins with Fénix!
Sirena (60) vs Golem (50) → Sirena wins!
```

---

## 📈 Progress Tracker

| ✅ Task | Status |
|---------|--------|
| Initial repository setup & README | ✅ Complete |
| HTML skeleton & semantic structure | ✅ Complete |
| Flexbox layout for card container | ✅ Complete |
| Styling individual cards (L/M/R sections) | ✅ Complete |
| Alignment, spacing & visual hierarchy | ✅ Complete |
| CSS pseudo-elements & hover effects | ✅ Complete |
| JavaScript prep (hover animations) | ✅ Complete |
| Level system per card (click counter + legendary status) | ✅ Complete |
| Card data objects with stats (ataque, defensa, tipo) | ✅ Complete |
| data-attributes connecting HTML cards to JS objects | ✅ Complete |
| Battle system — player vs machine with real logic | ✅ Complete |
| Show battle result in HTML (not just console) | ⏳ Next |
| Full interactive card game | ⏳ In progress |

---

## 🗺️ Roadmap: Next Steps

### Phase 1 — Battle in the UI *(next)*
- Show battle result directly in the HTML using `innerText` — not just the console
- Display machine's card name and attack visually on screen

### Phase 2 — Shuffle & Hand
- Fisher-Yates shuffle algorithm
- Deal a hand of 3 cards from the full deck of 6
- Player picks from their hand, not the full deck

### Phase 3 — Full Combat Logic
- Compare `ataque`, `defensa` and `velocidad` stats — not just attack
- Calculate a winner score based on multiple attributes
- Track wins/losses per session

### Phase 4 — Machine Intelligence
- Basic AI: machine picks the card with the highest probability of winning
- Display AI decision reasoning in the UI

### Phase 5 — Polish
- Advanced animations — smooth card flip, battle reveal
- Accessibility enhancements — aria labels, keyboard navigation
- Responsive refinements — perfecting UX on all device sizes
- Portfolio polish — screenshots and GIF demos

---

## 💡 Design Philosophy

- **Structured Playfulness:** Cards are arranged for readability and visual fun.  
- **Scalable & Maintainable:** Clean CSS architecture for future growth.  
- **Portfolio-Ready:** Demonstrates **technical skills, problem-solving, and visual creativity**.  
- **Narrative-Driven:** Each update is a step in my learning journey, reflecting growth and discipline.  
- **Logic First:** The battle system was built with pure JS logic before any visual polish — because solid foundations beat flashy shortcuts.

> "Coding is like stacking cards: one well-placed element builds a solid foundation for the next."  

---

## 🖋️ Author

**Jose María Aparicio** – Aspiring Front-End Developer  

- Transforming years of **hospitality problem-solving into clean, interactive code**.  
- Passionate about **accessible, responsive, and visually rich web experiences**.  
- Always learning, always documenting — this project reflects **my journey from static labs to dynamic, portfolio-ready web projects**.  

📧 josemaparicio87@gmail.com · [LinkedIn](https://www.linkedin.com/in/joseaparicio87/) · [GitHub](https://github.com/anudoranador87)

---

## ⚡ Fun Stats

- Lines of HTML: 150+  
- Lines of CSS: 200+  
- Lines of JavaScript: 50+
- Cards in deck: 6 (prototype for full expansion)  
- Cards displayed: 3  
- Battle outcomes possible per click: 6 random matchups
- Hours of learning & coding invested: 20+  
- One goal: **Turn a lab exercise into a standout portfolio showcase!**  

---

## 📅 Changelog

| Date | Update |
|------|--------|
| 16/02/2026 | Initial setup — HTML skeleton, Flexbox layout, CSS styling |
| 11/03/2026 | JavaScript Phase 1 — level system, battle system, data-attributes, find(), Math.random() |

---

> "From static cards to interactive mastery — this is more than code. It's my journey."

*Created by Jose María Aparicio — 2026*