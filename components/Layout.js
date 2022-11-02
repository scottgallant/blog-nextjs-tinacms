// import Link from 'next/link'
import Head from 'next/head'
import Navbar from "./navbar";
// import Footer from "./footer";
import layoutData from "../content/settings/settings.json";

export const Layout = (props, { data = layoutData }) => {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="A TinaCMS Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" bg-primary-100">
        <Navbar data={data} />
      </div>
      <div className="mt-12 max-w-3xl mx-auto sm:px-6 px-6 md:px-0 min-h-screen">
        <main>{props.children}</main>
      </div>
      {/* <Footer data={data} /> */}
    </>
  )
}
