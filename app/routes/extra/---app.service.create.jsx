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
 import { authenticate } from "../../shopify.server";
 import prisma from "../../db.server";
import { useLoaderData,useSubmit,useFetcher} from "@remix-run/react";
import DobCalendar from '../../components/DobCalendar';
//import ServiceCreate from '../components/serviceCreate';
import ProductPicker from '../../components/ProductPicker';



export async  function loader({ request }) {
   const { session } = await authenticate.admin(request);
   if (!session) return redirect('/auth/login');
  const { shop } = session;
       return {shop};
      // const session = await getSession(request);
      

   }
   
   
   export async function action({ request }) {

    const { session } = await authenticate.admin(request);
    if (!session) return redirect('/auth/login'); // Important!
    const { shop } = session;
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
   return {message:"form submitted successfully"};
   }
  

export default function CreatePage() {


  const { shop } = useLoaderData();
 
   return (
     <>
      <Card>

       <ProductPicker />  
      
       </Card>
     </>
   )
}