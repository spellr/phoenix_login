async function start() {
	var user_id = "XXX"
	var phone_number = "XXX"

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

	window.open("https://myinfo.fnx.co.il/fnx/MyZone/Insurance/HomePage");
}

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("start").onclick = start;
})