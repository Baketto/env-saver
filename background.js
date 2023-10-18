
chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {

  if (changeInfo.status !== 'complete')
    return

  chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
    
    const activeURL = tabs[0].url
    console.log(activeURL)
    console.log(tab.url)

    chrome.storage.local.get(['local', 'integ', 'preprod', 'prod']).then((result) => {

      let key = undefined
      let value = undefined

      if (activeURL && result.local && activeURL.startsWith(result.local)) {
        key = "local"
        value = result.local
      }
      if (activeURL && result.integ && activeURL.startsWith(result.integ)) {
        key = "integ"
        value = result.integ
      }
      if (activeURL && result.preprod && activeURL.startsWith(result.preprod)) {
        key = "preprod"
        value = result.preprod
      }
      if (activeURL && result.prod && activeURL.startsWith(result.prod)) {
        key = "prod"
        value = result.prod
      }

      if (key !== undefined && value !== undefined) {
        console.log(key)
        console.log(value)
        chrome.tabs.sendMessage(id, {
          env: key,
          url: value
        });
      }

    })

  })

})
