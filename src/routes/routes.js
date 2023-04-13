import { Routes as Routers, Route } from 'react-router-dom';
import Home from '../pages/home';
import Problems from '../pages/problems';
import Profile from '../pages/profile/Profile';
import Feedback from '../pages/feedback';
import Login from '../pages/accounts/Login';
import Signup from '../pages/accounts/Signup';
import EditProfile from '../pages/editProfile/EditProfile';
import Problem from '../pages/problem';
import Discussion from '../pages/discussions';

export const Routes = () => {
  return (
    <Routers>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/accounts/signup" element={<Signup />} />
      <Route path="/accounts/login" element={<Login />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/problems" element={<Problems />} />
      <Route path="/problems/:pid" element={<Problem />} />
      <Route path="/problems/:pid/discussions" element={<Discussion />} />
      <Route path="/:username/profile" element={<EditProfile />} />
      <Route path="/:username" element={<Profile />} />
    </Routers>
  );
};
