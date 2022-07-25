import { CheckCircleOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, ExclamationCircleOutlined, SettingOutlined, WarningOutlined } from '@ant-design/icons'
import { Button, Card, Input, List, Modal, Pagination } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Meta from 'antd/lib/card/Meta'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import './ListItem.css'
import { Link } from 'react-router-dom'
import confirm from 'antd/lib/modal/confirm'
const URL = 'https://swapi.dev/api'

export const ListItems = () => {
const [listIt, setListIt] = useState([])
const [search , setSearch] = useState('')
const [loading, setLoading] =useState (false)
//● Generar una lista de tarjetas que muestre cada personaje(nombre, peso, altura) 
//Obtengo datos de la api
const listFromApi = async ()=>{

try{
  let totalPeople = [];
    for(let i=1; i<=9; i++){
      const response = await axios.get(`${URL}/people/?page=${i}`)
      totalPeople.push(...response.data.results)
      console.log(totalPeople)
    }
    // console.log("traigo datos a local")
    localStorage.setItem('listIt',JSON.stringify(totalPeople))
    listFromLocal()


}catch(err){
    console.log(err)

}}
//Guardo los datos en local storage para poder modificarlos
const listFromLocal = ()=>{
  const lista = JSON.parse(localStorage.getItem('listIt'))
  console.log("seteo estado desde local")
  setListIt(lista)
}
const editPerson =(item, index)=>{
  console.log(index)
}
const deleteModal = (item, index) => {
  Modal.confirm({
      title: `¿Está seguro de que quiere eliminar el personaje ${item.name}?`,
      icon: <WarningOutlined />,
      content: `El personaje se borrará de forma permanente`,
      onOk: () => {
          deletePerson(item, index)
      },
      okText: `Borrar`,
      okType: "danger"
  })
}
const deletePerson =(item, index)=>{
  console.log(index)
  let newDelete = listIt.filter(item => item!==listIt[index])
  setListIt(newDelete)
  localStorage.setItem('listIt',JSON.stringify(newDelete))

  Modal.info({
    title: 'Personaje eliminado',
    icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
    content: `El personaje ${item.name} ha sido eliminado correctamente`,
    okText: 'Ok',
    okType: "ghost"

})

}

useEffect(()=>{
   setLoading(true);
    listFromApi()
    .finally(()=>{setLoading(false);})
},[])
// ● Al hacer click en un personaje renderizar una tarjeta con más detalles del personaje. VER COMPONENTE ITEM DETAIL
// ● Realizar un CRUD de personajes, modificar, eliminar personajes de la api y poder
// generar nuevos personajes.

// ● Búsqueda de personaje por nombre.
// ● Generar algún tipo de filtro por “gender”, “homeworld”, o alguna propiedad a elección
// propia.
  return (
    <>
  <div className="search">
    <Input id='search' placeholder="Busca por nombre"/>
  </div>
    <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 6,
      xxl: 3,
    }}
    loading={loading}
    dataSource={listIt}
    pagination={{ defaultCurrent:1, pageSize:10}}
    renderItem={item => (
      <List.Item>
            <Card id={item.id}title={item.name} actions={[
              <Link to={`/person/?${item.url}`}>
               <SettingOutlined key="setting" />
              </Link>,
              <Button onClick={()=>editPerson(item, listIt.indexOf(item))}><EditOutlined key="edit" /></Button>,
              <Button onClick={()=>deleteModal(item, listIt.indexOf(item))}> <DeleteOutlined key="delete"/></Button>,
              
             ]}>
              <div className='item-prop'>Peso:{item.mass} Kg</div>
              <div className='item-prop'>Altura:{item.height} cm</div>
             
             </Card>
      </List.Item>

    )}
    
  />
    </>
  )
}
