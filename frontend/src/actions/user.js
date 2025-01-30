"use server";
// import { credentialsLogin } from "@/lib/actions/auth";
import connectDB from "@/lib/mongodb";
import { User } from "@/models/User";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
const registerUser = async (formData) => {
  const {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    marketingAccept,
  } = formData;

  await connectDB();
  const existingUser = await User.findOne({ email });

  const hashedPassword = await hash(password, 12);

  if (existingUser) {
    throw new Error("User already exists");
  }

  await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    marketingAccept,
  });

  console.log("User created successfully", email);
};

// const loginUser = async (formData) => {
//   const { email, password } = formData;
//   try {
//     await credentialsLogin(email, password);
//   } catch (error) {
//     throw new CredentialsSignin("Invalid email or password");
//   }
// };

// export { registerUser, loginUser };
