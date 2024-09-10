import MapInformation from "./MapaPathsComarques.json";

type MapInformationType = {
  [key: string]: {
    friend: string;
    unfriend: string;
    name: string;
    d: string;
  };
};

const mapInformation: MapInformationType = MapInformation;

type TextsType = {
  addFriendShipText: string;
  removeFriendShipText: string;
  editFriendShipText: string;
  girona: string;
  barcelona: string;
  tarragona: string;
  lleida: string;
  vall_d_aran: string;
  [key: string]: string;
};

const Texts: TextsType = {
  addFriendShipText: "Afegir amistat",
  removeFriendShipText: "Eliminar amistat",
  editFriendShipText: "Editar amistat",
  girona: "Girona",
  barcelona: "Barcelona",
  tarragona: "Tarragona",
  lleida: "Lleida",

  vall_d_aran: mapInformation["vall_d_aran"].name,
};

Object.keys(mapInformation).forEach((key) => {
  Texts[key] = mapInformation[key].name;
});

export default Texts;