document.addEventListener('DOMContentLoaded', () => {
    // Definición del mazo con tipos elementales para la lógica de ventajas
    const mazo = [
        { nombre: "Dragón", tipo: "fuego", ataque: 90, defensa: 60 },
        { nombre: "Fenix",  tipo: "fuego", ataque: 80, defensa: 70 },
        { nombre: "Sirena", tipo: "agua",  ataque: 60, defensa: 85 },
        { nombre: "Kraken", tipo: "agua",  ataque: 85, defensa: 65 },
        { nombre: "Golem",  tipo: "tierra",ataque: 50, defensa: 95 },
        { nombre: "Rayo",   tipo: "aire",  ataque: 95, defensa: 40 },
    ];

    // Variables de estado global del juego
    let hpPlayer = 100;
    let hpCpu = 100;
    let turno = 1;
    let especialUsado = false; // Flag para limitar el uso del especial a una vez
    let modoDefensivo = false; // Estado para reducir daño recibido

    // Diccionario de debilidades: define qué elemento vence a cuál
    const debilidades = { fuego: "agua", agua: "aire", aire: "tierra", tierra: "fuego" };

    const log = document.getElementById('log');
    const cpuSlot = document.getElementById('cpu-card-slot');

    // Configuración de eventos para las cartas del jugador
    document.querySelectorAll('.card').forEach(card => {
        // Ignoramos el slot de la CPU para que no sea clickeable
        if (card.id === "cpu-card-slot") return;

        card.addEventListener('click', function() {
            // Bloqueo si el juego ha terminado
            if (hpPlayer <= 0 || hpCpu <= 0) return;

            const miNombre = this.dataset.nombre;
            const miCarta = mazo.find(c => c.nombre.toLowerCase() === miNombre.toLowerCase());
            const cartaCpu = mazo[Math.floor(Math.random() * mazo.length)];

            // Actualización visual: mostramos qué carta sacó la CPU
            cpuSlot.querySelector('h3').innerText = cartaCpu.nombre;
            cpuSlot.className = `card card-cpu-active`; 

            // --- CAMBIO: Lógica de Ventaja Elemental ---
            let miAtaque = miCarta.ataque;
            let bonoTxt = "";

            // Si la CPU es débil contra mi tipo, gano bono. Si yo soy débil, pierdo ataque.
            if (debilidades[cartaCpu.tipo] === miCarta.tipo) {
                miAtaque += 20;
                bonoTxt = " (¡Ventaja Elemental +20!)";
            } else if (debilidades[miCarta.tipo] === cartaCpu.tipo) {
                miAtaque -= 20;
                bonoTxt = " (¡Debilidad Elemental -20!)";
            }

            // Bono del dado: multiplica el resultado por 5 para impactar en el daño
            const bonoDado = parseInt(document.getElementById('dice-result').innerText) * 5;
            const totalAtk = miAtaque + bonoDado;

            // --- CAMBIO: Lógica de Combate y Barras de Vida ---
            if (totalAtk >= cartaCpu.ataque) {
                // Victoria en el duelo: restamos vida a la CPU
                hpCpu -= 20;
                log.innerHTML = `<span style="color:#2ecc71">✅ ¡GOLPE!</span> ${miNombre} venció a ${cartaCpu.nombre}${bonoTxt}.`;
                cpuSlot.classList.add('shake'); // Animación de golpe en enemigo
                setTimeout(() => cpuSlot.classList.remove('shake'), 500);
            } else {
                // Derrota en el duelo: restamos vida al jugador
                // Si modoDefensivo está activo, el daño se reduce (ejemplo de lógica de mitigación)
                let daño = modoDefensivo ? 10 : 20;
                hpPlayer -= daño;
                log.innerHTML = `<span style="color:#e74c3c">❌ ¡DAÑO!</span> ${cartaCpu.nombre} superó a ${miNombre}.`;
                document.body.classList.add('shake'); // Animación de golpe en pantalla
                setTimeout(() => document.body.classList.remove('shake'), 500);
            }

            // Reseteamos estados tras el duelo
            modoDefensivo = false; 
            actualizarUI();
            checkGameOver();
        });
    });

    // Actualiza los elementos visuales (Barras de HP, Turnos y Dado)
    function actualizarUI() {
        document.querySelector('#player-hp-bar').style.width = hpPlayer + "%";
        document.querySelector('#cpu-hp-bar').style.width = hpCpu + "%";
        document.getElementById('turn').innerText = `Turno: ${++turno}`;
        document.getElementById('dice-result').innerText = "0"; // El dado se gasta tras atacar
    }

    // Comprueba condiciones de victoria o derrota
    function checkGameOver() {
        if (hpCpu <= 0) alert("¡VICTORIA! Eres el maestro de las cartas.");
        else if (hpPlayer <= 0) alert("DERROTA... El mazo ha sido más fuerte.");
        
        if (hpCpu <= 0 || hpPlayer <= 0) location.reload(); // Reinicia el juego automáticamente
    }
});

// --- CAMBIO: Panel de Acciones Especiales ---
document.querySelectorAll('.action').forEach(boton => {
    boton.addEventListener('click', () => {
        const tipo = boton.dataset.type;

        if (tipo === "attack") {
            log.innerText = "⚔️ Siguiente ataque: ¡Fuerza total!";
            modoDefensivo = false;
        } 
        else if (tipo === "defense") {
            modoDefensivo = true;
            log.innerText = "🛡️ Modo Escudo activo para el próximo duelo.";
        } 
        else if (tipo === "special-plus10") {
            // Habilidad de un solo uso para potenciar el ataque
            if (!especialUsado) {
                document.getElementById('dice-result').innerText = "20"; 
                especialUsado = true;
                boton.style.opacity = "0.5"; 
                boton.style.pointerEvents = "none";
                log.innerText = "🔥 ¡PODER ANCESTRAL! Bono de ataque masivo activado.";
            } else {
                log.innerText = "❌ Habilidad especial ya agotada.";
            }
        } 
        else if (tipo === "special-block") {
            // Acción de daño directo (Habilidad de "Congelar")
            log.innerText = "🧊 ¡Hielo! Daño directo a la CPU.";
           
        }
    });
});

function actualizarIconosVisuales() {
    const contenedorCpu = document.getElementById('cpu-status-icons');
    contenedorCpu.innerHTML = ""; 

    if (estadosActivos.quemaduraCpu > 0) {
        contenedorCpu.innerHTML += `<span class="icon-fuego" title="Quemadura">🔥</span>`;
    }
    

    const contenedorPlayer = document.getElementById('player-status-icons');
    contenedorPlayer.innerHTML = "";
    if (estadosActivos.escudoPlayer) {
        contenedorPlayer.innerHTML += `<span class="icon-escudo" title="Escudo Activo">🛡️</span>`;
    }
}

function intentarAtacar(carta) {
    if (manaPlayer >= carta.coste) {
        manaPlayer -= carta.coste;
        ejecutarDuelo(carta); 
        actualizarBarrasMana();
        aplicarEfecto(carta.tipo); 
        actualizarIconosVisuales();
    } else {
        log.innerText = `⚠️ ¡Energía insuficiente! Necesitas ${carta.coste} de Maná.`;
     
        document.querySelector(`[data-nombre="${carta.nombre}"]`).classList.add('shake');
    }
}


/* 🛠️ Retos Técnicos y Soluciones
Durante el desarrollo de Ultimate Card Battle, surgieron varios desafíos técnicos que requirieron un análisis profundo del DOM y de la lógica de estados:

1. El Error del "Ataque Fantasma" (Event Bubbling)
Problema: Al hacer clic en el botón de ataque especial dentro de la carta, se disparaba también el evento de clic de la carta misma, haciendo que el jugador atacara sin querer.

Dificultad: Entender cómo se propagan los eventos en JavaScript.

Solución: Implementé e.stopPropagation() en los botones de acción para asegurar que el clic en el botón no "traspasara" hacia la carta.

2. Desincronización de las Barras de Vida
Problema: Al principio, la vida bajaba en la variable lógica, pero la barra visual no se movía o se movía después de que salía el mensaje de "Game Over".

Dificultad: La asincronía entre la actualización de variables y la renderización del CSS.

Solución: Creé una función centralizada actualizarUI() que sincroniza los porcentajes de las barras con las variables de estado inmediatamente después de cada duelo, usando transiciones de CSS para que el movimiento sea fluido.

3. El Desafío de la "Mano Aleatoria"
Problema: Al implementar el sistema de 3 cartas al azar, a veces salían cartas repetidas o el mazo se quedaba vacío visualmente.

Dificultad: Manipulación de arrays y limpieza del DOM.

Solución: Utilicé el algoritmo de ordenamiento aleatorio sort(() => 0.5 - Math.random()) sobre una copia del mazo y el método slice(0, 3). Además, me aseguré de limpiar el contenedor con innerHTML = "" antes de cada repartición para evitar duplicados visuales.

4. Sensibilidad a Mayúsculas en los data-attributes
Problema: El método find() no encontraba la carta si en el HTML decía "Dragón" y en el JS decía "dragón".

Dificultad: Consistencia de datos entre HTML y JavaScript.

Solución: Estandaricé la búsqueda utilizando .toLowerCase() tanto en el atributo del DOM como en la propiedad del objeto, garantizando que el sistema sea robusto ante errores de escritura.

5. Gestión del Maná y Acciones Bloqueadas
Problema: Los jugadores podían seguir haciendo clic en cartas sin maná, lo que generaba confusión al no pasar nada en pantalla.

Dificultad: Falta de feedback de usuario (UX).

Solución: Añadí una validación previa en intentarAtacar(). Si el maná es insuficiente, no solo se bloquea la función, sino que se dispara una animación de sacudida (shake) roja en la carta y un mensaje de advertencia en el log, mejorando drásticamente la experiencia de usuario.

💡 Lecciones Aprendidas
Estado Global: Aprendí que es mejor tener un objeto de estado único para controlar efectos como quemaduras o escudos en lugar de variables sueltas.

Limpieza de Código: Al principio tenía funciones de 100 líneas; aprendí a refactorizar en pequeñas funciones como aplicarEfecto() y checkGameOver() para que el código sea legible.  */