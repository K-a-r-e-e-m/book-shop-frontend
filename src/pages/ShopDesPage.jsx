import React from 'react'
import ShopDescription from '../components/Shop/ShopDescritpion'
import { json } from 'react-router-dom'
const apiUrl = import.meta.env.VITE_API_BASE_URL;

function ShopDesPage() {
  return (
     <ShopDescription />
  )
}

export default ShopDesPage



export async function loader({ request, params }) {
  const id = params.id;
  console.log("id",id)
  console.log("params", request)
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/details/`+ id, {
    credentials: 'include'
  });
    

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' },
      {
        status: 500,
      }
    );
  } else {
      const data = await response.json();
      console.log("data",data)
    return data;
  }
}
