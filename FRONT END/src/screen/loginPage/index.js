import { React, useState } from 'react';
import Logo from '../../component/UI/Logo';
// import HomeLogin from "./HomeLogin";
import UserFormLogin from '../../component/User/Form/Login';
import UserFormRegister from '../../component/User/Form/Register';
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
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ab180a27-b661-44d7-a6d9-940cb32f2f4a/aa5a0cda-c48e-443d-a54b-ed77fd14340a/VN-vi-20231009-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/ab180a27-b661-44d7-a6d9-940cb32f2f4a/aa5a0cda-c48e-443d-a54b-ed77fd14340a/VN-vi-20231009-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/ab180a27-b661-44d7-a6d9-940cb32f2f4a/aa5a0cda-c48e-443d-a54b-ed77fd14340a/VN-vi-20231009-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/ab180a27-b661-44d7-a6d9-940cb32f2f4a/aa5a0cda-c48e-443d-a54b-ed77fd14340a/VN-vi-20231009-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
          alt="background_img"
        ></img>
      </div>
      <Logo />
      {btnLogin ? (
        <UserFormLogin setToken={setToken} handleClick={clickBtnRegister} />
      ) : (
        <UserFormRegister handleClick={clickBtnRegister} />
      )}
    </div>
  );
};

export default LoginPage;
