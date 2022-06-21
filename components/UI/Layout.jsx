import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ title = "Book IT", children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
