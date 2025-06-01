import React, { useState } from 'react';
import { Button } from '@shopify/polaris';
import ServiceList from './serviceList';
//import ProductPicker from './ProductPicker';
import { TitleBar,useAppBridge } from '@shopify/app-bridge-react';  
const CreateService = ({excludeproducts}) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [value, setValue] = useState(false);
// const shopify =useAppBridge();

  // const handleOpenPicker = async () => {
    
  //   try {
  //     const { selection } = await shopify.resourcePicker({
  //       type: 'product',
  //       multiple: true,
  //       filter: {
  //         hidden: false,
  //         variants: false,
  //         draft: false,
  //         archived: false,
  //       },
  //     });
  //     setSelectedProducts(selection);
  //   } catch (error) {
  //     console.error('Error opening product picker:', error);
  //   }
  // };


  const handleSave =  async () => {
     const productsData = selectedProducts; // Or process the data as needed
   await fetch("/app/service", {
        method: 'POST',
        body: JSON.stringify({ products: productsData,excludeproducts:excludeproducts }),
        headers: {
            //'Authorization': `Bearer ${sessionToken}`,
         // "Content-Type": "application/json",
           "Content-Type": "multipart/form-data"
        },
  }
).then(res=>{
  console.log('result--', res);
  if(res.status == 200){
    shopify.toast.show('Services created successfully');
   // setSelectedProducts("ss");
  }else{
    shopify.toast.show('Error Occurred. Please try again !', {
      isError: true,
    });
  }

}).catch(error => {
  console.error('Error:', error);
});

  }


  return (
    <div>
      {/* <Button onClick={handleOpenPicker}>Create New Service list</Button> */}

      {/* {selectedProducts.length > 0 && (
            <ServiceList products={selectedProducts} title="Save the list" />
      )} */}
  

    <Button  onClick={handleSave}>Save list </Button>
  </div>

  );
};

export default CreateService;
