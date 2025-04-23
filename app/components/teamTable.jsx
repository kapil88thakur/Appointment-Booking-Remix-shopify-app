


import {Page, LegacyCard, DataTable} from '@shopify/polaris';
import React from 'react';

export default function TeamTable({team}) {
    const rows=[];

    {team.map((user) => {
        let result = Object.values(user);
      //  console.log("new rrsult is",result)
        rows.push(result);
    }
 )}

  return (
    <Page title="Teams Members">
      <LegacyCard>
        <DataTable
          columnContentTypes={[
            'id',
            'text',
            'text',
            'text',
            'text',
            'text',
            'text',
            'text',
          ]}
          headings={[
            'id',
            'name',
            'shop',
            'address',
            'phone',
            'email',
            'doB',
            'gender',
          ]}
          rows={rows}
         // totals={['', '','', '', 255, '$155,830.00']}
          pagination={{
            hasNext: true,
            onNext: () => {},
          }}
        />
      </LegacyCard>
    </Page>
  );
}
