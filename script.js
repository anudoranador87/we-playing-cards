
console.log("Archivo JS cargado correctamente");

const cartas = document.querySelectorAll('.card');

cartas.forEach((carta) => {
    carta.addEventListener('click', function() {
        const span = this.querySelector('.counter');
        let nivel = parseInt(span.innerText);
        span.innerText = nivel + 1;
     
        
       
        console.log("Has subido de nivel una carta!");
        if(nivel + 1 === 11){
         span.innerText = 0}
        
        if(nivel + 1 == 10){
             this.classList.add('card-legendary') }
         else{this.classList.remove('card-legendary')}
        


    });
});