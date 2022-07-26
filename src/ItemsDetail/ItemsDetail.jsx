import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ItemsDetail.css'
import 'antd/dist/antd.css'
import { List } from "antd";

let { URL } = 'https://swapi.dev/api/people/1'
export const ItemsDetail = () => {
  const [personInfo,setPersonInfo] =useState({})
  const [procesedInfo, setProcesedInfo] = useState ([])
  const getPersonInfo =async()=>{
    try{
      const person = await axios.get('https://swapi.dev/api/people/1');
      console.log(person.data)
      setPersonInfo(person.data)
      // procesandoInfo(person.data)
    }catch(err){
      console.log(err)
    }
  }
  // const procesandoInfo =(data)=>{
  //   let info =Object.entries(data)
  //   console.log(info)
  //   setProcesedInfo(info)
  // }
  
  
  useEffect(()=>{
    getPersonInfo();
  },[])
  return (
    <>
      <div>{personInfo.name}</div>
      <div className="info">
      <List className="info-list">
        <List.Item>Peliclas: {personInfo.films}</List.Item>
        <List.Item>Planeta Hogar: {personInfo.homeworld}</List.Item>
        <List.Item>Naves: {personInfo.starships}</List.Item>
        <List.Item>Vehiculos: {personInfo.vehicles}</List.Item>
        <List.Item>Altura: {personInfo.height}</List.Item>
        <List.Item>Peso: {personInfo.mass}</List.Item>
        <List.Item>Color de ojos: {personInfo.eye_color}</List.Item>
        <List.Item>Color de pelo: {personInfo.hair_color}</List.Item>
        <List.Item>Genero: {personInfo.gender}</List.Item>
      </List>

    {procesedInfo.map(el=><div><h3>{el[0].toUpperCase()}</h3><p>{el[1]}</p></div>)}



      </div>
    </>
  );
};
