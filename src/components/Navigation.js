import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaUser } from "react-icons/fa";


const Navigation = ({ userObj }) => <nav>
    <ul>
        <li>
            <Link to="/">
                <FaTwitter />
            </Link>
        </li>
        <li>
            <Link to="/profile">
                <FaUser />
                {userObj.displayName}의 Profile
            </Link>
        </li>
    </ul>
</nav>

export default Navigation;