const save = document.getElementById("save")

const local = document.getElementById("local")
const integ = document.getElementById("integ")
const preprod = document.getElementById("preprod")
const prod = document.getElementById("prod")


chrome.storage.local.get(["local", "integ", "preprod", "prod"]).then((result) => {
  local.value = result.local 
  integ.value = result.integ
  preprod.value = result.preprod
  prod.value = result.prod
});

save.onclick = () => {
  chrome.storage.local.set({ local: local.value })
  chrome.storage.local.set({ integ: integ.value })
  chrome.storage.local.set({ preprod: preprod.value })
  chrome.storage.local.set({ prod: prod.value })
}