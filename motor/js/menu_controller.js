function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./html/game.html");
}

function phaser_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	loadpage("./html/phasergame.html");
}
function phaser_game_arcade(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	loadpage("./html/phasergameArcade.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
}

function options(){
	loadpage("./html/options.html");
}

function load(){
	loadpage("./html/load.html");
}

