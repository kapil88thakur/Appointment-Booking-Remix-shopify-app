import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";
//import { AppProvider } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
export const links = () => [{ rel: "stylesheet", href: polarisStyles }];
import prisma from "../db.server";
import { gql } from "graphql-request";
// export const loader = async ({ request }) => {
//   await authenticate.admin(request);

//   return { apiKey: process.env.SHOPIFY_API_KEY || "" };
// };

function getProductsByIds(){
  return gql`
  query getProductsByIds($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        description
      }
    }
  }
`;
}
export async  function loader({ request }) {
  const { session,admin } = await authenticate.admin(request);
const { shop } = session;
  const shopsession = await prisma.session.findFirst({
    where: {
      shop: shop
    },
    include: {
      teams: {
        include: {
          services: true,
        },
      },
      services: {
        include: {
          teams: {
            select:{
              name:true,
              phone:true
            }
          }
        },
      },
    }
  });
const servicesList= shopsession.services;

const prodIds=shopsession.services.map(service => service.productId);
const ids = {  ids:prodIds };  
//graphql to get products detail wrt gid saved in db 
const GET_PRODUCTS_BY_IDS=getProductsByIds();
const response = await admin.graphql(GET_PRODUCTS_BY_IDS, {variables:ids});
const parsedResponse = await response.json();
const graphqlData=parsedResponse.data.nodes;



//console.log("graphqldata is",graphqlData);


const servicemerged = shopsession.services.map(item2 => {
  const match = graphqlData.find(item1 => item1.id === item2.productId);
 // return match ? { ...item2, ...match } : item2;
   return match ? { ...match, ...item2 } : item2;
});
//console.log("service merged is",servicemerged);


const mergedTeams = shopsession.teams.map(team => ({
  ...team,
  services: team.services.map(service => {
    const extra = graphqlData.find(extra => extra.id === service.productId);
    return extra ? { ...extra, ...service } : service;
  }),
}));

//console.log("mergedTeams merged is",mergedTeams);




  const updatedData = {
    ...shopsession,
    services: servicemerged,
    teams:mergedTeams
  };


  return { shopsession:updatedData,
     apiKey: process.env.SHOPIFY_API_KEY || ""
   };
}

// const config = {
//   apiKey: process.env.SHOPIFY_API_KEY, // from environment
//   host: new URLSearchParams(window.location.search).get("host"),
//   forceRedirect: true,
// };
export default function App() {
  const { apiKey } = useLoaderData();
  const { shopsession } = useLoaderData();
  console.log("shop detail from app.jsx",shopsession)
  return (
    <AppProvider isEmbeddedApp apiKey={apiKey} >
      <NavMenu>
        <Link to="/app" rel="home">Home</Link>
        <Link to="/app/teams">Teams</Link> 
        {/* <Link to="/app/teams/create">Create Team</Link>  */}
        <Link to="/app/service">Service</Link> 
        <Link to="/app/calendar">Calendar</Link> 
      </NavMenu>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
