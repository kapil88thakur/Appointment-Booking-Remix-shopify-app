import React ,{useState,useEffect} from 'react'
import { Box,  Layout, Badge,   Page,  Button} from "@shopify/polaris";
import { useMatches,useLoaderData,useNavigate,useSubmit,useFetcher,useActionData} from "@remix-run/react";
 //import prisma from "../db.server";
 import { authenticate } from "../shopify.server";
 import { gql } from "graphql-request";
import ServiceList from "../components/serviceList";
import { TitleBar,useAppBridge } from '@shopify/app-bridge-react';  
import EmptyList from '../components/EmptyList';


export const action = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Index(){
    const fetcher = useFetcher();    // "../"
   useEffect(() => {
     fetcher.load("../");
  }, []);
    const shopify =useAppBridge();
    const matches = useMatches();
    console.log("matched",matches);
    const parentMatch = matches.find((match) => match.id === 'routes/app');
    const shopsession = parentMatch?.data?.shopsession;
    const products=parentMatch?.data?.shopsession.services
    //const prdList= products;
    const prdList=fetcher.data?.shopsession.services || products;

const handleSave =  async (selection) => {
  const selectedProduct = selection; // Or process the data as needed
  const matchindb = selectedProduct.filter(item1 => !prdList.find(item2 => item1.id === item2.productId ));
  const selectedLength=selectedProduct.length;
  const notMatchingLength=matchindb.length;
   console.log("Selected",selectedProduct);
  console.log("prdlist length",prdList);
  console.log("notMatching",matchindb);
  console.log("notMatchingLength length",notMatchingLength);
  if(notMatchingLength==0){
    shopify.toast.show('Selected Products are already created as Services ', { isError: true  });
  }else{
     const response= await fetch("/app/service", {
        method: 'POST',
        body: JSON.stringify({ selectedProduct,prdList}),
        headers: {   'Content-Type': 'application/json'  },
      }).then((res)=>{
            if(res.status == 200){
              fetcher.load("../"); //mandatory to load loader from app
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


      return (
        <>  
         <Page    
          title="Services"
          primaryAction={{content: 'Create Services',
            onAction:handleOpenPicker}}>     
            <Layout>
              <Layout.Section>
                <Box >     
                {prdList.length > 0?
               <ServiceList products={prdList} title="Services"  />:
               <EmptyList tile="Manage your services" description="Track and receive your incoming inventory from suppliers." action= {handleOpenPicker} />
              }
                         
                </Box>
              </Layout.Section>
            </Layout>
          </Page>
          </>
      );
}