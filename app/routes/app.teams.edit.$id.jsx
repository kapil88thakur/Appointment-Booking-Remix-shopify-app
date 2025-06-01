//import React,{useState} from 'react'
//import {LegacyCard, LegacyTabs} from '@shopify/polaris';
//import {useState, useCallback} from 'react';

import {useState,useEffect, useRef,useCallback} from 'react';
import {
  LegacyCard, LegacyTabs,DatePicker,
  Box,
  Select,
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
  InlineGrid
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";
import { useFetcher, useLoaderData,useMatches } from "@remix-run/react";
import DobCalendar from '../components/DobCalendar';
import TeamForm from '../components/teamForm';
//import { useFeatures } from '@shopify/polaris/build/ts/src/utilities/features';



export async  function loader({ request,params }) {

    const userID=Number(params.id);
  
    return {userID}
   }
   
   
  export async function action({ request,params }) {
    
  const { session } = await authenticate.admin(request);
    if (!session) return redirect('/auth/login'); // Important!
    const { shop } = session;
 
  if (request.method === "POST") {
    const body = await request.json();
    const userdata= body.user;
    //userdata.shop=shop;

     const upsertUser = await prisma.team.update({
      where: {
        id: Number(params.id),
      },
      data:      userdata   ,
     // create: userdata,
    })
   return {message:"form submitted successfully"};
  }
}


export default function EditPage() {
  const fetcher = useFetcher();    // "../"
    useEffect(()=>{
     fetcher.load("../../../app");
    },[])
  const { userID } = useLoaderData();
  const matches = useMatches();
  const parentMatch = matches.find((match) => match.id === 'routes/app');
  const shopsession = parentMatch?.data?.shopsession;
  const teams=parentMatch?.data?.shopsession.teams
  const parentuser = teams.find((match) => match.id === userID);
  console.log("edit page outlet useMatch are routes/app",parentuser);
  const fetcherteams=fetcher.data?.shopsession.teams ;
  const fetcheruser = fetcher.data?fetcherteams.find((match) => match.id === userID):null;
  console.log("edit page fetcherteams are",fetcheruser);
  const user= fetcheruser?fetcheruser:parentuser;
  // const initialState = {
  //   name: user.name,
  //   shop:user.shop,
  //   gender: user.gender,
  //   phone: user.phone,
  //   email: user.email,
  //   dob:user.dob,
  //   address:user.address,
  // }

const [data,setData]=useState(null);
async function handleButtonSubmit(){
  await fetch(`/app/teams/edit/`+(user.id), {
    method: 'POST',
    body: JSON.stringify({ user: data }),
    headers: {
           "Content-Type": "multipart/form-data"
    },
  }).then(res=>{
    if(res.status == 200){
      shopify.toast.show('Team Edit successfully');
    }else{
      shopify.toast.show('Error Occurred. Please try again !', {isError: true });
    }
  }).catch(error => {
    console.error('Error:',error);
  });
}

function handleChangevalue(newdata){
  setData(newdata);
}
    console.log("userpassed is",user);
    return (
      <>
        <Page    
          backAction={{content: 'TeamPage', url:"/app/teams"}}
          title="Create Team"
          primaryAction={{content: 'Save',
          onAction:handleButtonSubmit}}> 
          <Layout>
            <Layout.Section>
              <TeamForm user={user} userID= {userID}   passData={handleChangevalue}  />
            </Layout.Section>
          </Layout>
        </Page>
      </>
   )
}