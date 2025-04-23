import { useState } from "react";
// import { Outlet } from "@remix-run/react";
// import { useParams } from "@remix-run/react";
// import { getPageByHandle } from "../lib.shopify";
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
//import { json, redirect } from "@remix-run/node";
import { authenticate } from "../../shopify.server";
import { TitleBar } from "@shopify/app-bridge-react";
//import {PrismaClient} from "@prisma/client";
import prisma from "../../db.server";
import { useLoaderData } from "@remix-run/react";
import TeamTable from "../../components/teamTable";
import TeamCreate from "../../components/teamCreate";
import TeamCard from "../../components/teamCard";
import TeamList from "../../components/teamList";
  //import { authenticate } from "../shopify.server";
export async  function loader({ request,params }) {
    const users = await prisma.team.findMany();
    return { users };
}


export async function action({ request }) {
  const { session } = await authenticate.admin(request);
  const { shop } = session;

  // const {shop_id}=await prisma.session.find({
  //   where: { shop:shop }
  // });
    const formData = await request.formData();
    const name = formData.get("name");
  const phone=formData.get("phone");
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
    return {
        submit,
    };
 
}
// export default function TeamsPage() {
// return(<>kapil</>)
// }

export default function Index() {
   const { users } = useLoaderData();
    return (
    <>          
      <TeamCard  team={users}/>
   
    </>
    );
}


// function Code({ children }) {
//   return (
//     <Box
//       as="span"
//       padding="025"
//       paddingInlineStart="100"
//       paddingInlineEnd="100"
//       background="bg-surface-active"
//       borderWidth="025"
//       borderColor="border"
//       borderRadius="100"
//     >
//       <code>{children}</code>
//     </Box>
//   );
// }
