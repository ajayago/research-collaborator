const userlogin_submit = document.getElementById("user_login_submit");
userlogin_submit.addEventListener("click",submitted_login_details);

function submitted_login_details(){
	const userName = document.querySelector(".user_email_id");
	const userPassword = document.querySelector(".user_password");
	alert(userPassword.value);
}
