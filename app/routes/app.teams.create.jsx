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



export async  function loader({ request }) {
   const { session } = await authenticate.admin(request);
  const { shop } = session;
       return {shop};
   }
   
   
   export async function action({ request }) {
    
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
     const submit = await prisma.team.create({
         data: { 
                name: name,
                gender: gender,
                shop: shop,
                phone  : phone,
                email      : email,
                address     : address,
                dob     :dob
           }
     });
     //const submit = await prisma.team.create({data:inputs});
    //  return {
    //      submit,
    //  };
   return {message:"form submitted successfully"};
   }


export default function CreatePage() {

  const { shop } = useLoaderData();
   const initialState = {
     name: '',
    // shop:shop,
     gender: '',
     phone: '',
     email: '',
     dob:"",
     address:""
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
      <Card>

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
       </Card>
     </>
   )
}