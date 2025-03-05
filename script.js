document.addEventListener("DOMContentLoaded", () => {
    document.title = chrome.i18n.getMessage("extensionName");
    document.getElementById("title").innerText = chrome.i18n.getMessage("extensionName");
    document.getElementById("custom-width-label").innerText = chrome.i18n.getMessage("chooseWidth");
    document.getElementById("custom-width-submit").innerText = chrome.i18n.getMessage("setWidth");
    const w480 = document.querySelector("#w480");
    const w768 = document.querySelector("#w768");
    const w1440 = document.querySelector("#w1440");
    const custom = document.querySelector("#custom-width-submit");

    chrome.windows.getCurrent((window) => {
        let windowHeight = window.height; // Get the current height of the window

        w480.addEventListener("click", () => {
            chrome.windows.update(window.id, { width: 480, height: windowHeight });
        });

        w768.addEventListener("click", () => {
            chrome.windows.update(window.id, { width: 768, height: windowHeight });
        });

        w1440.addEventListener("click", () => {
            chrome.windows.update(window.id, { width: 1440, height: windowHeight });
        });

        custom.addEventListener("click", () => {
            let customValue = parseInt(document.querySelector("#window-width").value);
            if (!isNaN(customValue) && customValue > 0) {
                chrome.windows.update(window.id, { width: customValue, height: windowHeight });
            } else {
                alert(chrome.i18n.getMessage("alertMessage"));
            }
        });
    });
});
