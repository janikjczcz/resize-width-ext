document.addEventListener("DOMContentLoaded", () => {
  // Localized text
  document.title = chrome.i18n.getMessage("extensionName");
  document.getElementById("title").innerText = chrome.i18n.getMessage("extensionTitle");
  document.getElementById("w480").innerText = chrome.i18n.getMessage("width480");
  document.getElementById("w768").innerText = chrome.i18n.getMessage("width768");
  document.getElementById("w1440").innerText = chrome.i18n.getMessage("width1440");
  document.getElementById("custom-width-label").innerText = chrome.i18n.getMessage("chooseWidth");
  document.getElementById("window-width").placeholder = chrome.i18n.getMessage("chooseWidthPlaceholder");
  document.getElementById("custom-width-submit").innerText = chrome.i18n.getMessage("setWidth");

  // Elements
  const w480 = document.getElementById("w480");
  const w768 = document.getElementById("w768");
  const w1440 = document.getElementById("w1440");
  const customButton = document.getElementById("custom-width-submit");
  const customInput = document.getElementById("window-width");

  // Focus the input when popup opens
  customInput.focus();

  chrome.windows.getCurrent((currentWindow) => {
    const windowHeight = currentWindow.height;

    function resizeWindow(width) {
      chrome.windows.update(
        currentWindow.id,
        {
          width,
          height: windowHeight,
        },
        () => window.close()
      );
    }

    function handleCustomWidth() {
      const width = parseInt(customInput.value, 10);

      if (!isNaN(width) && width > 0) {
        resizeWindow(width);
      } else {
        alert(chrome.i18n.getMessage("alertMessage"));
        customInput.focus();
        customInput.select();
      }
    }

    w480.addEventListener("click", () => resizeWindow(480));
    w768.addEventListener("click", () => resizeWindow(768));
    w1440.addEventListener("click", () => resizeWindow(1440));

    customButton.addEventListener("click", handleCustomWidth);

    customInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleCustomWidth();
      }
    });
  });
});