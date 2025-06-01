import { Outlet } from '@remix-run/react'
import React from 'react'
import { Layout, Badge,   Page,  Button} from "@shopify/polaris";
 import prisma from "../db.server";
  import { authenticate } from "../shopify.server";
 
export const action = async ({ request }) => {
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
      newprod.push({"productId":item.id,"shop":1})
    });
      const submit = await prisma.Service.createMany({data: newprod,skipDuplicates:true});
      return  newprod ;
    }
 }


export default function ServicePage() {
  return (
   <Outlet />

  )
}
