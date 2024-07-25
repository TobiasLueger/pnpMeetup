import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Navigation from "./components/Navigation";

import stylesheet from "~/tailwind.css";
import styles from "./styles/app.css"
import Footer from "./components/Footer";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "PNP Meetup",
  viewport: "width=device-width,initial-scale=1",
});

// export const links: LinksFunction = () => [
//   { rel: "stylesheet", href: stylesheet },
// ];

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous"},
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Jua&display=swap"},
  ]
}

export default function App() {
  return (
    <html lang="de">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-[#0a0a0a] px-5 lg:px-40 pt-[210px] lg:pt-[130px]" style={{ fontFamily: "Roboto, sans-serif", lineHeight: "1.4" }}>
        <Navigation/>
        <Outlet />
        <ScrollRestoration />
        <Footer/>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
