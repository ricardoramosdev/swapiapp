import axios from 'axios';
import React from 'react'
import {useParams } from 'react-router-dom'
export const ItemsDetail = () => {
  let { URL } = useParams();
  const person = axios.get(URL)
  return (
    <div>{person.name}</div>
  )
}
