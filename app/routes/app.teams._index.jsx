import { useState } from "react";
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
import { authenticate } from "../shopify.server";
import { TitleBar } from "@shopify/app-bridge-react";
import prisma from "../db.server";
import { useLoaderData } from "@remix-run/react";
import TeamCard from "../components/teamCard";


export async  function loader({ request }) {
    const { session } = await authenticate.admin(request);
  const { shop } = session;
    const users = await prisma.team.findMany({
      where: {
        shop: shop
      }
    });
    return { users };
}


// export async function action({ request }) {


  // console.log("req made at app team create file",request)
  // const { session } = await authenticate.admin(request);
  // const { shop } = session;
  
  
  //   const formData = await request.formData();
  //   const name = formData.get("name");
  // const phone=formData.get("phone");
  // const gender=formData.get("gender");
  // const email=formData.get("email");
  // const address=formData.get("address");
  // const dob=formData.get("dob");
  //   const submit = await prisma.team.create({
  //       data: { 
  //           name: name,
  //       gender: gender,
  //       shop: shop,
  //       phone  : phone,
  //       email      : email,
  //       address     : address,
  //       dob     :dob
  //         }
  //   });
  //   //const submit = await prisma.team.create({data:inputs});
  //   return {
  //       submit,
  //   };

  
 
// }

export default function Index() {
    const { users } = useLoaderData();
  return (
      <TeamCard  team={users}/>
  )
}
