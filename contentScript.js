/**
 * Styles CSS du tag selon l'environnement
 */
const styles = {
	"local": "color:white; background-color:green;",
	"integ": "color:white; background-color:dodgerblue;",
	"preprod": "color:white; background-color:orange;",
	"prod": "color:white; background-color:red;"
}

let received = false;
chrome.runtime.onMessage.addListener(function(msg) {
	// Si on a déjà reçu le message, on ne fait rien de plus
	if (received)
		return

	// Création du tag
	if ("environment" in msg) {
		let tag = document.createElement('span')
		tag.innerHTML = msg.environment.env.toUpperCase()
		tag.style = "position:fixed; top:15px; right:15px; padding:10px 30px; z-index:10000; font-weight:bold; " + styles[msg.environment.env]
		document.body.appendChild(tag)
		received = true;
	}

});
