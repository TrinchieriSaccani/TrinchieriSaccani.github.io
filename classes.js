class Scacchiera {
	constructor() {
		this.caselle = document.getElementsByTagName("td");
		this.immagini = document.getElementsByTagName("img");
		this.pezziBianco = [];
		this.pezziNero = [];
		this.puntatore = document.getElementById("tabScacchiera");
		this.eliminatiBianco = [];
		this.eliminatiNero = [];
	}

	spawn(pezzo) {						//crea un pezzo
		if (pezzo.immagine[9] === 'w') this.pezziBianco.push(pezzo);
		else this.pezziNero.push(pezzo);
	}

	delete(pezzo) {						//elimina un pezzo
		if (pezzo.immagine[9] === 'w') {
			this.pezziBianco.splice(this.pezziBianco.indexOf(pezzo), 0);
			this.eliminatiBianco.push(pezzo);
		}
		else {
			this.pezziNero.splice(this.pezziNero.indexOf(pezzo), 0);
			this.eliminatiNero.push(pezzo);
		}
	}

	generaIniziale() {							//genera la disposizione iniziale
		//genera pezzi bianchi
		this.spawn(new TorreBianco(0, 7))
		this.spawn(new CavalloBianco(1, 7));
		this.spawn(new AlfiereBianco(2, 7));
		this.spawn(new ReginaBianco(3, 7));
		this.spawn(new ReBianco(4, 7));
		this.spawn(new AlfiereBianco(5, 7));
		this.spawn(new CavalloBianco(6, 7));
		this.spawn(new TorreBianco(7, 7));
		for (let i = 0; i < 8; i++) {
			this.spawn(new PedoneBianco(i, 6));
		}

		//pezzi neri
		this.spawn(new TorreNero(0, 0));
		this.spawn(new CavalloNero(1, 0));
		this.spawn(new AlfiereNero(2, 0));
		this.spawn(new ReginaNero(3, 0));
		this.spawn(new ReNero(4, 0));
		this.spawn(new AlfiereNero(5, 0));
		this.spawn(new CavalloNero(6, 0));
		this.spawn(new TorreNero(7, 0));
		for (let i = 0; i < 8; i++) {
			this.spawn(new PedoneNero(i, 1));
		}
	}

	getAllPieces() {		//restituisce tutti i pezzi presenti sulla scacchiera
		return this.pezziBianco.concat(this.pezziNero);
	}

	seleziona = (e) => {
		//parentNode accede al genitore dell'immagine

		let x = Array.prototype.indexOf.call(this.caselle, e.target.parentNode) % 8;
		let y = (Array.prototype.indexOf.call(this.caselle, e.target.parentNode) - x) / 8;
		let oggettoCliccato;

		if (e.target.src[49] === 'w') {
			for (let i in this.pezziBianco) {
				if (this.pezziBianco[i].x === x && this.pezziBianco[i].y === y) oggettoCliccato = this.pezziBianco[i];
			}
		}
		else {
			for (let i in this.pezziNero) {
				if (this.pezziNero[i].x === x && this.pezziNero[i].y === y) oggettoCliccato = this.pezziNero[i];
			}
		}
		
		oggettoCliccato.calcolaMossePossibili(this.pezziBianco, this.pezziNero);
		
		for (let i = 0; i<oggettoCliccato.mossePossibili.length; i++) {
			console.log(oggettoCliccato.mossePossibili[i][0] + ":" + oggettoCliccato.mossePossibili[i][1]);
		}
	}

	tick() {		//metodo che aggiorna la logica del gioco
		for (let i = 0; i < this.immagini.length; i++) {
			this.immagini[i].addEventListener("click", this.seleziona);
		}
	}
}

class Pezzo {
	mossePossibili = [];
	constructor(posX, posY) {
		if (posX < 0 || posX > 7 || posY < 0 || posY > 7) throw "Non valido";
		this.x = posX;
		this.y = posY;
	}

	pos() {
		return this.x, this.y;
	}
}

//pezzi bianchi
class PedoneBianco extends Pezzo {
	immagine = "immagini/white_pawn.svg";
	mosse = [(this.x, this.y - 1), (this.x, this.y - 2), (this.x - 1, this.y - 1), (this.x + 1, this.y - 1)];		//mosse che il pedone pu?? fare in teoria
	mossePossibili = [];

	calcolaMossePossibili(a, b) {
		this.mossePossibili = [];
		for(let i = 0; i<this.mosse.length; i++) {
			for (let j = 0; j<a; j++) {
				if (a[j].x !== this.mosse[i][0] && a[j].y !== this.mosse[i][1]) this.mossePossibili.push(this.mosse[i]);
			}
		}
		console.log(oggettoCliccato.mossePossibili.length);
	}
}

class ReBianco extends Pezzo {
	immagine = "immagini/white_king.svg";
}

class ReginaBianco extends Pezzo {
	immagine = "immagini/white_queen.svg";
}

class TorreBianco extends Pezzo {
	immagine = "immagini/white_rook.svg";
}

class AlfiereBianco extends Pezzo {
	immagine = "immagini/white_bishop.svg";
}

class CavalloBianco extends Pezzo {
	immagine = "immagini/white_knight.svg";
}

//pezzi neri
class PedoneNero extends Pezzo {
	immagine = "immagini/black_pawn.svg";
}

class ReNero extends Pezzo {
	immagine = "immagini/black_king.svg";
}

class ReginaNero extends Pezzo {
	immagine = "immagini/black_queen.svg";
}

class TorreNero extends Pezzo {
	immagine = "immagini/black_rook.svg";
}

class AlfiereNero extends Pezzo {
	immagine = "immagini/black_bishop.svg";
}

class CavalloNero extends Pezzo {
	immagine = "immagini/black_knight.svg";
}

