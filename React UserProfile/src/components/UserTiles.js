import React from 'react';
import "./UserTiles.css";
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa';

export default function UserTiles({user}) {
    return (
        <div className='userData'>
            <img src={user["avatar"]} alt=""/>
            <p className="name">{user["first_name"]} {user["last_name"]}</p>
            <p className='email'>{user["email"]}</p>
            <div className='social'>
                <a href='#'><FaFacebookSquare/></a>
                <a href='#'><FaTwitterSquare/></a>
                <a href='#'><FaLinkedin/></a>
            </div>
        </div>
    )
}
