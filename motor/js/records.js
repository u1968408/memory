var json2 = localStorage.getItem("records") || '{"first_nom":"","first_punts":0,"second_nom":"","second_punts":0,"third_nom":"","third_punts":0}';
records_data = JSON.parse(json2);

document.getElementById("firstName").innerHTML = "Nom: " + records_data.first_nom + " Puntuació: " + Math.trunc(records_data.first_punts);
document.getElementById("secondName").innerHTML = "Nom: " + records_data.second_nom + " Puntuació: " + Math.trunc(records_data.second_punts);
document.getElementById("thirdName").innerHTML = "Nom: " + records_data.third_nom + " Puntuació: " + Math.trunc(records_data.third_punts);