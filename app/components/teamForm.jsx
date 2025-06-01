import { useState,useEffect, useRef, useCallback } from "react";
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
import {useFetchers, useMatches,useLoaderData,useSubmit,useFetcher,useActionData} from "@remix-run/react";
export default function TeamForm({user,passData,userID}) {
    const initialState = {
    name: user?user.name:'',
    gender: user?user.gender:'',
    phone: user?user.phone:'',
    email: user?user.email:'',
    dob:user?user.dob:'',
    address:user?user.address:'',
}
const [inputs, setInputs] = useState(initialState);
 
useEffect(() => {
  if (user) {
    setInputs({
      name: user.name || '',
      gender: user.gender || '',
      phone: user.phone || '',
      email: user.email || '',
      dob: user.dob || '',
      address: user.address || '',
    });
  }
}, [user]);


    
    const handleChange = (text,source)=>{
     setInputs(prevState => ({...prevState, [source]: text}));
    }


  useEffect(() => {
    passData(inputs);
  }, [inputs]);

  return (
    
    <>
     <Box>
      <Card>
     <form method="post">
     
       {/* <Form> */}
          <FormLayout>
            <TextField  label="Team name"  name="name"  value={inputs.name}   onChange={(e)=>handleChange(e,"name")} />
            <TextField  Autocomplete placeholder ="gender"  name="gender" value={inputs.gender}  onChange={(e)=>handleChange(e,"gender")} />
            <TextField  Autocomplete placeholder ="phone"  name="phone"  value={inputs.phone}  onChange={(e)=>handleChange(e,"phone")}/>
            <TextField  Autocomplete placeholder ="email"  name="email"  value={inputs.email}  onChange={(e)=>handleChange(e,"email")} />
            <TextField Autocomplete placeholder ="dob"  name="dob"  value={inputs.dob} onChange={(e)=>handleChange(e,"dob")} />
            <TextField Autocomplete  placeholder ="address"  name="address"  value={inputs.address} onChange={(e)=>handleChange(e,"address")} />
          </FormLayout>     
        {/* </Form> */}
        </form>
        </Card>
      </Box>
    </>
  )
}
