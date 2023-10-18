
let received = false;

const styles = {
  "local": "color:black; background-color:lightgreen;",
  "integ": "color:black; background-color:lightblue;",
  "preprod": "color:white; background-color:orange;",
  "prod": "color:white; background-color:red;"
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  console.log('ok')
  if (received)
    return
  console.log(msg)
  if (["local", "integ", "preprod", "prod"].includes(msg.env)) {
    let tag = document.createElement('span')
    tag.innerHTML = msg.env.toUpperCase() + " : " + msg.url
    tag.style = "position:absolute; top:15px; right:15px; ; z-index:10000; font-weight:bold; " + styles[msg.env]
    document.body.appendChild(tag)
    received = true;
  }

});
