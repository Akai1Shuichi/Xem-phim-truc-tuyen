import React, { useState } from 'react';
// import HomeLogin from "./HomeLogin";
import UserFormLogin from '../../component/User/Form/Login';
import UserFormRegister from '../../component/User/Form/Register';
import logoPath from '../../assets/logo.png';
const LoginPage = ({ setToken }) => {
  const [btnLogin, setBtnLogin] = useState(true);
  const clickBtnRegister = () => {
    setBtnLogin(!btnLogin);
  };

  return (
    <div className="home_login_container">
      <div className="home_login_background">
        <img
          className="home_login_img"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ab4b0b22-2ddf-4d48-ae88-c201ae0267e2/61d05f82-7ea2-4945-b81e-39eb2ab246d8/VN-vi-20231030-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          srcset="https://assets.nflxext.com/ffe/siteui/vlv3/ab4b0b22-2ddf-4d48-ae88-c201ae0267e2/61d05f82-7ea2-4945-b81e-39eb2ab246d8/VN-vi-20231030-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/ab4b0b22-2ddf-4d48-ae88-c201ae0267e2/61d05f82-7ea2-4945-b81e-39eb2ab246d8/VN-vi-20231030-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/ab4b0b22-2ddf-4d48-ae88-c201ae0267e2/61d05f82-7ea2-4945-b81e-39eb2ab246d8/VN-vi-20231030-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
          alt="background_img"
        ></img>
      </div>
      <div className="header__home">
        <img src={logoPath} className="header__home-logo" alt="logo" />
      </div>
      {btnLogin ? (
        <UserFormLogin setToken={setToken} handleClick={clickBtnRegister} />
      ) : (
        <UserFormRegister handleClick={clickBtnRegister} />
      )}
    </div>
  );
};

export default LoginPage;
