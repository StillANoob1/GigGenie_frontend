import React, { useEffect, useState } from 'react';
import "./Navbar.scss";
import {Link, useLocation, useNavigate } from 'react-router-dom';
import profileimg from "../../img/man.png";
import nodp from "../../img/nodp.png";
import axios from 'axios';
import close from "../../img/close.png";
import navicon from "../../img/navicon.png";
import { serverUrl } from '../../utils/serverUrl';
const Navbar = () => {
    const [active, setActive] = useState(false);
    const [options, setOptions] = useState(false);
    const [mobileLinks, setmMobileLinks] = useState(false)
    const [mobileoptions, setMobileoptions] = useState(false)

    const navigate = useNavigate();
    const { pathname } = useLocation()

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false)
    }


    useEffect(() => {
        window.addEventListener("scroll", isActive);

        return () => {
            window.removeEventListener("scroll", isActive);
        }
    }, [])

    const user = JSON.parse(localStorage.getItem("currentUser"))

    const handleLogout = async () => {
        try {
            await axios.post(`${serverUrl}/api/auth/logout`, {
                withCredentials: true
            })
            localStorage.setItem("token", null);
            localStorage.setItem("currentUser", null)
            navigate("/");



        } catch (error) {
            console.log(error);
        }
    }





    return (
        <div className={(active || pathname !== "/") ? "navbar active" : "navbar"}>
            <div className="container">
                <div className="logo">
                    <Link to="/" className='link'>
                        <span className='text' >GigGenie</span>
                    </Link>
                    <span className='dot'>.</span>
                </div>
                <div className={mobileLinks ? "links mobileLinks" : "links"}>
                    <span>Business</span>

                    <span className='explore' style={{cursor:'pointer'}} onClick={()=>navigate(`/gigs?category=`)}>Explore</span>
                    {user && <>{user?.isSeller && <>
                                    <Link to='/mygigs' className="mobilelink">Gigs</Link>
                                    <Link to='/add' className="mobilelink">Add New Gig</Link>
                                </>}
                    
                                <Link to='/orders' className="mobilelink">Orders</Link>
                                <Link to='/messages' className="mobilelink">Messages</Link>
                                <Link className="mobilelink" onClick={handleLogout} >Logout</Link>
                                </>}
                    <span>English</span>
                    {!user && <Link style={{fontWeight:'bold'}} to="/login" className='link'>Sign in</Link>}
                    {!user?.isSeller && (<span>Become a Seller</span>)}
                    {!user && (<button onClick={() => navigate("/register")}>Join</button>)}
                    {user && (
                        <div className="user" onClick={() => setOptions(!options)}>
                            <img src={user?.img || nodp} alt="" />
                            <span>{user?.username}</span>
                            {options && (<div className="options">
                                {user.isSeller && <>
                                    <Link to='/mygigs' className="link">Gigs</Link>
                                    <Link to='/add' className="link">Add New Gig</Link>
                                </>}
                                <Link to='/orders' className="link">Orders</Link>
                                <Link to='/messages' className="link">Messages</Link>
                                <Link className="link" onClick={handleLogout} >Logout</Link>
                            </div>)}
                        </div>
                    )}

                </div>

            </div>
            <div className="hambergur" onClick={() => setmMobileLinks(!mobileLinks)}>
                { mobileLinks? <img src={close} alt="" />: <img src={navicon} alt="" />}
            </div>
            {user && (
                        <div className="mobileuser" onClick={() => setMobileoptions(!mobileoptions)}>
                            <img src={user?.img || profileimg} alt="" />
                            <span>{user?.username}</span>
                            {mobileoptions && (<div className="mobileoptions">
                                {user.isSeller && <>
                                    <Link to='/mygigs' className="link">Gigs</Link>
                                    <Link to='/add' className="link">Add New Gig</Link>
                                </>}
                                <Link to='/orders' className="link">Orders</Link>
                                <Link to='/messages' className="link">Messages</Link>
                                <Link className="link" onClick={handleLogout} >Logout</Link>
                            </div>)}
                        </div>
                    )}
            {!user && (<button onClick={() => navigate("/register")} className='outbutton'>Join</button>)}
            {(active || pathname !== "/") && (<>
                <hr />
                <div className="menu">
                    <Link className='link' to='' >
                        Graphics & Design
                    </Link>
                    <Link className='link' to='' >
                        Video & Animation
                    </Link>
                    <Link className='link' to='' >
                        Writing & Translation
                    </Link>
                    <Link className='link' to='' >
                        Al Services
                    </Link>
                    <Link className='link' to='' >
                        Digital Marketing
                    </Link>
                    <Link className='link' to='' >
                        Music & Audio
                    </Link>
                    <Link className='link' to='' >
                        Programming & Tech
                    </Link>
                    <Link className='link' to='' >
                        Business
                    </Link>
                    <Link className='link' to='' >
                        Lifestyles
                    </Link>
                </div>
            </>)}
        </div>
    )
}

export default Navbar