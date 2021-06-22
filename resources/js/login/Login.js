import React,{useState} from "react";
import ReactDOM from "react-dom";
import "./login.css"

import axios from "axios";
import { useHistory } from "react-router-dom";

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
function Login() {

    const [User, setUser] = useState({});

    const HandleChange = (e) => {
      const { name, value } = e.target;
      setUser({ ...User, [name]: value });
    };
    const createUser = (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            url: "http://127.0.0.1:8000/api/users",
            data: {
                name: User.name,
                password: User.password,
                email:User.email
            },
        })
            .then(({ data }) => {
                toast.success("Create Success");
            })
            .catch((error) => {
                console.error("Error : ", error);
            });
    };
    
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleEmail = (event) => {
        setEmail({ email: event.target.value });
      };
      const handlePassword = (event) => {
        setPassword({ password: event.target.value });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
    
        axios
          .post("http://127.0.0.1:8000/api/login", {
            email: email.email,
            password: password.password,
          })
          .then( ({data}) => {

            
              toast.success("Welcome "+data.content.name);
              localStorage.setItem("@Token", data.content.access_token);
              localStorage.setItem("@Username", data.content.name);
              localStorage.setItem("@UserId", data.content.user_id);
             history.push("/");
              
           
          })
          .catch((err) => {
            
            toast.error(err.response);
          });
    }
    return (
        
        <React.Fragment>
        <div className="container" id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={(e)=>{createUser(e)}}>
                    <h1>Create Account</h1>
                   
                   
                    <input type="text" placeholder="Name"  name="name" required onChange={(e)=>{HandleChange(e)}}/>
                    <input type="email" placeholder="Email" name="email"onChange={(e)=>{HandleChange(e)}}/>
                    <input type="password" placeholder="Password" name="password" onChange={(e)=>{HandleChange(e)}}/>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={(e)=>{handleSubmit(e)}}>
                    <h1>Sign in</h1>
                     <input type="email" placeholder="Email" required onChange={(e)=>{handleEmail(e)}}/>
                    <input type="password" placeholder="Password" required onChange={(e)=>{handlePassword(e)}}/> 
                  
                    <button type="submit" >Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn">Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
         </React.Fragment>
     
       
    );
}

export default Login;
// if (document.getElementById("app")) {
//     ReactDOM.render(<Login />, document.getElementById("app"));
// }
