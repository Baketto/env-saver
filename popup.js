/**
 * Construction du select des environnements
 * @param value 
 * @returns 
 */
function buildSelectEnv(value = undefined) {
	let envs = ["local", "integ", "preprod", "prod"]
    let select = document.createElement('select')
	select.style = "width:30%"
	envs.forEach(env => {
		let opt = document.createElement('option')
		opt.value = env
		opt.innerHTML = env.toUpperCase()
		if (value === env)
			opt.selected = 'selected'
		select.appendChild(opt)
	})
	return select
}

/**
 * Construction de l'input group d'environnement
 * @param inputValue 
 * @param optionValue 
 */
function addEnvironment(inputValue = undefined, optionValue = undefined) {
    let input = document.createElement('input')
	input.id = "environment-" + document.getElementsByClassName("environment").length
	input.type = "text"
	input.style = "width:70%"
	input.value = inputValue ?? ""
	let select = buildSelectEnv(optionValue)
    let divEnv = document.createElement('div')
	divEnv.className = "environment"
	divEnv.appendChild(input)
	divEnv.appendChild(select)
	document.getElementById("environments").appendChild(divEnv)
}

/**
 * Création d'une row vide pour ajouter un environnement
 */
document.getElementById("add").onclick = () => {
	addEnvironment()
}

/**
 * Sauvegarde des environnements renseignés
 */
document.getElementById("save").onclick = () => {
	let environments = document.getElementsByClassName("environment")
	// Si aucune row trouvée, on set un array vide
	if (environments === undefined) {
		chrome.storage.local.set({ environments: [] })
		return
	}
	// Sauvegarde des row dans le local storage (array d'objets : "environments")
	let result = []
	Array.from(environments).forEach(env => {
		// On ne sauvegarde pas les champs vides
		if (env.querySelector('input').value === '')
			return
		result.push({
			"env": env.querySelector('select').value,
			"url": env.querySelector('input').value
		})
	});
	chrome.storage.local.set({ environments: result })
}

/**
 * Récupération des environnements enregistrés dans le local storage
 */
chrome.storage.local.get(["environments"]).then((result) => {
	let environments = result.environments
	// Si pas de variable trouvée, on set un array vide
	if (environments === undefined) {
		chrome.storage.local.set({ environments: [] })
		return
	}
	// Création des row remplies
	environments.forEach(env => {
		addEnvironment(env.url, env.env)
	});
});
