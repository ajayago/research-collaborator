// this is to be replaced by a write to ORGS on database
const orgs = {};
const org_names_list = [];
const org_ids_list = [];
const create_org_submit = document.getElementById("create_org_submit");
create_org_submit.addEventListener("click",create_new_org);

function create_new_org(){
	const org_name = document.querySelector(".org_name");
	const org_id = document.querySelector(".org_id");
	console.log(org_name.value);
    if (org_name.value in org_names_list){
        alert("This organization is already present. You can create your user under this organization.");
        return;
    }
    if (org_id.value in org_ids_list){
        alert("Sorry this ID is already in use, please choose a different ID!");
        return;
    }
	orgs[org_id.value] = org_name.value;
    org_names_list.push(org_name.value);
    org_ids_list.push(org_id.value);

	console.log(orgs);
	alert("Registered New org!");
    return;
}
