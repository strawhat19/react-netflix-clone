import * as React from 'react';
import{useState, useEffect, useContext} from "react";
import Piratechs from '../Piratechs/piratechs';
import "./styles/footer.css";

// Disable the Global and the Interface before pushing to Heroku
// declare global {
//     namespace JSX {
//         interface IntrinsicElements {
//             'footer': CustomElement,
//         }
//     }
//   }
  
//   interface CustomElement extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
//     heading?: string,
//     subHeading?: string,
//     [key: string]: any
//   }

const Footer: React.FC = () => {
    const date = new Date();
    const year = date.getFullYear();
    
    return (
        <footer className={`footer red`}>
            <div className={`innerFooter`}>
                <div className="nameText">
                    <a className="customLink hoverLink" href="https://github.com/strawhat19/react-netflix-clone" target="_blank" title="React Netflix Clone"><i className="fab fa-github"></i> | React Netflix Clone</a>
                </div>
                <div className="piratechs siteDesign">
                    <a href="https://piratechs.com/" target="_blank" className="piratechs"><Piratechs /></a>
                    <a href="https://piratechs.com/" target="_blank" className="piratechsLink hoverLink">
                        Piratechs
                    </a>
                </div>
                <div className="siteText copyright">Copyright <i className="fas fa-copyright"></i> {year}</div>
            </div>
        </footer>
    );
}

export default Footer