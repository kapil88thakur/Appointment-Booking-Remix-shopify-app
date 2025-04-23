export async function getPageByHandle(handle) {
    const response = await fetchShopifyStorefrontAPI(`
      {
        page(handle: "${handle}") {
          title
          bodyHtml
          handle
        }
      }
    `);
    return response?.data?.page;
  }