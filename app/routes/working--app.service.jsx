import { Outlet } from '@remix-run/react'
import React ,{useState,useEffect}from 'react'
import { Box,  Layout, Badge,   Page,  Button} from "@shopify/polaris";
import { useLoaderData,useNavigate,useSubmit,useFetcher,useActionData} from "@remix-run/react";
import { json } from "@remix-run/node";
import prisma from "../db.server";
import { authenticate } from "../shopify.server";
import { gql } from "graphql-request";
import ServiceList from "../components/serviceList";
import { TitleBar,useAppBridge } from '@shopify/app-bridge-react';  

 function getProductsByIds(){
  return gql`
  query getProductsByIds($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        description
      }
    }
  }
`;
}

export async function loader({ request }) {
  // const { session } = await authenticate.admin(request);
  // if (!session) return redirect('/auth/login');
  // const { shop } = session;
  // return shop;
    const { session,admin } = await authenticate.admin(request);
    const { shop } = session;
    // Fetch products gid wrt shop from service table
      const productsfromdb = await prisma.services.findMany({
        select:{   pid:true,    },
        where: {   shop: shop   }
      });
      // create array with only pids
      const pidarr = productsfromdb.map(item => item.pid);
      const ids = {  ids:pidarr };  
      //graphql to get products detail wrt gid saved in db 
      const GET_PRODUCTS_BY_IDS=getProductsByIds();
      const response = await admin.graphql(GET_PRODUCTS_BY_IDS, {variables:ids});
      const parsedResponse = await response.json();
    return ({
        products: parsedResponse.data.nodes,
      });
  }

export async function action({ request }) {
  const { session } = await authenticate.admin(request);
  if (!session) return redirect('/auth/login');
  const { shop } = session;
  let newprod=[];
  if (request.method === "POST") {
    const body = await request.json();
    const selectedProduct= body.selectedProduct;
    const prdList= body.prdList;
 // const notMatching = selectedProduct.filter(item1 => !prdList.find(item2 => item1.id === item2.id ));
  selectedProduct.map(item => {
    newprod.push({"pid":item.id,"shop":shop})
  });
    const submit = await prisma.Services.createMany({data: newprod,skipDuplicates:true});
    return json( newprod );
  }
 }

 export default function ServicePage() {
  const fetcher = useFetcher();
   const { products } = useLoaderData();
    const shopify =useAppBridge();
    const prdList=fetcher.data?.products || products;
    //const [prdcount,setCount]=useState(prdList.length)

    const handleOpenPicker = async () => {
      try {
        const { selection } = await shopify.resourcePicker({
          type: 'product',
          multiple: true,
          filter: {
            hidden: false,
            variants: false,
            draft: false,
            archived: false,
          },
        });
        //setSelectedProducts(selection);
        handleSave(selection);
      } catch (error) {
        console.error('Error opening product picker:', error);
      }
    };

    const handleSave =  async (selection) => {
      const selectedProduct = selection; // Or process the data as needed
      const matchindb = selectedProduct.filter(item1 => !prdList.find(item2 => item1.id === item2.id ));
      const selectedLength=selectedProduct.length;
      const notMatchingLength=matchindb.length;
      if(notMatchingLength==0){
        shopify.toast.show('Selected Products are already created as Services ', {
          isError: true,
       });
      }else{
     
        const response= await fetch("/app/service", {
              method: 'POST',
              body: JSON.stringify({ selectedProduct,prdList}),
              headers: {
              // "Content-Type": "multipart/form-data"
                'Content-Type': 'application/json',
              },
        }
    ).then((res)=>{
          if(res.status == 200){
            fetcher.load('/app/service');
            if(selectedLength==notMatchingLength){
              shopify.toast.show('Services created successfully');
            }
            if((selectedLength>notMatchingLength) && (notMatchingLength!=0)){
              shopify.toast.show('Some Services created successfully');
            } 
        }else{
              shopify.toast.show('Error Occurred. Please try again !', {
              isError: true,
          });
        }
  }).catch(error => {
    console.error('Error:',error);
  });
  }
    }

  return (
  
      <>  
 
        <Page    
         title="Services"
         primaryAction={{content: 'Create Services',
           onAction:handleOpenPicker}}>     
           <Layout>
             <Layout.Section>
               <Box >        
                 <ServiceList products={prdList} title="Services"  />
               </Box>
             </Layout.Section>
           </Layout>
         </Page>
         </>  
  );
}