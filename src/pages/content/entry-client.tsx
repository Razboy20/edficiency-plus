import type { Block } from "./types/globals";
import { BlockType } from "./types/globals";

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
const importPromise = new Promise<Record<string, any>>((res) => {
  import("solid-start/entry-client").then(res).catch(console.error);
});
// hide all elements
document.documentElement.style.display = "none";

// create element observer to wait for the #site-data element (as well as home flex) to be added

// const observer = new MutationObserver((e) => {
//   console.log(e);
//   if (document.querySelector("#location1")) {
//     observer.disconnect();
//     start();
//   }
// });

// observer.observe(document.documentElement, {
//   childList: true,
//   subtree: true,
// });

window.addEventListener("DOMContentLoaded", start);

async function start() {
  document.documentElement.style.display = "";

  // get site data
  window.siteData = document
    .querySelector("#site-data")
    .getAttributeNames()
    .reduce((acc, name) => {
      acc[name.replace("data-", "")] = document.querySelector("#site-data").getAttribute(name);
      return acc;
    }, {}) as typeof window.siteData;

  // get home flex block data (if it exists)
  if (document.querySelector("#tname1")) {
    window.siteData.homeFlex = {
      id: "-1",
      currentStudents: 0,
      maxStudents: 0,
      openSeats: 0,
      name: document.querySelector("#sessiontitle1").textContent.trim(),
      date: new Date(),
      teacher: {
        name: document.querySelector("#tname1").textContent.trim(),
      },
      description: document.querySelector("#detail1").textContent.trim().substring("Details: ".length),
      location: document.querySelector("#location1").textContent.trim(),
      type: BlockType.Normal,
    } as Block;
  }

  if (window.siteData.loggedin !== "true") {
    localStorage.setItem(
      "loginUrl",
      (
        [...document.querySelectorAll(".login-btn")].find((el) =>
          el.textContent.includes("Google")
        ) as HTMLAnchorElement
      ).href
    );
  }

  window.loggedIn = window.siteData.loggedin === "true";
  document.getElementsByTagName("html").item(0).innerHTML = null;

  const imports = await importPromise;

  // eslint-disable-next-line
  imports.mount(() => imports.StartClient(), document);
}
