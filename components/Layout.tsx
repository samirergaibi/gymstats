import Nav from "./Nav";

const Layout: React.FC = ({ children }) => {
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
