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
import ServiceCreate from '../components/serviceCreate';



export async  function loader({ request }) {
   const { session } = await authenticate.admin(request);
  const { shop } = session;
       return {shop};
   }
   
   
   export async function action({ request }) {
    const submit = await prisma.team.create({
      data: { 
             name: "name",
             gender: "gender",
             shop: "shop",
             phone  : "phone",
             email      : "email",
             address     : "address",
             dob     :"dob"
        }
  });
   return {message:"form submitted successfully"};
   }
  

export default function CreatePage() {

  function  handleClick(inputs){
    console.log("values comes back from child",inputs);
   
  }

  const { shop } = useLoaderData();

   return (
     <>
      <Card>

       <ServiceCreate shop={shop} handleClick={handleClick} />  
        
       </Card>
     </>
   )
}