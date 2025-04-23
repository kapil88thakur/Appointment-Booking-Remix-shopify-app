import React from 'react'
import { useState } from "react";
import { authenticate } from "../shopify.server";
 import prisma from "../db.server";
export async function loader({ request }) {
	return null;
}


export async function action({ request }) {
  const { session } = await authenticate.admin(request);
  const { shop } = session;
	const formData = await request.formData();
	const name = formData.get("name");

	const submit = await prisma.team.create({
		data: { 
			name: name,
      shop:shop
		}
	});
	return {
		submit,
	};
}
export default function Calendar() {
    const [name, setName] = useState('');
	return (
		<form method="post">
			<h1>Name:</h1>
			<input type='text' name='name' value={name} onChange={(e) => 				setName(e.target.value)}/>
			<button type='submit' submit>Submit</button>
		</form>
	);
}
