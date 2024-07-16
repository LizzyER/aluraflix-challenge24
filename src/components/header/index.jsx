import React from "react";
import { Link } from 'react-router-dom';
import './index.css';
import logo from '../../img/logo.png';
import home from '../../img/home.svg';
import addVideo from '../../img/addVideo.svg';
function Header() {
    return (
        <header>
            <img className="logo" src={logo} alt="Logo"></img>
            <div className="buttonsHeader">
                <Link to="">
                    <button>
                        <img className="home" src={home} alt="Home"/>
                        <span>HOME</span>
                    </button>
                </Link>
                <Link to="/newvideo">
                    <button>
                        <img className="addVideo" src={addVideo} alt="Novo Video"/>
                        <span>NOVO VÍDEO</span>
                        </button>
                </Link>
            </div>
        </header>
    )
}

export default Header;