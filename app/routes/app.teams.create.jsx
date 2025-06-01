import React from 'react'
//import {LegacyCard, LegacyTabs} from '@shopify/polaris';
//import {useState, useCallback} from 'react';
import {useState,useEffect, useRef,useCallback} from 'react';
import { useFetcher,useLoaderData, useNavigate,useMatches,useMatch } from "@remix-run/react";
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
//import { authenticate } from "../shopify.server";
import prisma from "../db.server";
import TeamForm from '../components/teamForm';
   
   export async function action({ request }) {

      if (request.method === "POST") {
        const body = await request.json();
        const userdata= body.user;
     const submit = await prisma.team.create({
         data: userdata
     });
   return {submit};
    }
   }


export default function CreatePage() {
  const navigate =useNavigate();
  
  const matches = useMatches();
  const parentMatch = matches.find((match) => match.id === 'routes/app');
  const shopsession = parentMatch?.data?.shopsession;
//console.log("shopdetail from app.teams.create.jsx",shopsession)

  const initialState = {
    name: '',
    gender: '',
    phone: '',
    shop:'',
    email: '',
    dob:'',
    address:'',
}
  const [data,setData]=useState(null);
 
  async function handleButtonSubmit(){
    await fetch("/app/teams/create", {
      method: 'POST',
      body: JSON.stringify({ user: data }),
      headers: {
       // "Content-Type": "application/json",
         "Content-Type": "multipart/form-data"
      },
}
).then(res=>{
console.log('result--', res);
if(res.status == 200){
  shopify.toast.show('Team created successfully');
}else{
  shopify.toast.show('Error Occurred. Please try again !', {
    isError: true,
  });
}
}).catch(error => {
console.error('Error:', error);
});
  }

  function handleChangevalue(newdata){
    newdata.shop=shopsession.sid;
    setData(newdata);
    //console.log("user data newly creating",newdata)
  }
  
   return (
       <Page    
        backAction={{content: 'TeamPage', //url:"/app/teams",
          onAction:()=>navigate("/app/teams")}} 
        
          title="Create Team"
          primaryAction={{content: 'Save',
            onAction:handleButtonSubmit}}> 
            <Layout>
                  <Layout.Section>
                  <TeamForm passData={handleChangevalue} />  
                 </Layout.Section>
               </Layout>
          </Page>
   )
}