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

	var default_arcade_data = {
		cards:2, dificulty:"easy", punts:0
	};
	localStorage.setItem("arcade", JSON.stringify(default_arcade_data));
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

function records(){
	loadpage("./html/records.html");
}

function load(){
	loadpage("./html/phasergameArcade.html");
}

