const consentStorageKey = "jamia-rizvia-analytics-consent";
const measurementId = "G-BXM24N234Y";
const analyticsDisabledFlag = `ga-disable-${measurementId}`;

window[analyticsDisabledFlag] = true;

const consentStatus = document.createElement("p");
consentStatus.className = "cookie-consent-status";
consentStatus.setAttribute("role", "status");
consentStatus.setAttribute("aria-live", "polite");

const consentPanel = document.createElement("section");
consentPanel.className = "cookie-consent-panel";
consentPanel.id = "cookie-consent-panel";
consentPanel.setAttribute("role", "region");
consentPanel.setAttribute("aria-labelledby", "cookie-consent-heading");

const consentHeading = document.createElement("h2");
consentHeading.id = "cookie-consent-heading";
consentHeading.textContent = "Your cookie preferences";

const consentDescription = document.createElement("p");
consentDescription.append(
  "We use optional Google Analytics to understand how visitors use the site. ",
);
const policyLink = document.createElement("a");
policyLink.href = "/cookie-policy.html";
policyLink.textContent = "Read our Cookie Policy";
consentDescription.append(policyLink);

const consentActions = document.createElement("div");
consentActions.className = "cookie-consent-actions";

const acceptButton = document.createElement("button");
acceptButton.className = "cookie-consent-accept";
acceptButton.type = "button";
acceptButton.textContent = "Accept analytics";

const rejectButton = document.createElement("button");
rejectButton.className = "cookie-consent-reject";
rejectButton.type = "button";
rejectButton.textContent = "Reject analytics";

const closeSettingsButton = document.createElement("button");
closeSettingsButton.className = "cookie-consent-close";
closeSettingsButton.type = "button";
closeSettingsButton.textContent = "Close settings";
closeSettingsButton.hidden = true;

const settingsButton = document.createElement("button");
settingsButton.className = "cookie-settings-button";
settingsButton.type = "button";
settingsButton.textContent = "Change cookie settings";
settingsButton.setAttribute("aria-controls", consentPanel.id);
settingsButton.setAttribute("aria-expanded", "false");

consentActions.append(acceptButton, rejectButton, closeSettingsButton);
consentPanel.append(
  consentHeading,
  consentDescription,
  consentStatus,
  consentActions,
);
const settingsContainer = document.querySelector("#cookie-settings-control");
if (settingsContainer) {
  settingsContainer.append(settingsButton);
}
document.body.append(consentPanel);

function readConsent() {
  try {
    const preference = window.localStorage.getItem(consentStorageKey);
    return preference === "accepted" || preference === "rejected"
      ? preference
      : null;
  } catch (error) {
    console.error("Unable to read the cookie preference from this browser.", error);
    return null;
  }
}

function saveConsent(preference) {
  try {
    window.localStorage.setItem(consentStorageKey, preference);
    return true;
  } catch (error) {
    console.error("Unable to save the cookie preference in this browser.", error);
    consentStatus.textContent =
      "Your choice could not be saved. It will apply only until you leave this page.";
    return false;
  }
}

async function enableAnalytics() {
  window[analyticsDisabledFlag] = false;
  try {
    await import("./analytics.js");
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
  } catch (error) {
    window[analyticsDisabledFlag] = true;
    console.error("Unable to load analytics after consent was granted.", error);
    consentStatus.textContent =
      "Your choice was saved, but analytics could not be loaded.";
    consentPanel.hidden = false;
    closeSettingsButton.hidden = false;
    settingsButton.hidden = true;
  }
}

function applyConsent(preference) {
  if (preference === "accepted") {
    void enableAnalytics();
    return;
  }

  window[analyticsDisabledFlag] = true;
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", { analytics_storage: "denied" });
  }
}

function selectConsent(preference) {
  const saved = saveConsent(preference);
  applyConsent(preference);

  if (saved) {
    consentPanel.hidden = true;
    closeSettingsButton.hidden = true;
    settingsButton.hidden = false;
    settingsButton.setAttribute("aria-expanded", "false");
  }
}

acceptButton.addEventListener("click", () => selectConsent("accepted"));
rejectButton.addEventListener("click", () => selectConsent("rejected"));

settingsButton.addEventListener("click", () => {
  consentPanel.hidden = false;
  closeSettingsButton.hidden = false;
  settingsButton.hidden = true;
  settingsButton.setAttribute("aria-expanded", "true");
  acceptButton.focus();
});

closeSettingsButton.addEventListener("click", () => {
  consentPanel.hidden = true;
  closeSettingsButton.hidden = true;
  settingsButton.hidden = false;
  settingsButton.setAttribute("aria-expanded", "false");
  settingsButton.focus();
});

const savedConsent = readConsent();
if (savedConsent) {
  consentPanel.hidden = true;
  closeSettingsButton.hidden = true;
  settingsButton.hidden = false;
  applyConsent(savedConsent);
} else {
  consentPanel.hidden = false;
  settingsButton.hidden = true;
}
