var json = localStorage.getItem("arcade") || '{"cards":2,"dificulty":"easy","punts":0}';
arcade_data = JSON.parse(json);

var json2 = localStorage.getItem("records") || '{"first_nom":"","first_punts":0,"second_nom":"","second_punts":0,"third_nom":"","third_punts":0}';
records_data = JSON.parse(json2);

class GameScene extends Phaser.Scene {
	constructor() {
		super('GameScene');
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
		this.interactive = true; // Bool si es pot interaccionar o no
		this.numDif = 0;
	}

	preload() {
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
	}

	create() {
		let temps;
		switch (arcade_data.dificulty) {
			case "hard":
				this.numDif = 5;
				temps = 0; //Innecessari però es posa per claredat
				break;
			case "normal":
				this.numDif = 2.5;
				temps = 2500;
				break;
			case "easy":
				this.numDif = 1;
				temps = 5000;
				break;
			default:
				break;
		}

		let arraycards = get_cards();
		this.cameras.main.setBackgroundColor(0xF4F0E7);

		for (let i = 0; i < arraycards.length; i++) {
			this.add.image(250 + i * 100, 300, arraycards[i]);
		}
		this.time.delayedCall(temps, () => {
			this.cards = this.physics.add.staticGroup();
			for (let i = 0; i < arraycards.length; i++) {
				this.cards.create(250 + i * 100, 300, 'back');
			}

			// 	// 	Link calcul dificultat: https://www.geogebra.org/classic/vw3yqucd
			// let punts = 100 * this.numDif * this.num_cards_total - this.bad_clicks * (10 * this.numDif * this.num_cards_total + Math.pow(1.83, 2 * this.numDif)) ;
			// console.log("Dificultat ", this.numDif, ": ",100 * this.numDif * this.num_cards_total, " - ", this.bad_clicks * (10 * this.numDif * this.num_cards_total + Math.pow(1.83, 2 * this.numDif)),": " ,punts);
			// return punts;
			this.score = 100 * this.numDif * arcade_data.cards;

			let i = 0;
			this.cards.children.iterate((card) => {
				card.card_id = arraycards[i];
				i++;
				card.setInteractive();
				card.on('pointerup', () => {
					if (this.interactive) {
						card.disableBody(true, true);
						if (this.firstClick) {
							if (this.firstClick.card_id !== card.card_id) {
								this.score -= 10 * this.numDif * arcade_data.cards + Math.pow(1.83, 2 * this.numDif);
								console.log("Punts actuals:", this.score)
								var oFirstClick = this.firstClick;
								if (this.score <= 0) {
									alert("Game Over");
									// Guardem el record
									// '{"first_nom":"","first_punts":0,"second_nom":"","second_punts":0,"third_nom":"","third_punts":0}'

									// Lo siento mucho, lo sé, soy consciente, perdóname por mis pecados, solo voy corto de tiempo y de valor para enfrentarme a otra cosa
									if (records_data.first_punts < arcade_data.punts) {
										records_data.third_nom = records_data.second_nom;
										records_data.third_punts = records_data.second_punts;
										records_data.second_nom = records_data.first_nom;
										records_data.second_punts = records_data.first_punts;
										records_data.first_nom = sessionStorage.getItem("username");
										records_data.first_punts = arcade_data.punts;
									}
									else if (records_data.second_punts < arcade_data.punts) {
										records_data.third_nom = records_data.second_nom;
										records_data.third_punts = records_data.second_punts;
										records_data.second_nom = sessionStorage.getItem("username");
										records_data.second_punts = arcade_data.punts;
									}
									else if (records_data.third_punts < arcade_data.punts) {
										records_data.third_nom = sessionStorage.getItem("username");
										records_data.third_punts = arcade_data.punts;
									}
									localStorage.setItem("records", JSON.stringify(records_data));

									var default_arcade_data = {
										cards: 2, dificulty: "easy", punts: 0
									};
									localStorage.setItem("arcade", JSON.stringify(default_arcade_data));
									loadpage("../");
								}
								this.interactive = false;
								this.time.delayedCall(1000, () => {
									oFirstClick.enableBody(false, 0, 0, true, true);
									card.enableBody(false, 0, 0, true, true);
									this.interactive = true;
								})

								console.log("patau")
							}
							else {
								this.correct++;
								if (this.correct >= arcade_data.cards) {
									alert("You Win with " + this.score + " points.");
									let dific = arcade_data.dificulty;
									if (dific == "easy") dific = "normal";
									else dific = "hard";
									let cartes = arcade_data.cards + 1;
									if (cartes > 4) cartes = 4;
									var new_arcade_data = {
										cards: cartes, dificulty: dific, punts: arcade_data.punts + this.score
									};
									localStorage.setItem("arcade", JSON.stringify(new_arcade_data));
									loadpage("phasergameArcade.html")
								}
							}
							this.firstClick = null;
						}
						else {
							this.firstClick = card;
						}
					}
				}, card);
			});
		})





	}

	update() { }

}

function get_cards() {
	let nCartes = arcade_data.cards;
	if (nCartes > 4)
		nCartes = 4;
	else if (nCartes < 2)
		nCartes = 2;
	let arrayCartes = ['cb', 'co', 'sb', 'so', 'tb', 'to'];
	let laDevolucionIncreibleDeCartasAleatoriasYFantasticas = []; // Perdoneme profe uwu, 
	for (let i = 0; i < nCartes; i++) {
		let c = Phaser.Utils.Array.RemoveRandomElement(arrayCartes);
		laDevolucionIncreibleDeCartasAleatoriasYFantasticas.push(c);
		laDevolucionIncreibleDeCartasAleatoriasYFantasticas.push(c);
	}
	Phaser.Utils.Array.Shuffle(laDevolucionIncreibleDeCartasAleatoriasYFantasticas);
	return laDevolucionIncreibleDeCartasAleatoriasYFantasticas;
}
function puntuacio() {
	//Link calcul dificultat: https://www.geogebra.org/classic/vw3yqucd
	let punts = 100 * this.numDif * this.num_cards_total - this.bad_clicks * (10 * this.numDif * this.num_cards_total + Math.pow(1.83, 2 * this.numDif));
	console.log("Dificultat ", this.numDif, ": ", 100 * this.numDif * this.num_cards_total, " - ", this.bad_clicks * (10 * this.numDif * this.num_cards_total + Math.pow(1.83, 2 * this.numDif)), ": ", punts);
	return punts;
}

function local_save() {
	loadpage("../");
}