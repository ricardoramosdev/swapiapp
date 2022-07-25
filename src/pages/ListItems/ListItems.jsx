import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { Card, List } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Meta from 'antd/lib/card/Meta'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import './ListItem.css'
const URL = 'https://swapi.dev/api'

export const ListItems = () => {
const [listIt, setListIt] = useState([])

//● Generar una lista de tarjetas que muestre cada personaje(nombre, peso, altura) y un
// paginado.
const listFromApi = async ()=>{

try{

    const response =await axios.get(`${URL}/people`)
    console.log(response.data.results)
    setListIt(response.data.results)
    

}catch(err){
    console.log(err)

}

} 
useEffect(()=>{
    listFromApi()
},[])
// ● Al hacer click en un personaje renderizar una tarjeta con más detalles del personaje.
// ● Realizar un CRUD de personajes, modificar, eliminar personajes de la api y poder
// generar nuevos personajes.
// ● Búsqueda de personaje por nombre.
// ● Generar algún tipo de filtro por “gender”, “homeworld”, o alguna propiedad a elección
// propia.
  return (
    <>

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
    dataSource={listIt}
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 5,
    }}
    renderItem={item => (
      <List.Item>
        <Card title={item.name} actions={[
               <SettingOutlined key="setting" />,
               <EditOutlined key="edit" />,
               <DeleteOutlined key="delete"/>,
             ]}>
              <span className='item-prop'>Peso: {item.mass} Kg</span>
              <span className='item-prop'>Altura: {item.height} cm</span>
             
             </Card>
      </List.Item>
    )}
  />
       
    </>
  )
}
