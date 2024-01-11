import { React, useState } from 'react';
import Button from '../../UI/button/button';
import Swal from 'sweetalert2';

async function loginUser(user) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((data) => data.json());
}

const UserFormLogin = ({ setToken, handleClick }) => {
  const [mailInput, setMailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInput = {
      email: mailInput,
      password: passInput,
    };
    const response = await loginUser(userInput);

    if (response.message === 'Tài khoản hoặc mật khẩu không chính xác !!!') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${response.message}`,
      });
      return;
    }

    if (response.message === 'Đăng nhập thành công !!!') {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });

      Toast.fire({
        icon: 'success',
        title: 'Đăng nhập thành công !!!',
      });
      const { token } = response;
      console.log('🚀  handleSubmit  token', token);
      setToken({ token });
    }
  };
  return (
    <div className="home_login_body">
      <div className="home_login_content">
        <div className="home_login_form">
          <h1>Đăng nhập</h1>
          <form className="login_form" onSubmit={handleSubmit}>
            <div className="input_email login_form_input">
              <input
                type="text"
                className="form_input"
                id="form_email"
                value={mailInput}
                onInput={(e) => setMailInput(e.target.value)}
              ></input>
              <label for="form_email" className="placeLabel">
                Email hoặc số điện thoại
              </label>
            </div>

            <div className="input_password login_form_input">
              <input
                type="password"
                className="form_input"
                id="form_password"
                value={passInput}
                onInput={(e) => setPassInput(e.target.value)}
              ></input>
              <label for="form_password" className="placeLabel">
                Mật khẩu
              </label>
            </div>

            <Button index={1} text="Đăng nhập" full />

            <div className="login_form_help">
              <div className="member">
                <input type="checkbox" id="check_remember"></input>
                <label for="check_remember">
                  <span>Ghi nhớ tôi</span>
                </label>
              </div>
              <a href="/">Bạn cần trợ giúp ?</a>
            </div>
          </form>
        </div>
        <div className="home_login_form_footer">
          <div className="home_login_signNow ">
            Bạn mới tham gia GVBT ?
            <a onClick={() => handleClick()}> Đăng ký ngay</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFormLogin;
