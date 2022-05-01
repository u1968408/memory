var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
options_data = JSON.parse(json);

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
		switch (options_data.dificulty) {
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
			this.score = 100 * this.numDif * options_data.cards;

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
								this.score -= 10 * this.numDif * options_data.cards + Math.pow(1.83, 2 * this.numDif);
								console.log("Punts actuals:", this.score)
								var oFirstClick = this.firstClick;
								if (this.score <= 0) {
									alert("Game Over");
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
								if (this.correct >= options_data.cards) {
									alert("You Win with " + this.score + " points.");
									loadpage("../");
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
	let nCartes = options_data.cards;
	if (nCartes > 6) nCartes = 6;
	else if (nCartes < 2) nCartes = 2;
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