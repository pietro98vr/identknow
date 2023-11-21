/**
 * Filename: header.js
 * Author: Pietro Montagna x Giorgia
 * Created on: 14/10/23
 * 
 * Version: 1.0
 */

/* importo i componenti necessari*/

import React, { useState, useRef} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faHome, faMagnifyingGlass, faClipboard, faAddressCard} from '@fortawesome/free-solid-svg-icons';
import "../assets/headerstyles.css";

const MyNavbar = () => {
    /* individua l'elemento selezionato e crea un riferimento allo stesso*/
    const [activeItemIndex, setActiveItemIndex] = useState(0); 
    /* 0 indica che è il primo elemento ad essere selezionato di default*/
    const navItemsRef = useRef([]); /* riferimento agli elementi della barra*/
    
    /* genero in modo dinamico la barra, così se la cambiamo è facile*/
    const navItems = [
        { icon: faHome, text: "Home" },
        { icon: faBook, text: "Casi clinici" },
        { icon: faMagnifyingGlass, text: "Approfondimenti" },
        { icon: faClipboard, text: "Quiz" },
        { icon: faAddressCard, text: "About" },
    ];
    
    /* layout della schermata e funzioni di renderizzazione dinamica degli elementi della barra*/
    return (
        <div className="navbar-container">
            <Navbar className="navbar">
            <div className="navbar-title">i Den't Know</div>
                <Nav className="nav" activeKey={activeItemIndex} onSelect={(selectedKey) => setActiveItemIndex(selectedKey)}>
                    {navItems.map(({ icon, text }, index) => (
                        <Nav.Item 
                        key={text} 
                        className={index === activeItemIndex ? "active" : ""}
                        ref={(el) => navItemsRef.current[index] = el}
                    >
                        <Nav.Link 
                            eventKey={index} 
                            className='nav-content' 
                            onClick={() => alert("Cliccando qui navigheremo alla sezione " + text)}
                        >
                            <FontAwesomeIcon className="nav-icon" icon={icon} /> 
                            <p className="nav-text">{text}</p>
                        </Nav.Link>
                    </Nav.Item>
                    ))}
                </Nav>
            </Navbar>
            <div className="navbar-banner">
                <p className="navbar-slogan">Scopri quello che non sapevi di non sapere...</p>
            </div>
        </div>
    );
};

export default MyNavbar;
