import { useEffect, useState } from 'react'
import { login } from '../../utils/auth'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import { Link } from 'react-router-dom'
import apiInstance from '../../utils/axios'
import Products from './Products'


const Home = () => {

  // Using the 'useAuthStore' hook to get the user's authentication state
  // It returns an array with two elements: isLoggedIn and user
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  return (
    <div>
      {/* Using a conditional statement to render different views based on whether the user is logged in or not */}
      {isLoggedIn() ? <LoggedInView user={user()} /> : <LoggedOutView />}
    </div>
  );

};

const LoggedInView = ({user}) => {
  return (
    <div>
      <Products />
    </div>
  );
};

export const LoggedOutView = ({title = 'Home'}) => {
  return (
    <div>
      <Products />
    </div>
  );
} ;

export default Home;
