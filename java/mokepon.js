const sectionAtaques=document.getElementById("selección-de-ataque")
const botonesAtaque=document.getElementById("botonesAtaque")
const sectionReiniciar=document.getElementById("reiniciar")
const botonMascota = document.getElementById("botonMascota")
const botonReiniciar = document.getElementById("reiniciar")
const spanMascotaJugador = document.getElementById("mascotaJugador")
const sapnMascotaEnemiga = document.getElementById("mascotaEnemiga")
const sectionSeleccionMascota=document.getElementById("selección-de-mascota")
const botonCombate=document.getElementById("botonCombate")
const spanVictoriasJugador = document.getElementById("vidasJugador")
const spanVictoriasEnemigo = document.getElementById("vidasEnemigo")
const sectionMensajes = document.getElementById("resultado")
const ataqueDeJugador = document.getElementById("ataqueJugador")   
const ataqueDeEnemigo = document.getElementById("ataqueEnemigo") 
const tarjeta2 = document.getElementById("tarjeta2")
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let enemigoId 
let mokeponesEnemigos =[]
let jugadorId =null
let botonFuego 
let botonAgua 
let botonTierra 
let inputzukara 
let inputtirrano 
let inputmetax 
let inputozhin 
let inputbada 
let inputtoph 
let mokeponesIterados
let mascotaElejida
let miMascota
let seleccionAleatoria
let mascotaEnemiga
let ataques1
let ataqueMokeponEnemigo
let resultado
let victoriasEnemigo = 0
let victoriasJugador = 0
let indexJugador
let indexEnemigo
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground= new Image()
mapaBackground.src="./assets/mokemap.png"
let anchoMapa = window.innerWidth - 40
let alturaMapa 
const anchoMaximoMapa = 600
if (anchoMapa > anchoMaximoMapa){
    anchoMapa = anchoMaximoMapa
}
alturaMapa = anchoMapa * 600 / 800

mapa.width = anchoMapa
mapa.height = alturaMapa


let mokepones=[]
let botones=[] 
let ataqueJugador=[]
let ataqueEnemigo = []

class Mokepon{
    constructor(nombre, foto, vida, fotoMapa, id){
        this. id=id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 60
        this.alto = 60
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX =0
        this.velocidadY =0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        )
    }
}


let oshin = new Mokepon("Ozhin", "./assets/ozhin.png", 3, "./assets/avatarOshin.png" )
let bada = new Mokepon("Bada", "./assets/bada.png", 3, "./assets/avatarBada.png" )
let toph = new Mokepon("Toph", "./assets/toph.png", 3, "./assets/toph.png" )
let zukara = new Mokepon("Zukara", "./assets/zukara.png", 3, "./assets/zukara.png" )
let tirrano = new Mokepon("Tirrano", "./assets/tirrano.png", 3, "./assets/tirrano.png" )
let metax = new Mokepon("Metax", "./assets/metax.png", 3, "./assets/avatarMetax.png" )


const oshin_ataques = [
    {nombre: "Fuego", id: "botonFuego"},
    {nombre: "Fuego", id: "botonFuego"},
    {nombre: "Fuego", id: "botonFuego"},
    {nombre: "Agua", id: "botonAgua"},
    {nombre: "Tierra", id: "botonTierra"} 
]
const toph_ataques =[
    {nombre: "Agua", id: "botonAgua"},
    {nombre: "Agua", id: "botonAgua"},
    {nombre: "Agua", id: "botonAgua"},
    {nombre: "Fuego", id: "botonFuego"},
    {nombre: "Tierra", id: "botonTierra"}
]
const bada_ataques=[
    {nombre: "Tierra", id: "botonTierra"},
    {nombre: "Tierra", id: "botonTierra"},
    {nombre: "Tierra", id: "botonTierra"},
    {nombre: "Fuego", id: "botonFuego"},
    {nombre: "Agua", id: "botonAgua"}
]
const zukara_ataques=[
    {nombre: "Fuego", id: "botonFuego"},
    {nombre: "Fuego", id: "botonFuego"},
    {nombre: "Fuego", id: "botonFuego"},
    {nombre: "Tierra", id: "botonTierra"},
    {nombre: "Agua", id: "botonAgua"}
]
const metax_ataques=[
    {nombre: "Tierra", id: "botonTierra"},
    {nombre: "Tierra", id: "botonTierra"},
    {nombre: "Tierra", id: "botonTierra"},
    {nombre: "Fuego", id: "botonFuego"},
    {nombre: "Agua", id: "botonAgua"}
]
const tirrano_ataques=[
    {nombre: "Agua", id: "botonAgua"},
    {nombre: "Agua", id: "botonAgua"},
    {nombre: "Agua", id: "botonAgua"},
    {nombre: "Tierra", id: "botonTierra"},
    {nombre: "Fuego", id: "botonFuego"}
]

oshin.ataques.push(...oshin_ataques)
toph.ataques.push(...toph_ataques)
bada.ataques.push(...bada_ataques)
zukara.ataques.push(...zukara_ataques)
metax.ataques.push(...metax_ataques)
tirrano.ataques.push(...tirrano_ataques)


mokepones.push(zukara,tirrano,metax,oshin,bada,toph)

window.addEventListener("load",iniciarJuego)
function aleatorio(min,max) {return Math.floor(Math.random()*(max-min+1)+min)}
function iniciarJuego(){  
    mokepones.forEach((mokepon)=> {
        mokeponesIterados=`
        <input type="radio" name="mascotas" id=${mokepon.nombre} />
                <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}> 
                </label>`
            tarjeta2.innerHTML += mokeponesIterados
            
            inputzukara = document.getElementById("Zukara")            
            inputtirrano = document.getElementById("Tirrano")
            inputmetax = document.getElementById("Metax")
            inputozhin = document.getElementById("Ozhin")
            inputbada = document.getElementById("Bada")
            inputtoph = document.getElementById("Toph")
        })
    sectionVerMapa.style.display="none"
    sectionAtaques.style.display = "none"
    sectionReiniciar.style.display= "none"
    botonCombate.style.display="none"
    botonMascota.addEventListener("click", seleccionMascotaJugador)
    botonReiniciar.addEventListener("click", reiniciar)
    unirseAljuego()
}

function unirseAljuego(){
    fetch("http://192.168.101.62:8080/unirse")
        .then(function(res){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })  
        })

}

function seleccionMascotaJugador(){
    let selecionado = false;
    if(inputzukara.checked) {
        spanMascotaJugador.innerHTML = inputzukara.id,             
         mascotaElejida = inputzukara.id
         selecionado = true
    }
    else if(inputtirrano.checked) {
        spanMascotaJugador.innerHTML = inputtirrano.id, 
        mascotaElejida = inputtirrano.id
        selecionado = true
    }
    else if(inputmetax.checked) {
        spanMascotaJugador.innerHTML = inputmetax.id, 
        mascotaElejida = inputmetax.id
        selecionado = true
    }
    else if(inputozhin.checked) {
        spanMascotaJugador.innerHTML = inputozhin.id, 
        mascotaElejida = inputozhin.id
        selecionado = true
    }
    else if(inputbada.checked) {
        spanMascotaJugador.innerHTML = inputbada.id, 
        mascotaElejida = inputbada.id
        selecionado = true  
    }
    else if(inputtoph.checked) {
        spanMascotaJugador.innerHTML = inputtoph.id, 
        mascotaElejida = inputtoph.id
        selecionado = true
    }
    else {alert("No has seleccionado ninguna mascota, por favor selecciona una")
    }
    
    if (selecionado==true){
        selecionarMokepon(mascotaElejida)
        crearBotones(mascotaElejida) 
    }
}  

function selecionarMokepon(mascotaElejida){
    fetch(`http://192.168.101.62:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon : mascotaElejida
        })
    })

}

function seleccionMascotaPc(mascotaEnemiga){ 
    sapnMascotaEnemiga.innerHTML = mascotaEnemiga.nombre
    ataqueMokeponEnemigo = mascotaEnemiga.ataques
}

function crearBotones(mascotaElejida){
    sectionSeleccionMascota.style.display = "none"
    let ataquesElegidos
        for (let i = 0; i < mokepones.length; i++) {
             if (mascotaElejida === mokepones[i].nombre) { 
                ataquesElegidos = mokepones[i].ataques
            }
        }     
    ataquesIterados(ataquesElegidos)
}

function ataquesIterados(ataquesElegidos){
    ataquesElegidos.forEach((ataques) => { 
        ataques1 = `<button id=${ataques.id} class="botonAtaque">${ataques.nombre}</button>`
            botonesAtaque.innerHTML += ataques1})
    
    botonFuego = document.getElementById("botonFuego")
    botonAgua = document.getElementById("botonAgua")
    botonTierra = document.getElementById("botonTierra")
    botones=document.querySelectorAll(".botonAtaque") 
    
    secuenciaAtaque()
}

function secuenciaAtaque(){

    sectionVerMapa.style.display="flex"
    iniciarMapa()

    botones.forEach((button) => {
        button.addEventListener("click", (event) => {     
         if(event.target.textContent==="Fuego"){
           ataqueJugador.push("Fuego")
           button.style.background = "darkseagreen"
           button.disabled= true 
            } else if(event.target.textContent==="Agua"){
            ataqueJugador.push("Agua")
            button.style.background = "darkseagreen"
            button.disabled= true
            } else if(event.target.textContent==="Tierra"){
            ataqueJugador.push("Tierra")
            button.style.background = "darkseagreen"
            button.disabled= true
            } 
            if(ataqueJugador.length == 5){
               enviarAtaques()
            }
            
        })        
    })     
}

function enviarAtaques(){
    fetch(`http://192.168.101.62:8080/mokepon/${jugadorId}/ataques`,{
        method: "post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            ataques:ataqueJugador
        })
    })
    
    intervalo = setInterval(obtenerAtaques, 80)
}

function obtenerAtaques(){
    fetch(`http://192.168.101.62:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res){
            if (res.ok) {
                res.json()
                    .then(function ({ataques}){
                        if (ataques.length === 5 ){
                            ataqueEnemigo = ataques
                            inciarCombate()
                        }
                    })
            }
        }) 
}

function seleccionAtaqueEnemigo() {
    let ataqueAletorio = aleatorio (0,ataqueMokeponEnemigo.length-1)
    if (ataqueMokeponEnemigo[ataqueAletorio].nombre =="Fuego") 
        {ataqueEnemigo.push("Fuego")}
    else if (ataqueMokeponEnemigo[ataqueAletorio].nombre =="Agua") 
        {ataqueEnemigo.push("Agua")}
    else if (ataqueMokeponEnemigo[ataqueAletorio].nombre =="Tierra") 
        {ataqueEnemigo.push("Tierra")}
    console.log(ataqueEnemigo)
inciarCombate()
}

function inciarCombate(){
    if(ataqueJugador.length == 5){
        botonCombate.style.display = "flex"
        botonCombate.addEventListener("click", eleccionResultado)
        clearInterval(intervalo)
    }
}

function eleccionResultado() {
    for (let decision = 0; decision < ataqueJugador.length; decision++) {
        if (ataqueJugador[decision] == ataqueEnemigo[decision]){
            decisionParticipantes(decision, decision)
        }
        else if(ataqueJugador[decision] === "Fuego" && ataqueEnemigo[decision] == "Tierra"){
            decisionParticipantes(decision, decision)
            victoriasJugador = victoriasJugador  +1, spanVictoriasJugador.innerHTML= (victoriasJugador )
        }
        else if(ataqueJugador[decision] === "Agua" && ataqueEnemigo[decision] == "Fuego"){
            decisionParticipantes(decision, decision)
             victoriasJugador = victoriasJugador  +1, spanVictoriasJugador.innerHTML= (victoriasJugador )
        }
        else if(ataqueJugador[decision] === "Tierra" && ataqueEnemigo[decision] == "Agua"){
            decisionParticipantes(decision, decision)
            victoriasJugador = victoriasJugador +1, spanVictoriasJugador.innerHTML= (victoriasJugador )
        }  
        else {decisionParticipantes(decision, decision)
            victoriasEnemigo =victoriasEnemigo  +1, spanVictoriasEnemigo.innerHTML=(victoriasEnemigo )
        }       
        revisarVidas()
    }      
}

function decisionParticipantes(jugador,enemigo){
    indexJugador = ataqueJugador[jugador]
    indexEnemigo = ataqueEnemigo[enemigo]
}

function revisarVidas(){
    if (victoriasEnemigo < victoriasJugador) 
        {crearMensaje2("Te felicito has GANADO el combate, la mascota de tu enemigo ya no puede pelear.")}
    else if (victoriasJugador < victoriasEnemigo)
        {crearMensaje2("Lo Lamento has PERDIDO el combate, tu mascota  ya no puede pelear.")}
    else 
        {crearMensaje2("Han EMPATADO, Fue un duro combate")}
    
} 

function crearMensaje2(resultado){

let nuevoAtaqueJugador = document.createElement("p")
let nuevoAtaqueEnemigo = document.createElement("p")

sectionMensajes.innerHTML = resultado
nuevoAtaqueJugador.innerHTML=indexJugador
nuevoAtaqueEnemigo.innerHTML=indexEnemigo

ataqueDeJugador.appendChild(nuevoAtaqueJugador)
ataqueDeEnemigo.appendChild(nuevoAtaqueEnemigo)

botonCombate.style.display="none"
sectionReiniciar.style.display= "flex"
}

function reiniciar() {
    location.reload() 
}

function iniciarMapa(){
    mascotaEnemiga= mascotaEnemiga
    miMascota = obtenerObjetoJugador()
    
   intervalo=setInterval(pintarCanvas, 45)
    window.addEventListener("keydown", tecla)
    window.addEventListener("keyup",detenerMovimiento)
}
function pintarCanvas(){
    miMascota.x=miMascota.x + miMascota.velocidadX
    miMascota.y=miMascota.y + miMascota.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height,
    )
   
    miMascota.pintarMokepon()
    mokeponesEnemigos.forEach(function (mokepon){
        mokepon.pintarMokepon()
        if(miMascota.velocidadX !== 0 || miMascota.velocidadY !== 0 ){
            revisarColision(mokepon)
        }
    })
    enviarPosicion(miMascota.x, miMascota.y) 
    
}

function enviarPosicion(x, y){
    fetch(`http://192.168.101.62:8080/mokepon/${jugadorId}/posicion`,{
       method: "post",
       headers: {
            "Content-Type": "application/json"
        },
       body: JSON.stringify({
            x, 
            y
       })
    })
    .then(function(res){
        if(res.ok){
            res.json()
                .then(function({enemigos}){  
                    console.log(enemigos)
                        mokeponesEnemigos= enemigos.map(function (enemigo) {
                            const mokeponNombre = enemigo.mokepon.nombre 
                            let mokeponEnnemigo = null 
                                if (mokeponNombre === "Oshin"){
                                    mokeponEnnemigo = new Mokepon("Ozhin", "./assets/ozhin.png", 3, "./assets/avatarOshin.png", enemigo.id)
                                }else if (mokeponNombre === "Bada"){
                                    mokeponEnnemigo = new Mokepon("Bada", "./assets/bada.png", 3, "./assets/avatarBada.png", enemigo.id)
                                }else if (mokeponNombre === "Toph"){
                                    mokeponEnnemigo = new Mokepon("Toph", "./assets/toph.png", 3, "./assets/toph.png", enemigo.id)
                                }else if (mokeponNombre === "Zukara"){
                                    mokeponEnnemigo = new Mokepon("Zukara", "./assets/zukara.png", 3, "./assets/zukara.png", enemigo.id)
                                }else if (mokeponNombre === "Tirrano"){
                                    mokeponEnnemigo = new Mokepon("Tirrano", "./assets/tirrano.png", 3, "./assets/tirrano.png", enemigo.id)
                                }else if (mokeponNombre === "Metax"){
                                    mokeponEnnemigo = new Mokepon("Metax", "./assets/metax.png", 3, "./assets/avatarMetax.png", enemigo.id)
                                }  
                            mokeponEnnemigo.x = enemigo.x
                            mokeponEnnemigo.y = enemigo.y
                            return mokeponEnnemigo                            
                        })
                })
                          
        }
    })
}

function moverDerecha(){
    miMascota.velocidadX= +5 
}
function moverAbajo(){
    miMascota.velocidadY = +5
}
function moverArriba(){
    miMascota.velocidadY = -5
}
function moverIzquierda(){
    miMascota.velocidadX = -5
}

function tecla(event){
switch (event.key) {
    case "ArrowUp":
        moverArriba()
        break;
    case "ArrowDown":
        moverAbajo()
        break;
    case "ArrowLeft":
        moverIzquierda()
        break;
    case "ArrowRight":
        moverDerecha()
        break;
    default:
        break;
}
}

function detenerMovimiento(){
    miMascota.velocidadX =0
    miMascota.velocidadY =0
}

function obtenerObjetoJugador(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaElejida === mokepones[i].nombre) { 
           return mokepones[i]
       }
   }     
}

function revisarColision(enemigo){
    console.log(enemigo)
    const arribaenemigo = enemigo.y
    const abajoenemigo = enemigo.y + enemigo.alto
    const izquierdaenemigo = enemigo.x
    const derechaenemigo = enemigo.x + enemigo.ancho

    const arribaMiMascota = miMascota.y
    const abajoMiMascota = miMascota.y + miMascota.alto
    const izquierdaMiMascota = miMascota.x
    const derechaMiMascota = miMascota.x + miMascota.ancho

    if (abajoMiMascota < arribaenemigo ||
        arribaMiMascota > abajoenemigo ||
        derechaMiMascota < izquierdaenemigo ||
        izquierdaMiMascota > derechaenemigo) {
         return
    }
    seleccionMascotaPc(enemigo)  
    clearInterval(intervalo)
    alert("COLISION")
    enemigoId= enemigo.id
    detenerMovimiento()
    sectionAtaques.style.display = "flex"
    sectionVerMapa.style.display = "none"
}
