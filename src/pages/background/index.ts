chrome.webRequest.onBeforeRequest.addListener(
  function (_details) {
    chrome.declarativeNetRequest.getDynamicRules().then(console.log).catch(console.error);
  },
  { urls: ["*://*.edf.school/*"] }
);

chrome.runtime.onInstalled.addListener(async () => {
  const RULE: chrome.declarativeNetRequest.Rule = {
    id: 1,
    condition: {
      initiatorDomains: ["edf.school"],
      regexFilter: "(https?:\\/\\/.*\\.edf\\.school)(\\/.*)",
      excludedRequestMethods: [chrome.declarativeNetRequest.RequestMethod.POST],
    },
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
      redirect: {
        regexSubstitution: `chrome-extension://${chrome.runtime.id}\\2`,
      },
    },
  };
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE.id],
    addRules: [RULE],
  });
});
