import React from "react";
import AuthSmall from "./AuthSmall";
import AuthLarge from "./AuthLarge";

const Auth = ({ type }) => {
  return (
    <div className=" lg:grid  lg:grid-cols-12 lg:h-[calc(100vh-64px)] bg-[url('/authColor.jpg')] bg-cover bg-center bg-no-repeat">
      <AuthLarge src="/auth.jpg" href="/" />
      <AuthSmall type={type} href="/" />
    </div>
  );
};

export default Auth;
