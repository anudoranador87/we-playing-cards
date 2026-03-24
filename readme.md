# 🎴 Ultimate Card Battle – freeCodeCamp Portfolio Project

![Project Banner](previewcards.png)

Welcome to the **Ultimate Card Battle**, an interactive strategic game built as the evolution of a **Responsive Web Design** certification project from [freeCodeCamp](https://www.freecodecamp.org/). 

> "Every card tells a story, every line of code builds the deck, and every turn defines the master." 

This project has evolved from a static CSS layout into a **fully functional turn-based strategy game**, featuring **Elemental Weaknesses, AI Turn Logic, and Real-time Health Bars**.

---

## 🚀 Project Vision

- **Interactive Strategy:** Transition from a simple display to a deep battle system.
- **Advanced CSS Mastery:** Implementation of 3D transforms, custom animations (`shake`, `glow`), and responsive layouts.
- **Complex JS Logic:** Managing game states, turn-based flows (`setTimeout`), and elemental damage multipliers.
- **UX-First Design:** Clear visual feedback via health bars and a dynamic battle log.

---

## 🛠️ Tech Stack

| 🖥️ Technology | 🔧 Purpose |
|---------------|------------|
| **HTML5** | Semantic structure, accessibility, and Data-Attributes |
| **CSS3** | Flexbox, 3D Transforms, Keyframe Animations, Progress Bars |
| **JavaScript**| Game Engine: State management, AI logic, DOM manipulation |
| **Git/GitHub** | Version control and documentation |

---

## 🎨 Key Features

- **⚔️ Turn-Based Combat:** Real flow between Player 👤 and Machine 🤖.
- **🔥 Elemental System:** Fuego > Tierra > Aire > Agua > Fuego. Damage scales based on type advantage (+20/-20).
- **💖 Dynamic Health Bars:** Real-time HP tracking for both contenders.
- **🎲 Dice & Bonus System:** Random luck factor that modifies attack power each turn.
- **🛡️ Action Panel:** Tactical choices:
    - **Attack:** Standard strike.
    - **Defense:** Half-damage mode for the next hit.
    - **Special:** One-time massive power boost (+20).
- **🤖 Machine Intelligence:** Simulated "thinking" time and automated response logic.
- **✨ Visual Polish:** Screen shake on damage and glowing legendary status at Level 10.

---

## ⚔️ Battle Engine — How It Works

The core logic uses a comparison system that calculates damage dynamically based on the HTML `data-nombre` attribute:

```javascript
// Example of Elemental Calculation
if (debilidades[cartaCpu.tipo] === miCarta.tipo) {
    miAtaque += 20; // Advantage!
}

// Total Power = Base Attack + (Dice * 5) + Elemental Bonus
const totalAtk = miAtaque + bonoDado;