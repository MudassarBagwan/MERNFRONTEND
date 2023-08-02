import React from 'react';
import { BrowserRouter as Router ,Routes,Route,Navigate,} from 'react-router-dom';
import User from "../src/User/pages/User"
import MainNavigation from '../src/Shared/Navigation/MainNavigation';
import UserPlaces from './Places/pages/UserPlaces';

import NewPlace from './Places/pages/NewPlace';

import './App.css';
import UpdatePlace from './Places/pages/UpdatePlace';
import Auth from './User/pages/Auth';
import { AuthContext } from './Shared/contex/auth-contex';
import { useAuth } from './Shared/hooks/auth-hook'; 





const App = () => {
  const { token, login, logout, userId } = useAuth();

  

  let routes;

  if(token){
    routes=(
      <React.Fragment>
      <Routes>
      <Route path="/" exact element={<User />} />  
      <Route path="/places/:placeId" exact element={<UpdatePlace />} />  
      <Route path="/:userId/places" exact element={<UserPlaces />} />  
      <Route path="/places/new" exact element={<NewPlace />} />
      <Route path='*' element={<Navigate to="/" replace />}/>
      </Routes>
  
      </React.Fragment>

      
    );
  }else{
    routes=(

      <Routes>
      <Route path="/" exact element={<User />} />  
      <Route path="/:userId/places" exact element={<UserPlaces />} /> 
     
      <Route path="/auth" exact element={<Auth />} /> 
     
      </Routes>
    
      

    );
  }

  return(
  <AuthContext.Provider 
  value={{isLoggedIn:!!token,login:login,logout:logout,userId:userId,token:token}}>
  
  <Router>

<MainNavigation/>
<main>
  
{routes}
<Navigate path="/"/>
  </main>
  </Router>
  </AuthContext.Provider>
  
  )
}

export default App;
