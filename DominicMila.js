const { exec, spawn, execSync } = require("child_process")
const fs = require('fs')
const writeFile = require('fs/promises')
const prompt = require('prompt-sync')();


// cosas //
game = {}
const fichasposibles = ["00","01","02","03","04","05","06","10","11","12","13","14","15","16","20","21","22","23","24","25","26","30","31","32","33","34","35","36","40","41","42","43","44","45","46","50","51","52","53","54","55","56","60","61","62","63","64","65","66"]
	const fichascochinas = ["00","11","22","33","44","55","66"]

// end //

const preinistart = async () => {
let gameid = Math.floor(Math.random() * 100000);
let players = await prompt('Cuantos jugadores quieres que tenga el juego? Considera que los demas seran maquinas.')
if (players == 'po') process.exit()
console.log('Pues me vale cheto, todavia no se implementan mas, jugaras con la maquina JAJA.')
players = 2
await start(gameid, players)
}



const start = async (idg, playersh) => {
	try {
		let id = idg
		let fichasposibless = fichasposibles
		let fichascochinass = fichascochinas
    	game[id] = {
			lefichas: [],
			rifichas: [],
			players: playersh,
			fichas1p: [],
			fichas2p: [],
			fichasgame: fichasposibless,
			fichascochinasgame: fichascochinass,
			turno: 0,
			cochinaencontrada: false,
			center: []
			}
			console.log(fichasposibles)
			console.log(fichascochinas)
		//	console.log(`Este es el idg: ${idg}, este es el id: ${id}, este es game: ${JSON.stringify(game)}`)
			//console.log(game)
		if (game[id].fichas1p.length !== 7) {
		for (let i = 0; i < 7; i++) {
		let	uwu = game[id].fichasgame[Math.floor(Math.random() * game[id].fichasgame.length)]
game[id].fichas1p.push(uwu)
game[id].fichasgame.splice(game[id].fichasgame.indexOf(uwu), 1)
			}
		}
		if (game[id].fichas2p.length !== 7) {
		for (let i = 0; i < 7; i++) {
		let	uwu = game[id].fichasgame[Math.floor(Math.random() * game[id].fichasgame.length)]
game[id].fichas2p.push(uwu)
game[id].fichasgame.splice(game[id].fichasgame.indexOf(uwu), 1)
			}
		}
		for (i of game[id].fichasgame) {
		let cochina = fichascochinas.indexOf(i)
		 if (cochina !== -1) {
		  console.log(`Encontrada. La ficha ${i} esta en las fichas del tablero.`)
game[id].fichascochinasgame.splice(cochina, 1)

		 	}
			}
			
		if (game[id].fichascochinasgame.length > 0) {
	let buscarcochina = game[id].fichascochinasgame.length -1
			for (i of game[id].fichas1p) {
				if (i == game[id].fichascochinasgame[buscarcochina]) { 
				console.log(`Jugador 1 tiene la ficha mas grande, ${i}`)
game[id].cochinaencontrada = "1"
				}
				}
				if (!game[id].cochinaencontrada) {
								for (i of game[id].fichas2p) {
									let buscarcochina = game[id].fichascochinasgame.length -1
				if (i == game[id].fichascochinasgame[buscarcochina]) { 
				console.log(`Jugador 2 tiene la ficha mas grande, ${i}`)
				game[id].cochinaencontrada = "2"
				}
				}
					}
	if (!game[id].cochinaencontrada) { 
	console.log(game)
	console.log('Que raro, ningun jugador tuvo la cochina, lol')
  //delete game[id]
	//console.log(game)
	
	return await preinistart()
	}
			} else { 
			console.log('Curioso, nadie tuvo una ficha doble! Volveremos a barajear.')
			//delete game[id]
			return await preinistart()
			}
			
	switch (game[id].cochinaencontrada) {
		case '1':
		game[id].turno = 1
		return partida(game[id])
		break
		case '2':
		game[id].turno = 2
		console.log('q paso')
		console.log(game)
		//delete game[id]
		return await preinistart()	
		//return partida(game[id])
		break
	 default:
		return console.log('wtf paso aqui?')
		break
		
		}
				
		} catch(e) {
			console.log(e)
			}	
	}
	
const partida = async(juego) => {
	try { 
	let game = juego
console.log(JSON.stringify(game))

if (game.fichas1p.length == 0 || game.fichas2p.length == 0) {
console.log('El juego termino!')	
	} else {
		if (game.center.length == 0) {
		if (game.turno == 1) { 
		let stringi = ""
		for (let i = 0; i < game.fichas1p.length; i++) {
  let digits = game.fichas1p[i].split("");
  stringi += `${digits[0]}-${digits[1]} • `
}
let jugada = await prompt(`Tus fichas: \n\n${stringi}`)
if (jugada == 'po') process.exit()
if (isNaN(jugada)) {
	console.log('Debes lanzar una ficha valida para iniciar el juego! Recuerda, numeros del 1 al 7 para escoger.')
	return partida(game)
	}
	if (jugada > 7 || jugada < 1) {
		console.log('Debes lanzar una ficha valida para iniciar el juego! Recuerda, numeros del 1 al 7 para escoger.')
	return partida(game)
		}
if (await !isdoble(game.fichas1p[jugada -1])) {
	console.log('Debes lanzar una doble para iniciar el juego!')
	return partida(game)
	}
	
	game.center = 	game.fichas1p[jugada -1]
	.split("")
	console.log(center)
	
	return partida(game)

		} else {
			
			if (game.turno == 2) { 
		let stringi = ""
		for (let i = 0; i < game.fichas2p.length; i++) {
  let digits = game.fichas2p[i].split("");
  stringi += `${digits[0]}-${digits[1]} • `
}
console.log(stringi)

		}
			
			}
		  
			
			} else {
				switch(game.turno) {
	
					case '1':
					
					let stringi = ""
		for (let i = 0; i < game.fichas1p.length; i++) {
  let digits = game.fichas1p[i].split("");
  stringi += `${digits[0]}-${digits[1]} • `
}
let jugada = await prompt(`Tus fichas: \n\n${stringi}`)
if (isNaN(jugada)) {
	console.log('Debes lanzar una ficha valida para jugar. Recuerda, numeros del 1 al 7 para escoger.')
	return partida(game)
	}
	if (jugada > 7 || jugada < 1) {
		console.log('Debes lanzar una ficha valida. Recuerda, numeros del 1 al 7 para escoger.')
	return partida(game)
		}

	
					
					
					break
					
					
					}
			  
				
				
				}
		
		
		}

	
	
	} catch(e) {
	console.log(e)	
	}
	}
	
const isdoble = async (ficha) => {
	let algo = ficha.split("")
	if (algo[0] == algo[1]) {return true} else return false
	}

preinistart()