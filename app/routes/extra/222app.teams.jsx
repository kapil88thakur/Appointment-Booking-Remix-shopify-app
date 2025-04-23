import { useState } from "react";
import { Outlet } from "@remix-run/react";
import { Layout,   Page,  Button} from "@shopify/polaris";
import { authenticate } from "../../shopify.server";
import { TitleBar } from "@shopify/app-bridge-react";
import prisma from "../../db.server";
import { useLoaderData } from "@remix-run/react";

export async  function loader({ request }) {
  const users = await prisma.team.findMany();
    return { users };
}

export async function action({ request }) {
  const { session } = await authenticate.admin(request);
  const { shop } = session;
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

export default function TeamsPage() {
   const { users } = useLoaderData();

    return (
    <>
    <Page
      fullWidth
      title="Teams"
      compactTitle
      primaryAction={<Button variant="primary">Create New Team Member</Button>}
      >
 <Layout>
 <Layout.Section>
        <Outlet />
        {/* <TeamCard  team={users}/> */}
      
       </Layout.Section>
       </Layout>
        </Page>
    </>
    );
}