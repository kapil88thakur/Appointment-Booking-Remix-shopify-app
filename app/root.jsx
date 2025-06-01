import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
//import { AppProvider } from "@shopify/app-bridge-react";
// import { AppProvider } from "@shopify/shopify-app-remix/react";
// import { getSessionToken } from "@shopify/app-bridge-utils";


export default function App() {

  // const config = {
  //   apiKey: process.env.SHOPIFY_API_KEY, // from environment
  //   host: new URLSearchParams(location.search).get('host'),
  //   forceRedirect: true,
  // };
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
      
        <Outlet />
       
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
