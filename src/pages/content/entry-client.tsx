import { mount, StartClient } from "solid-start/entry-client";

// hide all elements
document.documentElement.style.display = "none";

// create element observer to wait for the site-data element to be added

const observer = new MutationObserver(() => {
  if (document.querySelector("#site-data")) {
    observer.disconnect();
    start();
  }
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

function start() {
  document.documentElement.style.display = "";

  window.siteData = document
    .querySelector("#site-data")
    .getAttributeNames()
    .reduce((acc, name) => {
      acc[name.replace("data-", "")] = document.querySelector("#site-data").getAttribute(name);
      return acc;
    }, {}) as typeof window.siteData;

  window.loggedIn = window.siteData.loggedin === "true";
  document.getElementsByTagName("html").item(0).innerHTML = null;

  mount(() => <StartClient />, document);
}
