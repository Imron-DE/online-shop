import Button from "@/components/atoms/Button";
import InputForm from "@/components/molecule/InputForm";
import { login } from "@/service/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = () => {
  const [errorLogin, setErrorLogin] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function HandleLogin(event) {
    event.preventDefault();

    const payload = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    try {
      const res = await login(payload);
      console.log(res);

      if (res.status) {
        localStorage.setItem("token", res.token);
        router.push("/");
      } else {
        console.log("Login failed", res.error.data);
        setErrorLogin(res.error.response.data);
      }
    } catch (error) {
      console.log("Login failed", error);
      setErrorLogin(error.response);
    }
  }

  return (
    <>
      <form onSubmit={HandleLogin}>
        <InputForm label="Username" name="username" type="text" placeholder="Masukan username" />
        <InputForm label="Password" name="password" type={showPassword ? "text" : "password"} placeholder="Masukan password" />
        <div className="flex items-center mt-2">
          <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} className="mr-2" />
          <label htmlFor="showPassword" className="text-sm text-gray-600">
            Show Password
          </label>
        </div>
        <Button buttonClassname="bg-gradient-to-r  from-fuchsia-500 via-pink-500 to-purple-500 hover:from-fuchsia-600 hover:via-pink-600 hover:to-purple-600 text-white w-full mt-4" type="submit">
          Login
        </Button>
        {errorLogin && <p className="text-red-500 text-center text-sm mt-4">{errorLogin}</p>}
      </form>
    </>
  );
};

export default Login;
