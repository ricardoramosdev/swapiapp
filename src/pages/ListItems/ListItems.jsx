import {
  CheckCircleOutlined,
  ConsoleSqlOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  SettingOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  List,
  Modal,
  Pagination,
  Row,
  Select,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import "antd/dist/antd.css";
import "./ListItem.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import confirm from "antd/lib/modal/confirm";
import { ItemsDetailModal } from "../../ItemsDetail/ItemsDetailModal";
import { Option } from "rc-select";
import { useForm } from "antd/lib/form/Form";
const URL = "https://swapi.dev/api";

export const ListItems = () => {
  const [listIt, setListIt] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState({});
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [addVisible, setAddVisible] = useState(false);


  const [form] = useForm();
  //● Generar una lista de tarjetas que muestre cada personaje(nombre, peso, altura)
  //Obtengo datos de la api
  const listFromApi = async () => {
    try {
      let totalPeople = [];
      for (let i = 1; i <= 9; i++) {
        const response = await axios.get(`${URL}/people/?page=${i}`);
        totalPeople.push(...response.data.results);
        console.log(totalPeople);
      }
      // console.log("traigo datos a local")
      localStorage.setItem("listIt", JSON.stringify(totalPeople));
      
    } catch (err) {
      console.log(err);
    }
  };

  //Analizo todo los personajes para obtener poder aceder a todos los enlaces de sus propiedades
  const eliminaDuplicados = (arr) => {
    return arr.reduce( (accArr, valor) => {
      if (accArr.indexOf(valor) < 0) {
        accArr.push(valor);
      }
      return accArr;
    }, []);
  }
  const getFilmsList = ()=>{
    const lista = JSON.parse(localStorage.getItem("listIt"));
    let films =  lista.map(el=>el.films)
    let list= [].concat(...films)
    let listFilms = eliminaDuplicados(list)
    insideFetch(listFilms)
   
  }
  //funcion obtener inside fetchs
  const insideFetch = async(prop)=>{
    let listaProp = await Promise.all(prop.map(async (el)=>{
      let response = await axios.get(el);
      let t= response.data;
      return t}))
    console.log(listaProp)
  }
  //Guardo los datos en local storage para poder modificarlos
  const listFromLocal = () => {
    const lista = JSON.parse(localStorage.getItem("listIt"));
    console.log("seteo estado desde local");
    setListIt(lista);

  };
  const searchByName = (search) => {
    setSearch(search.target.value);
  };
  const searchByFilter = (search) => {
    console.log(search)
    setSearch(search);
  };

  const listToRender = !search
    ? listIt
    : listIt.filter((it) =>
        it.name.toLowerCase().includes(search.toLowerCase()) ||it.gender===search
      );

  const moreInfo = (item, index) => {
    setEdit(false);
    setAdd(false)
    setSelectedPerson(item);
    setVisible(true);
  };
  const editPerson = (item, index) => {
    console.log(index);
    setEdit(true);
  };
  const addPerson = ()=>{

    setEdit(false);
    setAdd(true);
    setAddVisible(true);

  }
  const addPersonToDB = (e)=>{
    console.log(e)
    let newList = [...JSON.parse(localStorage.getItem("listIt")),e]
    localStorage.setItem("listIt", JSON.stringify(newList));
    setListIt(newList)
    Modal.info({
      title: "Personaje Agregado",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      content: `El personaje ${e.name} ha sido agregado correctamente`,
      okText: "Ok",
      okType: "ghost",
    });
    document.getElementById('addForm').reset()
  }
  const deleteModal = (item, index) => {
    Modal.confirm({
      title: `¿Está seguro de que quiere eliminar el personaje ${item.name}?`,
      icon: <WarningOutlined />,
      content: `El personaje se borrará de forma permanente`,
      onOk: () => {
        deletePerson(item, index);
      },
      okText: `Borrar`,
      okType: "danger",
    });
  };
  const deletePerson = (item, index) => {
    console.log(index);
    let newDelete = listIt.filter((item) => item !== listIt[index]);
    setListIt(newDelete);
    localStorage.setItem("listIt", JSON.stringify(newDelete));

    Modal.info({
      title: "Personaje eliminado",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      content: `El personaje ${item.name} ha sido eliminado correctamente`,
      okText: "Ok",
      okType: "ghost",
    });
  };

  useEffect(() => {
    setLoading(true);
    listFromApi().finally(() => {
      setLoading(false);
      listFromLocal()
    });
  }, []);

  useEffect(()=>{
    listFromLocal()
  },[addVisible]);
  
  // ● Al hacer click en un personaje renderizar una tarjeta con más detalles del personaje. LISTO
  // ● Realizar un CRUD de personajes, modificar, eliminar personajes de la api y poder
  // generar nuevos personajes.

  // ● Búsqueda de personaje por nombre.
  // ● Generar algún tipo de filtro por “gender”, “homeworld”, o alguna propiedad a elección
  // propia. LISTO
  return (
    <>
      <div className="search">
        <Input
        className="search-param"
          id="search"
          onChange={searchByName}
          placeholder="Busca por nombre"
        />

        <Select 
        className="search-param"

        onChange={searchByFilter}
        style={{width:'100%'}}
        placeholder='Filter by gender'
        >
          <Option value=''>All</Option>
          <Option value='male'>Male</Option>
          <Option value='female'>Female</Option>
          <Option value='n/a'>Other</Option>
        </Select>
      </div>
      <div className="add"><Button className="add-button" onClick={addPerson} >Nuevo Personaje +</Button></div>
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
        dataSource={listToRender}
        pagination={{ defaultCurrent: 1, pageSize: 10 }}
        renderItem={(item) => (
          <List.Item>
            <Card
              id={item.id}
              title={item.name}
              actions={[
                <Button onClick={() => moreInfo(item, listIt.indexOf(item))}>
                  <SettingOutlined key="setting" />
                </Button>,

                <Button onClick={() => deleteModal(item, listIt.indexOf(item))}>
                  <DeleteOutlined key="delete" />
                </Button>,
              ]}
            >
              <div className="item-prop">Peso:{item.mass} Kg</div>
              <div className="item-prop">Altura:{item.height} cm</div>
            </Card>
          </List.Item>
        )}
      />
      //Global modal
      <Modal
        visible={visible}
        onCancel={() => {
          setVisible(false);
          setSelectedPerson({})

        }}
        footer={[
          <Button hidden={!edit} htmlType="submit">Editar</Button>,
          
          <Button
            onClick={() => {
              setVisible(false);
              setSelectedPerson({})

            }}
            hidden={edit||add}
          >
            Ok
          </Button>,
          
        ]}
      >
        <Button hidden={add?true:false}
          onClick={() =>
            editPerson(selectedPerson, listIt.indexOf(selectedPerson))
          }
        >
          <EditOutlined key="edit" />
        </Button>
        <div className="info">
          <Form className="info-list" name={form} id="person-info" disabled={!edit &&!add}
          // initialValues={{
          //   name:null,
          //   peliculas:null,
          //   homeworld:null,
          //   starships:null,
          //   vehicles:null,
          //   height:null,
          //   mass:null,
          //   gender:null
          // }}
           >
          <Form.Item label="Name " id="name" name="name" key={"name"} initialValue={
            {name:selectedPerson.name}
          }>
              <Input
              />
            </Form.Item>

            <Form.Item label="Películas" name="peliculas"  id="peliculas" key={"peliculas"}>
              {/* <Input
                value={selectedPerson.films?.map((el) => (
                  <li>{el}</li>
                ))}
              /> */}
             <div>

                {/* {[insideFetch(selectedPerson.films)]?.map(el =><div key={el.title}>{el.title}</div>)} */}
             </div>
              
             
            </Form.Item>

            <Form.Item  id="homeworld" name="homeworld" label="Planeta Hogar" key={"homeworld"}>
              <Input
                value={selectedPerson.homeworld}
              />
            </Form.Item>

            <Form.Item name="starships" label="Naves" id="starships" key={"starships"}>
              <Input value={selectedPerson.starships?.map((el) => (
                <li>{el}</li>
              ))}  />
              
            </Form.Item>

            <Form.Item name="vehicles" label="Vehículos" id="vehicles" key={"vehicles"}>
              <Input
                value={selectedPerson.vehicles?.map((el) => (
                  <li>{el}</li>
                ))}
              />
            </Form.Item>

            <Form.Item name="height" label="Altura[cm]" id="height" key={"height"}>
              <Input  value={selectedPerson.height} />
            </Form.Item>

            <Form.Item name="mass" label="Peso[kg]" id="mass" key={"mass"} >
              <Input value={selectedPerson.mass} />
            </Form.Item>

            <Form.Item name="gender" label="Genero" id="gender" key={"gender"}>
              <Input   value={selectedPerson.gender} />
            </Form.Item>
          

            
            <Form.Item key={"cancelButton"}>
            <Button 
            onClick={() => {
              setVisible(false);
              setSelectedPerson({});
              form.resetFields()
            }}
          >
            Cancel
          </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      {/* //Add modal */}
      <Modal
        visible={addVisible}
        
        okButtonProps={{style:{display:'none'}
        }}
        cancelButtonProps={{style:{display:'none'}
        }}
        
      >
        <h1>Agrega un personaje nuevo</h1>
        <div className="info">
          <Form className="info-list" name={'addForm'} id="addForm" 
          initialValues={{
            name:null,
            peliculas:null,
            homeworld:null,
            starships:null,
            vehicles:null,
            height:null,
            mass:null,
            gender:null
          }}
          onFinish={addPersonToDB}
           >
          <Form.Item label="Name " id="name" name="name" key={"name"} >
              <Input required maxLength={30}
              />
            </Form.Item>

            <Form.Item label="Películas" name="peliculas"  id="peliculas" key={"peliculas"}>
              <Input required/>
             
            </Form.Item>

            <Form.Item  id="homeworld" name="homeworld" label="Planeta Hogar" key={"homeworld"}>
              <Input
              />
            </Form.Item>

            <Form.Item name="starships" label="Naves" id="starships" key={"starships"}>
              <Input  />
              
            </Form.Item>

            <Form.Item name="vehicles" label="Vehículos" id="vehicles" key={"vehicles"}>
              <Input
                
              />
            </Form.Item>

            <Form.Item name="height" label="Altura[cm]" id="height" key={"height"}>
              <Input   />
            </Form.Item>

            <Form.Item name="mass" label="Peso[kg]" id="mass" key={"mass"} >
              <Input  />
            </Form.Item>

            <Form.Item name="gender" label="Genero" id="gender" key={"gender"}>
              <Input   />
            </Form.Item>
            
            <Row gutter={8}>
              <Col className="addModalButton">
                    <Button htmlType="submit" >
                    Agregar
                    </Button>
              </Col>
              <Col className="addModalButton">
                    <Button onClick={() => { setAddVisible(false)}}>
                    Cancel
                    </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
};
