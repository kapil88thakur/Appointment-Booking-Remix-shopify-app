import {Card,Button, MediaCard} from '@shopify/polaris';
import React,{useState, useCallback} from 'react';

export default function TeamCard({team}) {    

   


return(<Card>

{team.map((user) =>  {
  let desc=user.email+" "+user.phone
      return(<>
     
<MediaCard
      title={user.name}
      primaryAction={{
        content: 'Assign Service',
        onAction: () => {handleChange},
      }}
      secondaryAction={{
        content: 'Calendar',
        onAction: () => {},
      }}
      description={desc}
      popoverActions={[{content: 'Edit', url:`/app/teams/edit/${user.id}`, onAction: () => {}},{content: 'Delete', onAction: () => {}}]}
    >
      <img
        alt=""
        width="100%"
        height="100%"
        style={{objectFit: 'cover', objectPosition: 'center'}}
        src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
      />
    </MediaCard>

</>)
    
}  
    )
 }

</Card>)

}
