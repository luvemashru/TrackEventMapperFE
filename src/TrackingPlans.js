import React, { useState } from 'react';
import axios from 'axios';
import EventsPlan from './EventPlans'
import {Button} from "primereact/button"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";           

const TrackingPlanForm = () => {
  const [name, setName] = useState([]);
  const [description, setDescription] = useState('');
  const [events, setEvents] = useState([]);
  const [planName, setPlanName] = useState("")
  const [planDescription, setPlanDescription] = useState("")
  const [allPlans, setAllPlans] = useState([])
  const [flag, setFlag] = useState(false)
  const [allEvents, setAllEvents] = useState([])
  const [eventFlag, setEventFlag] = useState(false)
  
  const handlePlanNameChange = (event) => {
    setPlanName(event.target.value);
  };
  
  const handlePlanDescriptionChange = (event) => {
    setPlanDescription(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleEventAdd = (e) => {
    setEvents([...events, { name: e.target.value, description: e.target.value }]);
  };

  const handleEventRemove = (event) => {
    setEvents(events.filter((e) => e !== event));
  };

  const setEvent = (event) =>{
    console.log(event.target.value)
    axios.get("http://localhost:8000/tracking-plan")
  }

  async function fetchPlans() {
    const resp = await axios.get("http://localhost:8000/tracking-plan")
    setAllPlans(resp.data)
    setEventFlag(false)
    setFlag(true)
  }
  
  async function fetchEvents() {
    const resp = await axios.get("http://localhost:8000/events")
    setAllEvents(resp.data)
    setFlag(false)
    setEventFlag(true)
    console.log(resp)
  }

  async function AddPlans() {
    const payload = {

    }
  }

  return (
    <>
    <div className='div dictionary mleft mtop'>
      <h1 className='mtop'>Add Tracking Plan</h1>
      {/* Track Plan */}
      <div className='grid'>
        <div className='column'>
          Name
        </div>
        <div className='column'>
          <input 
            type="text" 
            value={planName} 
            onChange={handlePlanNameChange}
          />
        </div>
        </div>
      <hr className='mtop'></hr>
      {/* Events */}
      <EventsPlan 
        plan_name={planName}
      />
      <hr></hr>
      
    </div>
    <div className=' div mleft dictionary mtop'>
    <div className='grid mtop'>
      <div className='row'>
      <Button onClick={()=>{fetchPlans()}}>Get Plans</Button>
      </div>
      <div className='row'>
      <Button onClick={()=>{fetchEvents()}}>Get Events</Button>
      </div>
      </div>
      {flag && <DataTable className='mtop' value={allPlans} tableStyle={{ minWidth: '50px' }}>
        <Column field="display_name" header="Name"></Column>
        <Column field="is_active" header="Is Active"></Column>
      </DataTable>}
      {eventFlag &&
        <DataTable value={allEvents} tableStyle={{ minWidth: '50px' }}>
          <Column field="name" header="Name"></Column>
          <Column field="description" header="Description"></Column>
        </DataTable>
      }
    </div>
    </>
  );
};

export default TrackingPlanForm;
