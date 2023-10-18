// On écoute les updates sur les onglets
chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
	// Attente du chargement de l'onglet
	if (changeInfo.status !== 'complete')
		return
	// Récupération de l'onglet actif
	chrome.tabs.query({currentWindow: true, active: true}, function() {
		// Lecture de la variable 'environments'
		chrome.storage.local.get(['environments']).then((result) => {
			console.log(result)
			if (result.environments !== undefined) {
				// On vérifie si on environnement match l'URL actuelle
				result.environments.forEach(env => {
					if (tab.url && tab.url.startsWith(env.url)) {
						// On envoie un message au contentScript
						chrome.tabs.sendMessage(id, {
							environment: env
						});
					}
				});
			}
		})
    })
})