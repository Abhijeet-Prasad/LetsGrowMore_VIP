import './App.css';
import Axios from "axios";
import logo from "./logo.png"
import { useState } from "react";
import UserTiles from './components/UserTiles';
import Loading from './components/Loading';

function App() {
  var url = "https://reqres.in/api/users?page=1";
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(false);
  
  async function get_user(){
    setloading(true);
    var usersData = await Axios.get(url).then(response => {
      setusers(response.data.data);
      setTimeout(()=>{
        setloading(false);
      },2000)
      console.log(response.data.data);
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    get_user();
  }
  
  return (
    <div className="app">
      <nav className="Navbar">
        <img src={logo} className="logo" alt="logo"></img>
        <button onClick={onSubmit}><span>GET USERS </span></button>
      </nav>
      <div className='app_user'>
        {loading && <Loading/>}
        {!loading && users.map(user=> {
          return <UserTiles user={user}/>;
        })}
      </div>
    </div>
  );
}

export default App;