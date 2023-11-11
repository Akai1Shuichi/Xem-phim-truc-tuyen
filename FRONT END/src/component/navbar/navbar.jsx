import React,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import useWindowSize from "../../hook/useWindowSize";
import logoPath from '../../assets/logo.png'
import avatartPath from '../../assets/avatar.jpg'
import './navbar.css';


const NavBar = ({info_check}) => {
    let arrOptions = [];
    const navigate = useNavigate();
    const screenSize = useWindowSize();
    const [offset, setOffset] = useState(0);
    
      useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
      }, []);

    return(
        <div className={`navbar_container ${offset > 30 && `after-scroll`}`}>
            <div className="navbar_item">
              <Link to={'/home'}>
                <img src={logoPath} className="header__home-logo" alt="logo" />
                </Link>
            </div>
            <div className="navbar_item" style={{display: info_check && 'none'}}>
            <img
          width={40}
          style={{ objectFit: 'contain', borderRadius: 6, marginLeft: 16 }}
          src={avatartPath}
        />
        <div className="arrow-down">
          <i className="fa fa-caret-down"></i>
          <ul className="options-user">
             <li className="option-item">
              <a className="option-btn" onClick={() => navigate("/info-user")}>Tài khoản của tôi</a></li>
             <li className="option-item">
             <a className="option-btn">Đăng xuất</a></li>
          </ul>
        </div>
            </div>
        </div>
    )
}

export default NavBar