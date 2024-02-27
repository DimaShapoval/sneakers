import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputWithError from "../Components/UI/InputWithError";
import logo from "./logo.png";
import useFormAndValidation from "../Hooks/useFormAndValidation";
import axios from "axios";

function Register({ isLoading, onSubmit }) {
  const URL_API = `${window.location.protocol}//${window.location.hostname}:1721/sneakers`;
  const [ checkForm, setCheckFrom ] = useState(false)
  const {
    handleChange,
    values,
    errors,
    setErrors,
    isFormValid,
    setIsFormValid,
    resetForm,
  } = useFormAndValidation();

  useEffect(() => {
    if (values["password"] !== values["confirmPass"]) {
      setErrors({
        ...errors,
        ["confirmPass"]: "Пароли не совпадают",
      });
      setIsFormValid(false);
    } else {
      setErrors({});
    }
  }, [isFormValid, values["confirmPass"]]);

  const postUser = () => {
    let userData = {
      email: values["email"],
      address: values["address"],
      password: values["password"]
    }
    axios.post(URL_API + '/sign-up', JSON.stringify(userData))
    .then(res =>{
      if(!res.data){
        alert("Такой пользователь уже существует!");
        setCheckFrom(false)
      }
      else{
        alert("Регистрация успешна")
        setCheckFrom(true)
        localStorage.setItem('userName', userData.email)
        window.location = '/'
      }
    })
    
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    postUser();
  };

  return (
    <div className="login">
      <form className="login__form" noValidate>
        <img className="logo logo_type_login" src={logo} alt="Кроссовки" />
        <h1 className="login__title">Регистрация</h1>
        <InputWithError
          value={values["email"] || ""}
          onChange={handleChange}
          type="email"
          placeholder="Почта"
          name="email"
          isInvalid={errors["email"] ? true : false}
          errorText={errors["email"]}
          required
        />
        <InputWithError
          value={values["address"] || ""}
          onChange={handleChange}
          type="text"
          placeholder="Адресс"
          name="address"
          isInvalid={errors["address"] ? true : false}
          errorText={errors["address"]}
          required
        />
        <InputWithError
          value={values["password"] || ""}
          onChange={handleChange}
          type="password"
          placeholder="Пароль"
          name="password"
          minLength="8"
          maxLength="40"
          isInvalid={errors["password"] ? true : false}
          errorText={errors["password"]}
          required
        />
        <InputWithError
          value={values["confirmPass"] || ""}
          onChange={handleChange}
          type="password"
          placeholder="Подтвердите пароль"
          name="confirmPass"
          minLength="8"
          maxLength="40"
          isInvalid={errors["confirmPass"] ? true : false}
          errorText={errors["confirmPass"]}
          required
        />
        <button onClick={handleSubmit}
          className={`button_log button_type_login ${
            isFormValid ? "" : "button_type_disabled"
          }`}
          disabled={!isFormValid}
        >
          {isLoading ? "Загрузка..." : "Создать аккаунт"}
        </button>
        <p className="login__text">
          Уже зарегистрированы?{" "}
          <Link className="login__link" to="/sign-in">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;