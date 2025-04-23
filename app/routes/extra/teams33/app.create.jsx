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
  Button
} from "@shopify/polaris";
import { json, redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { TitleBar } from "@shopify/app-bridge-react";
//import {PrismaClient} from "@prisma/client";
  import prisma from "../db.server";
  import { useLoaderData } from "@remix-run/react";
import TeamTable from "../components/teamTable";
  //import { authenticate } from "../shopify.server";
export async  function loader({ request }) {
  // const { admin } = await authenticate.admin(request);
    // return null;

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

export default function CreatePage() {
    const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const { users } = useLoaderData();
    return (
    <>
    <Page
      fullWidth
      title="Create Teams"
      compactTitle
     
      >

     

            <Box>
        <form method="post">
            <FormLayout>
        
        
            <TextField placeholder ="name" name='name' value={name} onChange={(e) =>setName(e.target.value)}/>
      <TextField  placeholder ="gender" name='gender' value={gender} onChange={(e) =>setGender(e.target.value)}/>
     
      <TextField  placeholder ="phone"  name='phone' value={phone} onChange={(e) =>setPhone(e.target.value)}/>
      <TextField   placeholder ="email" name='email' value={email} onChange={(e) =>setEmail(e.target.value)}/>
     
      <TextField  placeholder ="dob"  name='dob' value={dob} onChange={(e) =>setDob(e.target.value)}/>
      <TextField   placeholder ="address" name='address' value={address} onChange={(e) =>setAddress(e.target.value)}/>
            <Button >Submit</Button>
     
        </FormLayout>   </form>
        </Box>
        </Page>
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
