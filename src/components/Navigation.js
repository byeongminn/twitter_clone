import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaUser } from "react-icons/fa";


const Navigation = ({ userObj }) => <nav>
    <ul id="nav">
        <li>
            <Link to="/" id="nav__home">
                <FaTwitter />
            </Link>
        </li>
        <li>
            <Link to="/profile" id="nav__profile">
                <span><FaUser /></span>
                <span>{userObj.displayName}의 Profile</span>
            </Link>
        </li>
    </ul>
</nav>

export default Navigation;