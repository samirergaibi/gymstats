import type { NextPage } from "next";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";

const Home: NextPage = () => {
  return (
    <>
      <h1>GymStats 💪</h1>
      <h2>Login</h2>
      <LoginForm />

      <hr />

      <h2>Sign up</h2>
      <SignupForm />
    </>
  );
};

export default Home;
