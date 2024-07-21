import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';
import BookmarkedPage from './Pages/BookmarkedPage';
import ProfilePage from './Pages/ProfilePage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import NotFound from './Pages/NotFound';
import ProblemList from './Components/ProblemList';
import { useSelector } from 'react-redux';
import Loading from './Components/Loading';
import ProblemDetails from './Components/ProblemDescription/ProblemDetails';
import WorkSpace from './Components/WorkSpace';



const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const App = () => {
  const isLoggedIn = useSelector((state ) => state ?. auth ?.isLoggedIn);
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/problem/:id" element={<WorkSpace />} />

          <Route path="/bookmarks" element={<BookmarkedPage />} />
          { isLoggedIn && <Route path="/profile" element={<ProfilePage />} />}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/loading" element={<Loading />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
};

export default App;