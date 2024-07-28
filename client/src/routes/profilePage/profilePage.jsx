import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../../../api/lib/apiRequest";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";

function ProfilePage() {

  const {updateUser , currentUser} = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(()=>{
    if(!currentUser){
      navigate("/login");
    }
  },[currentUser,navigate])

  const handleLogout = async(e)=>{
    e.preventDefault();

    try{

      await apiRequest.post("auth/logout");
      updateUser(null);
      navigate('/');

    }
    catch(err){
      console.log(err);
    }
  }

  return (
      
     currentUser && (<div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
            <button >Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "/logo.png"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email }</b>
            </span>
            <button type="submit" onClick={handleLogout} className="button">Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
            <button>Create New Post</button>
            </Link>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>)
  );
}

export default ProfilePage;
