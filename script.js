document.addEventListener('DOMContentLoaded', () => {
    // --- ESTADO GLOBAL DEL JUEGO ---
    // Agrupamos todas las variables en un único objeto para facilitar la gestión
    const estadoJuego = {
        hpJugador: 100,
        hpCpu: 100,
        manaJugador: 100,
        turno: 1,
        especialUsado: false,
        modoDefensivo: false,
        dados: 0,
        estaBloqueado: false // Para la futura lógica de congelación
    };

    // Definición del mazo con tipos elementales
    const mazo = [
        { nombre: "Dragón", tipo: "fuego", ataque: 90, defensa: 60, coste: 20 },
        { nombre: "Fenix",  tipo: "fuego", ataque: 80, defensa: 70, coste: 15 },
        { nombre: "Sirena", tipo: "agua",  ataque: 60, defensa: 85, coste: 15 },
        { nombre: "Kraken", tipo: "agua",  ataque: 85, defensa: 65, coste: 25 },
        { nombre: "Golem",  tipo: "tierra",ataque: 50, defensa: 95, coste: 10 },
        { nombre: "Rayo",   tipo: "aire",  ataque: 95, defensa: 40, coste: 30 },
    ];

    // Diccionario de debilidades: define qué elemento vence a cuál
    const debilidades = { fuego: "agua", agua: "aire", aire: "tierra", tierra: "fuego" };

    // Elementos del DOM
    const log = document.getElementById('log');
    const cpuSlot = document.getElementById('cpu-card-slot');
    const dadoResultado = document.getElementById('dice-result');

    // --- FUNCIONES DE ACTUALIZACIÓN DE UI ---
    function actualizarUI() {
        // Barras de Vida
        const barraVidaPlayer = document.querySelector('#player-hp-bar-visual');
        const barraVidaCpu = document.querySelector('#cpu-hp-bar-visual');
        if (barraVidaPlayer) barraVidaPlayer.style.width = estadoJuego.hpJugador + "%";
        if (barraVidaCpu) barraVidaCpu.style.width = estadoJuego.hpCpu + "%";

        // Barra de Maná
        const barraMana = document.querySelector('#player-mana-bar');
        if (barraMana) barraMana.style.width = estadoJuego.manaJugador + "%";

        // Textos de estado
        document.getElementById('turn').innerText = `Turno: ${estadoJuego.turno}`;
        dadoResultado.innerText = estadoJuego.dados;
    }

    // --- LÓGICA DE COMBATE ---
    function ejecutarDuelo(miCarta) {
        if (estadoJuego.hpJugador <= 0 || estadoJuego.hpCpu <= 0) return;

        const cartaCpu = mazo[Math.floor(Math.random() * mazo.length)];

        // Mostrar carta CPU
        cpuSlot.querySelector('h3').innerText = cartaCpu.nombre;
        cpuSlot.className = `card card-cpu-active`;

        let miAtaque = miCarta.ataque;
        let bonoTxt = "";

        // Ventaja Elemental
        if (debilidades[cartaCpu.tipo] === miCarta.tipo) {
            miAtaque += 20;
            bonoTxt = " (¡Ventaja Elemental +20!)";
        } else if (debilidades[miCarta.tipo] === cartaCpu.tipo) {
            miAtaque -= 20;
            bonoTxt = " (¡Debilidad Elemental -20!)";
        }

        const bonoDado = estadoJuego.dados * 5;
        const totalAtk = miAtaque + bonoDado;

        if (totalAtk >= cartaCpu.ataque) {
            estadoJuego.hpCpu -= 20;
            log.innerHTML = `<span style="color:#2ecc71">✅ ¡GOLPE!</span> ${miCarta.nombre} venció a ${cartaCpu.nombre}${bonoTxt}.`;
            cpuSlot.classList.add('shake');
            setTimeout(() => cpuSlot.classList.remove('shake'), 500);
        } else {
            let daño = estadoJuego.modoDefensivo ? 10 : 20;
            estadoJuego.hpJugador -= daño;
            log.innerHTML = `<span style="color:#e74c3c">❌ ¡DAÑO!</span> ${cartaCpu.nombre} superó a ${miCarta.nombre}.`;
            document.body.classList.add('shake');
            setTimeout(() => document.body.classList.remove('shake'), 500);
        }

        // Reset de estados tras el duelo
        estadoJuego.modoDefensivo = false;
        estadoJuego.dados = 0;
        estadoJuego.turno++;
        
        actualizarUI();
        checkGameOver();
    }

    function checkGameOver() {
        if (estadoJuego.hpCpu <= 0) {
            alert("¡VICTORIA! Eres el maestro de las cartas.");
            location.reload();
        } else if (estadoJuego.hpJugador <= 0) {
            alert("DERROTA... El mazo ha sido más fuerte.");
            location.reload();
        }
    }

    // --- EVENTOS ---
    // Clic en cartas del jugador
    document.querySelectorAll('.card').forEach(card => {
        if (card.id === "cpu-card-slot") return;

        card.addEventListener('click', function() {
            const nombreCarta = this.dataset.nombre;
            const miCarta = mazo.find(c => c.nombre.toLowerCase() === nombreCarta.toLowerCase());
            
            if (estadoJuego.manaJugador >= miCarta.coste) {
                estadoJuego.manaJugador -= miCarta.coste;
                ejecutarDuelo(miCarta);
            } else {
                log.innerText = `⚠️ ¡Energía insuficiente! Necesitas ${miCarta.coste} de Maná.`;
                this.classList.add('shake');
                setTimeout(() => this.classList.remove('shake'), 500);
            }
        });
    });

    // Panel de acciones
    document.querySelectorAll('.action').forEach(boton => {
        boton.addEventListener('click', () => {
            const tipo = boton.dataset.type;

            if (tipo === "attack") {
                log.innerText = "⚔️ Siguiente ataque: ¡Fuerza total!";
                estadoJuego.modoDefensivo = false;
            } 
            else if (tipo === "defense") {
                estadoJuego.modoDefensivo = true;
                log.innerText = "🛡️ Modo Escudo activo para el próximo duelo.";
            } 
            else if (tipo === "special-plus10") {
                if (!estadoJuego.especialUsado) {
                    estadoJuego.dados = 4; // Equivalente a un buen tiro de dado
                    estadoJuego.especialUsado = true;
                    boton.style.opacity = "0.5"; 
                    boton.style.pointerEvents = "none";
                    log.innerText = "🔥 ¡PODER ANCESTRAL! Bono de ataque activado.";
                    actualizarUI();
                } else {
                    log.innerText = "❌ Habilidad especial ya agotada.";
                }
            }
        });
    });

    // Botón del Dado
    const botonDado = document.getElementById('roll-dice');
    if (botonDado) {
        botonDado.addEventListener('click', () => {
            estadoJuego.dados = Math.floor(Math.random() * 6) + 1;
            log.innerText = `🎲 Has sacado un ${estadoJuego.dados}. ¡Úsalo en tu próximo ataque!`;
            actualizarUI();
        });
    }

    // Inicialización
    actualizarUI();
});
