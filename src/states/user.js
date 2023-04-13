import { createContext, useContext, useState } from 'react';
import { _setItem } from '../contexts/UserAuth';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    password: '',
    gender: '',
    avatar: '',
    birthday: '',
    location: { country: '', state: '', city: '' },
    total_solutions: 0,
    total_discussions: 0,
    total_solved: 0,
    problems: [],
  });

  const setUser = user => {
    const { location, problems, todo } = user;
    setProfile({
      username: user.username,
      email: user.email,
      password: user.password,
      gender: user.gender,
      avatar: user.avatar,
      birthday: user.birthday,
      location: { ...location },
      total_solutions: user.total_solutions,
      total_discussions: user.total_discussions,
      total_solved: user.total_solved,
      problems: user.problems,
      // todo: { ...todo },
    });
    _setItem('username', user.username);
  };

  const unSetUser = () => {
    setProfile({
      username: '',
      email: '',
      password: '',
      gender: '',
      avatar: '',
      birthday: '',
      location: { country: '', state: '', city: '' },
      total_solutions: 0,
      total_discussions: 0,
      total_solved: 0,
      problems: [],
      // todo: [],
    });
    localStorage.clear();
  };

  return (
    <ProfileContext.Provider
      value={{
        user: profile,
        setUser,
        unSetUser,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
