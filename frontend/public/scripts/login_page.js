const userlogin_submit = document.getElementById("user_login_submit");
userlogin_submit.addEventListener("click",submitted_login_details);

// placeholder for users - to be fetched from DB later
const users_dict = {
	"aishwarya@gmail.com": "trial1234",
	"testuser@gmail.com": "trial1234"
};

function submitted_login_details(){
	const userName = document.querySelector(".user_email_id");
	const userPassword = document.querySelector(".user_password");
	console.log(userName.value);
	if (userName.value in users_dict){
		if (users_dict[userName.value] != userPassword.value){
			alert("Incorrect credentials!");
			return;
		}
		else{
			display_user_dashboard();
		}
	}
	else{
		alert("No such user!");
	}
}

function display_user_dashboard(){
	alert("Take user to user dashboard");
	return;
}
