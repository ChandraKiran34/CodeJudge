import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import ProblemPage from './Pages/ProblemPage';
import BookmarkedPage from './Pages/BookmarkedPage';
import ProfilePage from './Pages/ProfilePage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import { toast } from 'react-hot-toast';



// Mock data
const problems = [
  { _id: '1', name: 'Two Sum', code: 'two-sum', difficulty: 'Easy', statement: '...' },
  // more problems
];
const user = {
  userId: 'user1',
  email: 'user1@example.com',
  dob: new Date(),
  solved_problems: ['1'],
  notes: [],
  bookmarked_problems: ['1']
};

const App = () => {

  // useEffect(()=>{
  //   toast.error("success");
  // },[])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage problems={problems} />} />
        <Route path="/problem/:code" element={<ProblemPage problems={problems} />} />
        <Route path="/bookmarks" element={<BookmarkedPage user={user} problems={problems} />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/register" element={<RegisterPage  />} />
        <Route path="/login" element = {<LoginPage />} />
      </Routes>
    </>

  );
};

export default App;
