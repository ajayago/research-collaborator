const create_user_submit = document.getElementById("create_user_submit");
create_user_submit.addEventListener("click",create_new_user);

// this is to be replaced by a write to USERS on database
var users = {};
function create_new_user(){
	const user_email_address = document.querySelector(".user_email_address");
	const user_password = document.querySelector(".user_password");
	console.log(user_password.value);
	users[user_email_address.value] = user_password.value;
	console.log(users);
	alert("Register New User!");
}
