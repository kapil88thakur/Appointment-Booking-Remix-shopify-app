import {
    LegacyCard,
    ResourceList,
    Avatar,
    ResourceItem,
    Text,
    Card,
    BlockStack, 
    InlineGrid
  } from '@shopify/polaris';
  import React from 'react';
  
  export default function ServiceList({products,title}) {
  //  console.log("prod",products)
    return (
      <Card>
        <BlockStack gap="200">
          <InlineGrid columns="1fr auto">
            <Text variant="heading2xl" as="h3">
              {title}
            </Text>
          </InlineGrid>
          <ResourceList
            resourceName={{singular: 'customer', plural: 'customers'}}
            items={products}
            renderItem={(item) => {
              const {id, title, description} = item;
              const media = <Avatar customer size="md" name={title} />;
                //const productid= id.replace("gid://shopify/Product/","");
              return (
                <ResourceItem 
                  id={id}
                  title={title}
                  description={description}
                  media={media}
                  accessibilityLabel={`View details for ${title}`}
                  shortcutActions={[{content: 'Manage', url:`/app/service/edit/${id}`, onAction: () => {}},{content: 'Delete', onAction: () => {}}]}
                >
                  <Text variant="bodyMd" fontWeight="bold" as="h3">
                    {title}
                  </Text>
                  <div>{description}</div>
                </ResourceItem>
              );
            }}
          />
        </BlockStack>
      </Card>
    );
  }