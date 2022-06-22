import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ title = "Next Js Project", children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <ToastContainer />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
