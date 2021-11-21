const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

async function graphQLFetch(query, variables = {}) {
    try {
      const response = await fetch("http://localhost:5000/graphql", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
}

class LoginUser extends React.Component{
    render(){
        const handleSubmit = (e) => {
            e.preventDefault();
            const form = document.forms.loginUser;
            const user = {
                username: form.username.value, 
                password: form.password.value,
            }
            console.log(user);
            this.props.loginUser(user);
            form.username.value = "";
            form.password.value = "";
        }
        
        return(
            <div className="column">
                <form name="loginUser" onSubmit={handleSubmit}>
                    <label>
                        Enter User Email Address
                        <br />
                        <input type="text" name="username" id="username" placeholder="User email address" />
                    </label>
                    <br />
                    <label>
                        Enter password
                        <br />
                        <input type="password" name="password" id="password" placeholder="Password" />
                    </label>
                    <br />
                    <br />
                    <button className="add_user_button">Login User</button>
                </form>
            </div>
        );
    }
}

class DisplayLoginPage extends React.Component{
    constructor(){
        super();
        this.state = {
            errormessage: null
        };
        this.loginUser = this.loginUser.bind(this);
    };

    async loginUser(user){
        if (!user.username){
            this.setState({errormessage:"Please enter valid user name!"});
            return;
        }
        if (!user.password){
            this.setState({errormessage:"Please enter valid password!"});
            return;
        }
        const users_query = `query getExistingUsers($username: String!){
            getExistingUsers(username: $username) {
                username, password
            }
        }`;
        
        const username = user.username;
        const password = user.password;
        console.log(username);
        const user_data = await graphQLFetch(users_query, { username });
        console.log(user_data.getExistingUsers);
        if (user_data.getExistingUsers.length == 0){
            this.setState({errormessage:"User does not exist!"});
            return;
        }
        else{
            if (user_data.getExistingUsers[0].password == password){
                window.sessionStorage.setItem("username", user.username);
                window.open("./project_details.html", "_self");
	            return;
            }
            else{
                this.setState({errormessage: "Incorrect password!"});
            }
        }
    }

    render(){
        return(
        <React.Fragment>
            <LoginUser loginUser={this.loginUser} />
            <br/>
            <p>{this.state.errormessage ? this.state.errormessage : null}</p>
        </React.Fragment>
        );
    }
}

const element = <DisplayLoginPage />;
ReactDOM.render(element, document.getElementById("loginpage"));