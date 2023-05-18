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

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-[#0a0a0a] px-40">
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
