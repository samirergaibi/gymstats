import { NextPage } from "next";
import Nav from "./Nav";

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
