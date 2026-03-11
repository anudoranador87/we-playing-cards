const mazo = [
  { nombre: "Dragón",   tipo: "fuego",  ataque: 95, defensa: 40 },
  { nombre: "Sirena",   tipo: "agua",   ataque: 60, defensa: 80 },
  { nombre: "Fénix",    tipo: "fuego",  ataque: 85, defensa: 50 },
  { nombre: "Golem",    tipo: "tierra", ataque: 50, defensa: 95 },
  { nombre: "Rayo",     tipo: "aire",   ataque: 75, defensa: 35 },
  { nombre: "Kraken",   tipo: "agua",   ataque: 70, defensa: 75 },
];

const cartas = document.querySelectorAll('.card');

cartas.forEach((carta) => {
  carta.addEventListener('click', function() {
    
   
    const span = this.querySelector('.counter');
    let nivel = parseInt(span.innerText);
    span.innerText = nivel + 1;
    if(nivel + 1 === 11){ span.innerText = 0 }
    if(nivel + 1 == 10){ this.classList.add('card-legendary') }
    else { this.classList.remove('card-legendary') }

  
    const nombreElegido = this.dataset.nombre;
    const cartaJugador  = mazo.find(function(b){ return b.nombre === nombreElegido });
    const cartaMaquina  = mazo[Math.floor(Math.random() * mazo.length)];

    if(cartaJugador.ataque > cartaMaquina.ataque) {
      console.log(`${nombreElegido} (${cartaJugador.ataque}) vs ${cartaMaquina.nombre} (${cartaMaquina.ataque}) → ¡Gana ${nombreElegido}!`)
    } else {
      console.log(`¡Gana la máquina con ${cartaMaquina.nombre}!`)
    }

  });
});