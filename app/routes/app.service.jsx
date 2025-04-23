import { Outlet } from '@remix-run/react'
import React from 'react'
import { Layout, Badge,   Page,  Button} from "@shopify/polaris";
export default function ServicePage() {
  return (

    //  <Page
    //       fullWidth
    //       title="Teams"
    //       compactTitle
    //       primaryAction={<Button variant="primary" url="/app/teams/create">Create New Team</Button>}
    //       >


<Page
      backAction={{content: 'Products', url: '#'}}
      title="Services"
      titleMetadata={<Badge tone="attention">Verified</Badge>}
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {content: 'Services',url:"/app/service"},
        {content: 'Add New Services',url:"/app/service/create"},
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
     <Layout>
     <Layout.Section>
            <Outlet />
            {/* <TeamCard  team={users}/> */}
          
           </Layout.Section>
           </Layout>
            </Page>
  )
}
