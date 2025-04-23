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
import { useLoaderData } from "@remix-run/react";
import DobCalendar from '../components/DobCalendar';



export async  function loader({ request,params }) {

  //console.log("newshop sare",shop)
    const users = await prisma.team.findUnique({
      where: {
        // shop: shop,
        id:Number(params.id)
      }
    });
    return { users };
   }
   
   
   export async function action({ request,params }) {
    
  //   const { admin } = await authenticate.admin(request);

  //   const shopInfoQuery = `
  //   query shopInfo {
  //     shop {
  //       name
  //       url
  //       myshopifyDomain
  //     }
  //   }
  // `;
  
  //  const response= await admin.graphql(shopInfoQuery);
  // const respjson =await response.json();
  // const shop= respjson.data.shop.myshopifyDomain;
   const { session } = await authenticate.admin(request);
 const {shop}=session;





    const formData = await request.formData();
    const name = formData.get("name");
   const phone=formData.get("phone");
  // const  shop = formData.get("shop");
   const gender=formData.get("gender");
   const email=formData.get("email");
   const address=formData.get("address");
   const dob=formData.get("dob");


    const data={
      name: name,
      gender: gender,
      shop: shop,
      phone  : phone,
      email      : email,
      address     : address,
      dob     :dob
    };
     const upsertUser = await prisma.team.upsert({
      where: {
        id: Number(params.id),
      },
      update:      data   ,
      create: data,
    })
   return {message:"form submitted successfully"};
   }


export default function EditPage() {

  const { users } = useLoaderData();
   const initialState = {
     name: users.name,
    // shop:shop,
     gender: users.gender,
     phone: users.phone,
     email: users.email,
     dob:users.dob,
     address:users.address,
 }
     const [inputs, setInputs] = useState(initialState);
     const handleChange = (text,source)=>{
       setInputs(prevState => ({...prevState, [source]: text}));
 }
 const options = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'}
];
 

   return (
     <>
      <Box>

         <form method="post">
           <FormLayout> 
           {/* <TextField label="Shop name" name="shop" value={inputs.shop}  />
            */}
             <TextField label="Team name" name="name" value={inputs.name}   onChange={(e)=>handleChange(e,"name")} />
             <FormLayout.Group>
             <Select
              label="Gender"
              options={options}
              onChange={(e)=>handleChange(e,"gender")}
              value={inputs.gender}
            />
            <TextField   placeholder ="dob"  name="dob"  value={inputs.dob}  onChange={(e)=>handleChange(e,"dob")} />
          
            </FormLayout.Group>

              <FormLayout.Group>
               <TextField  placeholder ="phone"  name="phone"  value={inputs.phone}  onChange={(e)=>handleChange(e,"phone")}/>
             <TextField   placeholder ="email"  name="email"  value={inputs.email}  onChange={(e)=>handleChange(e,"email")} />
             </FormLayout.Group>
            
            
                 <TextField   placeholder ="address"  name="address"  value={inputs.address} onChange={(e)=>handleChange(e,"address")} />
              <Button submit>saves</Button> 
             {/* <button type='submit' submit>Submit</button> */}
           </FormLayout>     
         </form>
       </Box>
     </>
   )
}