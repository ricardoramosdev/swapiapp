import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ItemsDetail.css'
import 'antd/dist/antd.css'
import { List, Modal } from "antd";

let { URL } = 'https://swapi.dev/api/people/1'
export const ItemsDetailModal = ({selectedPerson, visible}) => {
const [visibl, setVisible] = useState (visible)

  // const [personInfo,setPersonInfo] =useState({})
  // const [procesedInfo, setProcesedInfo] = useState ([])
  // const getPersonInfo =async()=>{
  //   try{
  //     const person = await axios.get('https://swapi.dev/api/people/1');
  //     console.log(person.data)
  //     setPersonInfo(person.data)
  //     // procesandoInfo(person.data)
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  // const procesandoInfo =(data)=>{
  //   let info =Object.entries(data)
  //   console.log(info)
  //   setProcesedInfo(info)
  // }
  
  
  // useEffect(()=>{
  //   getPersonInfo();
  // },[])
  return (
    <>

     
   



      
    </>
  );
};
