const Worklocations = [
  {
    id: "1",
    name: "Head Office",
    address: "Groundwater Section, NWSDB, Thelawala Rd, Ratmalana",
  },
  {
    id: "2",
    name: "Investigation Section / HO",
    address: "NWSDB Thelawala Rd, Ratmalana ",
    
  },
  {
    id: "3",
    name: "Ampara",
    address: "Groundwater Section, NWS DB, Dharmarama Road,Ampara",

  },
  {
    id: "4",
    name: "Anuradhapura",
    address: "NWSDB, II Stage,  Anuradhapura",

  },
  {
    id: "5",
    name: "Kandy",
    address: "No. 90/3, Pahala Kondadeniya, Katugastota",

  },
  {
    id: "6",
    name: "Wariyapola",
    address: "Groundwater Section, NWSDB, Chilaw Rd,Wariyapola",

  },
  {
    id: "7",
    name: "Matara",
    address: "Groundwater Section, NWSDB, Nupe, Matara",
    
  },
  {
    id: "8",
    name: "Monaragala",
    address: "Groundwater Section, NWSDB, Dodan watta Rd, Monaragala",
    
  },
  {
    id: "9",
    name: "Vavuniya",
    address: "Groundwater Section, NWSDB,Mannar Road, Vavuniya",

  },
];

function getWorklocationById(id) {
  return Worklocations.find((location) => location.id === id);
}

export { Worklocations, getWorklocationById };
