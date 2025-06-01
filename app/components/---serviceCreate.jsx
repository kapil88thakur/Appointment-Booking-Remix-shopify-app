import { useState,useCallback } from "react";
//import prisma from "../db.server";
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
  InlineGrid
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useLoaderData,useSubmit,useFetcher} from "@remix-run/react";


//  export async function action({ request }) {
// //const { session } = await authenticate.admin(request);
// const { shop } = session;
//   const formData = await request.formData();
//   const name = formData.get("name");
// const phone=formData.get("phone");
// const gender=formData.get("gender");
// const email=formData.get("email");
// const address=formData.get("address");
// const dob=formData.get("dob");
// const  data= { 
//           name: name,
//       gender: gender,
//       shop: shop,
//       phone  : phone,
//       email      : email,
//       address     : address,
//       dob     :dob
//         };
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
//   // return null;
//  }
export default function ServiceCreate() {

  const initialState = {
    name: '',
    gender: '',
   
    phone: '',
    email: '',
    dob:"",
    address:""
}
    const [inputs, setInputs] = useState(
      initialState);
      
    const handleChange = (text,source)=>{
      setInputs(prevState => ({...prevState, [source]: text}));
}


    const fetcher = useFetcher();

  return (
    <>
     <Box>
     <fetcher.Form method="post">
    
       {/* <Form> */}
          <FormLayout> 
            <TextField label="Team name" name="name" value={inputs.name}   onChange={(e)=>handleChange(e,"name")} />
            <TextField  placeholder ="gender"  name="gender" value={inputs.gender}  onChange={(e)=>handleChange(e,"gender")} />
            <TextField  placeholder ="phone"  name="phone"  value={inputs.phone}  onChange={(e)=>handleChange(e,"phone")}/>
            <TextField   placeholder ="email"  name="email"  value={inputs.email}  onChange={(e)=>handleChange(e,"email")} />
            <TextField  placeholder ="dob"  name="dob"  value={inputs.dob} onChange={(e)=>handleChange(e,"dob")} />
            <TextField   placeholder ="address"  name="address"  value={inputs.address} onChange={(e)=>handleChange(e,"address")} />
            <Button submit  >Save</Button>
          </FormLayout>     
        {/* </Form> */}
        </fetcher.Form>
      </Box>
       
    </>
  )
}
