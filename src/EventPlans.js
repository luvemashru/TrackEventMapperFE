import React, { useState } from 'react';
import axios from 'axios';
import {Button} from 'primereact/button'

const EventsForm = (props) => {
  const [forms, setForms] = useState([{ name: '', description: '', rules: '' }]);

  const handleAddForm = () => {
    setForms([...forms, { name: '', description: '', rules: "" }]);
  };

  const getRules = () => {
      const rules = forms.map((form)=>{
        return {
            "name":form?.name,
            "description":form?.description,
            "rules":JSON.parse(form?.rules)

        }
    })
    return rules
  }

  const handleRemoveForm = (index) => {
    const updatedForms = forms.filter((form, i) => i !== index);
    setForms(updatedForms);
  };

    async function handleSaveForms() {
        const events = forms.map((form)=>{
            return {
                "name":form?.name,
                "description":form?.description,
                "rules":JSON.parse(form?.rules)

            }
        })
        console.log(events)
        const resp = await axios.post("http://localhost:8000/events",{"events":events})
        console.log(resp)
    };

  const handleInputChange = (index, field, value) => {
    const updatedForms = forms.map((form, i) =>
      i === index ? { ...form, [field]: value } : form
    );
    setForms(updatedForms);
    console.log(forms)
  };

  async function handleSavePlans(){
    const eventsToAdd = getRules()
    const payload = {
      "display_name":props.plan_name,
      "rules":{
        "events":eventsToAdd
      }
    }
    try{
      const response = axios.post('http://localhost:8000/tracking-plan', {"tracking_plan":payload})
    }catch(e){
      console.log(e)
    }
  }

  return (
    <div>
      {forms.map((form, index) => (
        <React.Fragment>
            <div key={index} style={{ marginBottom: '20px' }}>
                <h3>Event {index + 1}</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Rules (JSON)"
                    value={form.rules}
                    onChange={(e) => handleInputChange(index, 'rules', e.target.value)}
                />
                <button onClick={() => handleRemoveForm(index)}>-</button>
            </div>
            <hr></hr>
        </React.Fragment>
      ))}
      <div className='grid'>
        <div className='column'><Button onClick={handleAddForm}>+</Button></div>
        <div className='column'><Button onClick={handleSaveForms}>Save Events</Button></div>
        <div><Button onClick={handleSavePlans}>Save Plan</Button></div></div>
    </div>
  );
};

export default EventsForm;
