import { useState } from "react";
// import { authenticate } from "../shopify.server";
//  import prisma from "../db.server";
import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  FormLayout,
  TextField,
  Button,
  Form,
  InlineGrid
} from "@shopify/polaris";
 import Calendar from "../components/Calendar";
// export async function loader({ request }) {
// 	return null;
// }


// export async function action({ request }) {
//   const { session } = await authenticate.admin(request);
//   const { shop } = session;
// 	const formData = await request.formData();
// 	const name = formData.get("name");

// 	const submit = await prisma.team.create({
// 		data: { 
// 			name: name,
//       shop:shop
// 		}
// 	});
// 	return {
// 		submit,
// 	};
// }

export default function CalendarPage() {
	return(<>
  <Calendar />
  </>)
}