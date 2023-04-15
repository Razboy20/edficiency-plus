import { mount, StartClient } from "solid-start/entry-client";

window.loggedIn = !document.querySelector("#btnLogin");
document.getElementsByTagName("html").item(0).innerHTML = null;

mount(() => <StartClient />, document);
