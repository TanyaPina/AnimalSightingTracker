import { useState, useEffect } from "react";
import Form from "./form";

function Sightings() {
  
  // this is my original state with an array of sightings 
  const [sightings, setSightings] = useState([]);

  // New State to control the existing sightings Id that the user wants to edit
  const [editSightingsId, setEditSightingsId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/sightings")
      .then((response) => response.json())
      .then((sightings) => {
            setSightings(sightings);
          });
  }, []);

  const addSighting = (newSighting) => {
    //postSighting(newSighting);
    setSightings((sightings) => [...sightings, newSighting]);
  };

  //A function to control the update in the parent 

  const updateSighting = (savedSighting) =>{
    // This function should update the whole list of sightings - 
    setSightings((sightings) => {
      const newArraySightings = [];
      for(let sighting of sightings){
        if(sighting.id === savedSighting.id){
          newArraySightings.push(savedSighting);
        } else {
          newArraySightings.push(sighting);
        }
      }
      return newArraySightings;
    })
    // This line is only to close the form;
    setEditSightingsId(null);
  }
  
  const onEdit = (sighting) =>{
    const editingID = sighting.id;
    setEditSightingsId(editingID);

  }

  return (
    <div className="sightings">
      <h3> Sightings </h3>
      <ul>
        {sightings.map((sighting) => {
          if(sighting.id === editSightingsId){
            //something needs to happento allow the user edit that existing student
            // At some point I need to pass the update function as props - connect this to the backend
            return <Form initialSighting={sighting} saveSighting={updateSighting}/>
          } else{
            return (
              <li key={sighting.id}>
           {sighting.time_sighted} {sighting.date_sighted} {sighting.individual} {sighting.location} {sighting.healthy} {sighting.sighter}<button type="button" onClick={() =>{onEdit(sighting)}}>EDIT</button>
        </li>
            )
          }
        })}
      </ul>
      <Form saveSighting={addSighting} />
    </div>
  );
}

export default Sightings;