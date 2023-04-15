// @refresh reload
import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "../package.json";

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = packageJson.version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

const manifest = defineManifest(() => ({
  manifest_version: 3,
  name: packageJson.displayName ?? packageJson.name,
  version: `${major}.${minor}.${patch}.${label}`,
  description: packageJson.description,
  // options_page: "src/pages/options/index.html",
  background: { service_worker: "src/pages/background/index.ts" },
  action: {
    // default_popup: "src/pages/popup/index.html",
    default_icon: "icons/34x34.png",
  },
  // chrome_url_overrides: {
  //   newtab: "src/pages/newtab/index.html",
  // },
  icons: {
    "128": "icons/128x128.png",
  },
  content_scripts: [
    {
      matches: ["*://*.edf.school/*"],
      js: ["src/pages/content/entry-client.tsx"],
      run_at: "document_start",
    },
  ],
  // devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: ["assets/*"],
      matches: ["*://*/*"],
    },
  ],
  // declarative_net_request: {
  //   rule_resources: [
  //     {
  //       id: "ruleset_1",
  //       enabled: true,
  //       path: "src/rules.json",
  //     },
  //   ],
  // },
  permissions: [
    "webRequest",
    "declarativeNetRequest",
    "declarativeNetRequestWithHostAccess",
    "webNavigation",
    "tabs",
    "activeTab",
    "scripting",
  ],
  host_permissions: ["*://*.edf.school/*"],
}));

export default manifest;
