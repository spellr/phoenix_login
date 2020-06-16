chrome.runtime.onInstalled.addListener(function() {
});

chrome.browserAction.onClicked.addListener(async function(tab) {
    response = await fetch("https://myinfo.fnx.co.il/Fnx/MyZone/Registration/Registration", {credentials:'same-origin'});
    text = await response.text();
    parser = new DOMParser();
    htmlDocument = parser.parseFromString(text, "text/html");
    section = htmlDocument.documentElement.querySelector("[name=__RequestVerificationToken]");
    token = section.getAttribute("value");

    var formBody = [];
    formBody.push("__RequestVerificationToken=" + token);
    formBody.push("SelectedIdentityType" + "=" + "0");
    formBody.push("UserIdentity" + "=" + "XXX");
    formBody.push("CommissionedId" + "=" + "");
    formBody.push("SelectedOTPIdentificationType" + "=" + "0");
    formBody.push("UserNumberPhone" + "=" + "XXX");
    formBody.push("UserNumberEmail" + "=" + "");
    formBody.push("g-recaptcha-response" + "=" + "");
    formBody.push("Consent" + "=" + "on");
    formBody.push("X-Requested-With" + "=" + "XMLHttpRequest");
    formBody = formBody.join("&");


    const regOpts = {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      credentials: 'same-origin',
    };
    await fetch("https://myinfo.fnx.co.il/fnx/MyZone/Registration/Registration/CheckValidateUser", regOpts);

    window.open("https://myinfo.fnx.co.il/fnx/MyZone/Insurance/HomePage");
});
