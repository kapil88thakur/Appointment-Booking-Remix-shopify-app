import React, { useState } from 'react';
import { Button } from '@shopify/polaris';
import ServiceList from './serviceList';

const ServicePicker = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleOpenPicker = async () => {
    // try {
    //   const { selection } = await window.shopify.resourcePicker({
    //     type: 'product',
    //     multiple: true,
    //     filter: {
    //       hidden: false,
    //       variants: false,
    //       draft: false,
    //       archived: false,
    //     },
    //   });
    //   setSelectedProducts(selection);
    // } catch (error) {
    //   console.error('Error opening product picker:', error);
    // }
  };

  return (
    <div>
      <Button onClick={handleOpenPicker}>Create New Service</Button>
     
      {selectedProducts.length > 0 && (
            <ServiceList products={selectedProducts} />
      )}
    </div>
  );
};

export default ServicePicker;
