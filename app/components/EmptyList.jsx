

import {LegacyCard, EmptyState} from '@shopify/polaris';
import React from 'react';

export default function EmptyList({title,description,action}) {
  return (
    <LegacyCard sectioned>
      <EmptyState
        heading={title}
        action={{content: 'Add transfer',
        onAction:action}}
        secondaryAction={{
          content: 'Learn more',
          url: 'https://help.shopify.com',
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>{description}</p>
      </EmptyState>
    </LegacyCard>
  );
}