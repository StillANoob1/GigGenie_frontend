import React from 'react';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter,Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";


import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Gig from "./pages/gig/Gig";
import Gigs from "./pages/gigs/Gigs";
import Login from "./pages//login/Login";
import Message from "./pages/message/Message";
import Messages from "./pages/messages/Messages";
import MyGigs from "./pages/myGigs/MyGigs";
import Orders from "./pages/orders/Orders";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import {Toaster} from "react-hot-toast";


import "./App.scss"





const App = () => {
  
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
  <BrowserRouter>
  <Toaster/>
    <Navbar />
    
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/gig/:id' element={<Gig />} />
      <Route path='/gigs' element={<Gigs />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/mygigs' element={<MyGigs />} />
      <Route path='/add' element={<Add />} />
      <Route path='/messages' element={<Messages/>} />
      <Route path='/message/:id' element={<Message />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>

  
    <Footer />
 </BrowserRouter>
 </QueryClientProvider>
  )
}

export default App
