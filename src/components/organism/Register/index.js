import Button from "@/components/atoms/Button";
import InputForm from "@/components/molecule/InputForm";
import React, { useState, useRef } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    city: "",
    street: "",
    number: "",
    zipcode: "",
    phone: "",
  });
  const [error, setError] = useState(null);
  const modalRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          name: {
            firstname: formData.firstname,
            lastname: formData.lastname,
          },
          address: {
            city: formData.city,
            street: formData.street,
            number: parseInt(formData.number),
            zipcode: formData.zipcode,
            geolocation: {
              lat: "-37.3159",
              long: "81.1496",
            },
          },
          phone: formData.phone,
        }),
      });

      const data = await res.json();
      console.log("data =>", data);

      if (res.ok) {
        console.log("Registration Successful");
        modalRef.current.style.display = "flex";
      } else {
        setError("Registration failed. Please check your data.");
      }
    } catch (error) {
      console.error("Registration Failed:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const closeModal = () => {
    modalRef.current.style.display = "none";
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
        <InputForm label="Username" name="username" type="text" placeholder="Masukkan username" value={formData.username} onChange={handleChange} />
        <InputForm label="Email" name="email" type="email" placeholder="Masukkan email" value={formData.email} onChange={handleChange} />
        <InputForm label="Password" name="password" type={showPassword ? "text" : "password"} placeholder="Masukkan password" value={formData.password} onChange={handleChange} />
        <div className="flex items-center mt-2">
          <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} className="mr-2" />
          <label htmlFor="showPassword" className="text-sm text-gray-600">
            Show Password
          </label>
        </div>
        <InputForm label="First Name" name="firstname" type="text" placeholder="Masukkan first name" value={formData.firstname} onChange={handleChange} />
        <InputForm label="Last Name" name="lastname" type="text" placeholder="Masukkan last name" value={formData.lastname} onChange={handleChange} />
        <InputForm label="City" name="city" type="text" placeholder="Masukkan city" value={formData.city} onChange={handleChange} />
        <InputForm label="Street" name="street" type="text" placeholder="Masukkan street" value={formData.street} onChange={handleChange} />
        <InputForm label="House Number" name="number" type="number" placeholder="Masukkan house number" value={formData.number} onChange={handleChange} />
        <InputForm label="Zip Code" name="zipcode" type="text" placeholder="Masukkan zip code" value={formData.zipcode} onChange={handleChange} />
        <InputForm label="Phone" name="phone" type="text" placeholder="Masukkan phone number" value={formData.phone} onChange={handleChange} />
        <Button buttonClassname="bg-gradient-to-r  from-fuchsia-500 via-pink-500 to-purple-500 hover:from-fuchsia-600 hover:via-pink-600 hover:to-purple-600 text-white w-full mt-4" type="submit">
          Register
        </Button>
        {error && <p className="text-red-500 text-center text-sm mt-4">{error}</p>}
      </form>

      {/* Modal Sukses */}
      <div ref={modalRef} className="fixed inset-0 hidden items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
          <h2 className="text-2xl font-semibold text-green-600">Registrasi Berhasil!</h2>
          <p className="mt-2 text-gray-600">Akun Anda telah berhasil dibuat.</p>
          <Button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
