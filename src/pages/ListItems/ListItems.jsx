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
  Form,
  Input,
  List,
  Modal,
  Pagination,
  Select,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./ListItem.css";
import { Link } from "react-router-dom";
import confirm from "antd/lib/modal/confirm";
import { ItemsDetailModal } from "../../ItemsDetail/ItemsDetailModal";
import { Option } from "rc-select";
const URL = "https://swapi.dev/api";

export const ListItems = () => {
  const [listIt, setListIt] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState({});
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(true);
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
      listFromLocal();
    } catch (err) {
      console.log(err);
      listFromLocal();
    }
  };

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
    setEdit(true);
    setSelectedPerson(item);
    setVisible(true);
  };
  const editPerson = (item, index) => {
    console.log(index);
    setEdit(false);
  };
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
    });
  }, []);
  // ● Al hacer click en un personaje renderizar una tarjeta con más detalles del personaje. VER COMPONENTE ITEM DETAIL
  // ● Realizar un CRUD de personajes, modificar, eliminar personajes de la api y poder
  // generar nuevos personajes.

  // ● Búsqueda de personaje por nombre.
  // ● Generar algún tipo de filtro por “gender”, “homeworld”, o alguna propiedad a elección
  // propia.
  return (
    <>
      <div className="search">
        <Input
          id="search"
          onChange={searchByName}
          placeholder="Busca por nombre"
        />

        <Select 
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
      <Modal
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        footer={[
          <Button hidden={edit}>Editar</Button>,
          <Button
            onClick={() => {
              setVisible(false);
            }}
          >
            Cancel
          </Button>,
          <Button
            onClick={() => {
              setVisible(false);
            }}
            hidden={!edit}
          >
            Ok
          </Button>,
        ]}
      >
        <Button
          onClick={() =>
            editPerson(selectedPerson, listIt.indexOf(selectedPerson))
          }
        >
          <EditOutlined key="edit" />
        </Button>
        <div>{selectedPerson.name}</div>
        <div className="info">
          <Form className="info-list" disabled={edit}>
            <Form.Item>
              <label for="peliculas">Peliculas: </label>
              <Input
                name="peliculas"
                id="peliculas"
                value={selectedPerson.films?.map((el) => (
                  <li>{el}</li>
                ))}
              />
              {selectedPerson.films?.map((el) => (
                <li>{el}</li>
              ))}
            </Form.Item>

            <Form.Item>
              <label for="homeworld">Planeta Hogar: </label>
              <Input
                name="homeworld"
                id="homeworld"
                value={selectedPerson.homeworld}
              />{" "}
            </Form.Item>

            <Form.Item>
              <label htmlFor="starships">Naves: </label>
              <Input name="starships" id="starships" />
              {selectedPerson.starships?.map((el) => (
                <li>{el}</li>
              ))}
            </Form.Item>

            <Form.Item>
              <label htmlFor="vehicles">Vehiculos:</label>
              <Input
                name="vehicles"
                id="vehicles"
                value={selectedPerson.vehicles?.map((el) => (
                  <li>{el}</li>
                ))}
              />
            </Form.Item>

            <Form.Item>
              <label htmlFor="height">Altura[cm]: </label>
              <Input name="height" id="height" value={selectedPerson.height} />
            </Form.Item>

            <Form.Item>
              <label htmlFor="mass">Peso[kg]: </label>
              <Input name="mass" id="mass" value={selectedPerson.mass} />
            </Form.Item>

            <Form.Item>
              <label htmlFor="gender">Genero: </label>
              <Input name="gender" id="gender" value={selectedPerson.gender} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};
