import {React,useState} from "react";
import './Register.css'
let savedUser = []

async function RegisterUser(user) {
  return fetch('http://localhost:8080/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then((data) => data.json())
}
const UserFormRegister = (props) => {
  const [nameInput,setNameInput] = useState('')
  const [ageInput,setAgeInput] = useState(20)
  const [phoneInput,setPhoneInput] = useState('')
  const [mailInput,setMailInput] = useState('')
  const [passInput,setPassInput] = useState('')
  const [passReInput,setPassReInput] = useState('')
  const [user,setUser] = useState(savedUser)

  const handleRegisterSubmit = async e => {
    e.preventDefault();
    const userInput = {
      name: nameInput,
      age: ageInput,
      phone: phoneInput,
      email: mailInput,
      password: passInput,
    }
    const response = await RegisterUser(userInput);
    console.log(response)
  }
  const addUser = (u) => {
    const list = [...user,u];
    setUser(list)
    savedUser = list
  }

    return (
        <div className="home_login_body">
      <div className="home_login_content">
        <div className="home_login_form">
          <h1>Đăng ký</h1>
          <form className="login_form" onSubmit={handleRegisterSubmit}>
          <div className="input_name login_form_input">
              <input type="text" className="form_input" id="form_name"
              value={nameInput}
              onInput={(e) => setNameInput(e.target.value)}
              ></input>
              <label for="form_name" className="placeLabel">
                Name
              </label>
            </div>

            <div className="input_email login_form_input">
              <input type="text" className="form_input" id="form_email"
              value={mailInput}
              onInput={(e) => setMailInput(e.target.value)}
              ></input>
              <label for="form_email" className="placeLabel">
                Email
              </label>
            </div>

            <div className="more_infor">
              <div className="input_email login_form_input">
                <input type="text" className="form_input" id="form_phone"
                value={phoneInput}
                onInput={(e) => setPhoneInput(e.target.value)}
                ></input>
                <label for="form_phone" className="placeLabel">
                  Phone
                </label>
              </div>
              <div className="age_form">
                <span>Age :</span>
                <input type="number" value={ageInput} min="0"
                onInput={(e) => setAgeInput(Number(e.target.value))}
                />
              </div>
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

            <div className="input_password login_form_input ">
                <input
                  type="password"
                  className="form_input"
                  id="form_password_repeat"
                  value={passReInput}
                  onInput={(e) => setPassReInput(e.target.value)}
                ></input>
                <label for="form_password_repeat" className="placeLabel">
                  Nhập Lại Mật khẩu
                </label>
            </div>

            {/* <button className="btnLogin"
            onClick={(e) => {
              e.preventDefault()
              addUser({mail : mailInput,pass : passInput,repass: passReInput})
            }
            }>
              Đăng ký
            </button> */}
            <button className="btnLogin">
              Đăng ký
            </button>

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
            <a
              style={{display: 'block' }}
              onClick={() => props.handleClick()}
            >
              Đăng nhập ngay
            </a>
            .
          </div>
        </div>
      </div>
    </div>
    )
}

export default UserFormRegister