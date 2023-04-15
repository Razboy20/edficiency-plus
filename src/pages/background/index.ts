console.log("background loaded");

chrome.webRequest.onBeforeRequest.addListener(
  function (_details) {
    chrome.declarativeNetRequest.getDynamicRules().then(console.log).catch(console.error);
  },
  { urls: ["*://*.edf.school/*"] }
);

console.log(`chrome-extension://${chrome.runtime.id}`);
chrome.runtime.onInstalled.addListener(async () => {
  const RULE: chrome.declarativeNetRequest.Rule = {
    id: 1,
    condition: {
      // initiatorDomains: [chrome.runtime.id],
      initiatorDomains: ["edf.school"],
      regexFilter: "(https?:\\/\\/.*\\.edf\\.school)(\\/.*)",
      excludedRequestMethods: [chrome.declarativeNetRequest.RequestMethod.POST],
      // resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME],
    },
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
      redirect: {
        regexSubstitution: `chrome-extension://${chrome.runtime.id}\\2`,
        // regexSubstitution: `https://google.com\\2`,
        // transform: {
        //   host: `chrome-extension://${chrome.runtime.id}`
        // },
        // url: `chrome-extension://${chrome.runtime.id}`,
      },
    },
  };
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE.id],
    addRules: [RULE],
  });
});
