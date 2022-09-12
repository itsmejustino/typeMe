const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
//shows hidden install prompt using window
window.addEventListener("beforeinstallprompt", (event) => {
  // Store the triggered events
  window.deferredPrompt = event

  // Remove the hidden class from the button.
  butInstall.classList.toggle("hidden", false)
})

// on install click hide the prompt
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt
  if (!promptEvent) {
    return
  }
  promptEvent.prompt()
  window.deferredPrompt = null

  butInstall.classList.toggle("hidden", true)
})

// on successful install console log message after appinstalled event is triggered
window.addEventListener("appinstalled", (event) => {
  textHeader.textContent = 'Successfully installed!'
  console.log("Installed successfully!!", "appinstalled", event)
})
