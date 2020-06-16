var token="";

async function start() {
    var user_id = document.getElementById("user_id").value;
    var phone_number = document.getElementById("telephone").value;

    response = await fetch("https://myinfo.fnx.co.il/Fnx/MyZone/Registration/Registration", {credentials:'same-origin'});
    text = await response.text();
    parser = new DOMParser();
    htmlDocument = parser.parseFromString(text, "text/html");
    section = htmlDocument.documentElement.querySelector("[name=__RequestVerificationToken]");
    token = section.getAttribute("value");

    const regOpts = {
      method: 'POST',
      body: `__RequestVerificationToken=${token}&SelectedIdentityType=0&UserIdentity=${user_id}&CommissionedId=&SelectedOTPIdentificationType=0&UserNumberPhone=${phone_number}&UserNumberEmail=&g-recaptcha-response=&Consent=on&X-Requested-With=XMLHttpRequest`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      credentials: 'same-origin',
    };
    await fetch("https://myinfo.fnx.co.il/fnx/MyZone/Registration/Registration/CheckValidateUser", regOpts);

    document.getElementById("isDisabled").removeAttribute("disabled");
}

async function submit() {
    number = document.getElementById("smsNumber").value;
    fetch("https://myinfo.fnx.co.il/fnx/MyZone/Registration/Registration/DoLogin", {
        method: 'POST',
          body: `__RequestVerificationToken=${token}&SecretCode=${number}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          credentials: 'same-origin',
          redirect: 'manual',
    })
    .then(function(resp) {
        window.open("https://myinfo.fnx.co.il/fnx/MyZone/Insurance/HomePage");
    })
    .catch(function(error) {
        console.error(error);
    });
}

function updateTelephone() {
    val = document.getElementById("telephone").value;
    chrome.storage.local.set({"telephone": val});
}

function updateUserId() {
    val = document.getElementById("user_id").value;
    chrome.storage.local.set({"user_id": val});
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("start").onclick = start;
    document.getElementById("submit").onclick = submit;

    document.getElementById("telephone").addEventListener('change', updateTelephone);
    document.getElementById("user_id").addEventListener('change', updateUserId);

    chrome.storage.local.get(['telephone', 'user_id'], function(result) {
        if ("telephone" in result) {
            document.getElementById("telephone").value = result["telephone"];
        }
        if ("user_id" in result) {
            document.getElementById("user_id").value = result["user_id"];
        }
    });
})