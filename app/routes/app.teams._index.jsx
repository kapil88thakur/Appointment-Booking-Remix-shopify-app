import { useEffect,useState } from "react";
import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  FormLayout,
  TextField,
  Button,
  Form,
  ResourceList,
  Avatar,
  ResourceItem,
} from "@shopify/polaris";
//import { authenticate } from "../shopify.server";
import { TitleBar } from "@shopify/app-bridge-react";
//import prisma from "../db.server";
import { useFetcher,useLoaderData, useNavigate,useMatches } from "@remix-run/react";
import TeamCard from "../components/teamCard";


export default function Index() {
    const fetcher = useFetcher();    // "../"
    useEffect(()=>{
    //  console.log("useeffect from team index page");
     fetcher.load("../");
      
    },[])
   // console.log("teamfetcher",fetcher);
    const navigate =useNavigate();
    const matches = useMatches();
    console.log("usemath in team index page",matches);
    const parentMatch = matches.find((match) => match.id === 'routes/app');
    const shopsession = parentMatch?.data?.shopsession;
    const userfromparent=parentMatch?.data?.shopsession.teams
    const users=fetcher.data?.shopsession.teams || userfromparent;
    console.log("ss fetcher data DATA",fetcher.data?.shopsession.teams);  //107208845
     console.log("ss usemap routes/app data DATA",userfromparent);  //107208845
    

  return (
    <Page
      title="Teams"
      primaryAction={{content: 'Team Create',
        //url: "/app/teams/create",
        onAction:()=>navigate("/app/teams/create")
        }}> 
           <Layout>
              <Layout.Section>
                 <TeamCard  team={users}/>
             </Layout.Section>
           </Layout>
      </Page>
  )
}