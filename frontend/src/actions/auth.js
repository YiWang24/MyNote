"use server";
import { redirect } from "next/navigation";
// import { registerUser, loginUser } from "./user";
import { authApi } from "@/api/auth";
import { credentialsLogin } from "@/lib/actions/auth";

function validateAuthInput(type, formData) {
  const { first_name, last_name, email, password, password_confirmation } =
    formData;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  let errors = [];
  if (
    (type === "register" &&
      (!first_name || !last_name || !password_confirmation)) ||
    !email ||
    !password
  ) {
    errors.push("All fields are required");
  }

  if (!emailRegex.test(email)) {
    errors.push("Please enter a valid email address");
  }

  if (!passwordRegex.test(password)) {
    errors.push(
      "Password must be at least 8 characters long and contain at least one letter and one number"
    );
  }

  if (type === "register" && password !== password_confirmation) {
    errors.push("Passwords do not match");
  }

  return errors;
}

export async function register(prevState, formData) {
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const email = formData.get("email");
  const password = formData.get("password");
  const password_confirmation = formData.get("password_confirmation");
  const marketing_Accept = formData.get("marketing_accept");

  const data = {
    first_name,
    last_name,
    email,
    password,
    password_confirmation,
  };

  let errors = validateAuthInput("register", data);

  if (errors.length > 0) {
    return {
      enteredValues: {
        first_name,
        last_name,
        email,
      },
      errors,
    };
  }

  try {
    let marketingAccept = false;
    if (marketing_Accept) {
      marketingAccept = true;
    }
    await authApi.register({
      email,
      password,
      firstName: first_name,
      lastName: last_name,
      marketingAccept,
    });
    // console.log(response);
  } catch (err) {
    return {
      enteredValues: {
        first_name,
        last_name,
        email,
      },
      errors: ["User already exists "],
    };
  }
  redirect("/auth?type=login");
}

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const data = {
    email,
    password,
  };
  let errors = validateAuthInput("login", data);
  if (errors.length > 0) {
    return {
      enteredValues: {
        email,
      },
      errors,
    };
  }

  try {
    await credentialsLogin(data);

    // console.log(response);
  } catch (err) {
    return {
      enteredValues: {
        email,
      },
      errors: ["Invalid email or password"],
    };
  }
  redirect("/notes");
}

export async function authAction(type, prevState, formDate) {
  if (type === "login") {
    return login(prevState, formDate);
  } else {
    return register(prevState, formDate);
  }
}
