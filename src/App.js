import './App.css';
import { useNavigate } from "react-router-dom";

import {
  AdminPortal,
  useAuth,
  useAuthActions,
  useTenantsState,
} from "@frontegg/react";

function App() {
  const { user, isAuthenticated } = useAuth();
  const { logout } = useAuthActions();
  const { tenants } = useTenantsState();  
  const navigate = useNavigate();

  const showAdminPortal = () => {
    AdminPortal.show();
  };

  const copyValue = (e) => {
    const val = e.target.value;
    navigator.clipboard.writeText(val);
    e.target.value = "copied!";
    setTimeout(() => {
      e.target.value = val;
    }, 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to root
  };

  return (
    <div className="App">
      { isAuthenticated ? (
         <div className="user-zone">
          <img src={user.profilePictureUrl} alt={user.name} referrerPolicy="no-referrer"/>
          <span>{user.name}</span>

          <button onClick={handleLogout}>Click me to logout</button>
          
          <button onClick={showAdminPortal}>Open Admin Portal</button>
          
          <div><br /><b>Active tenant id:</b></div>
          <textarea cols="35" onClick={copyValue}>{user.tenantId}</textarea>
          
          <div><br /><b>User id:</b></div>
          <textarea cols="35" onClick={copyValue}>{user.id}</textarea>
          
          <br/>
          
          <div><br /><b>JWT:</b></div>
          <textarea className="jwt" cols="70" rows="25" onClick={copyValue}>{user.accessToken}</textarea>
          
        </div>
      ) : (
        <div>
          <button onClick={() => navigate('/account/login')}>Click me to login</button>
        </div>
      )}
    </div>
  );
}

export default App;
