import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  
  const [employeeList, setemployeeList] = useState([]);
  const [newWage, setNewWage] = useState (0);

  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      console.log("success")
    });
  };

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      setemployeeList(response.data);
    });
  };

  const updateEmployees = (id) => {
    Axios.put('http://localhost:3001/update', {wage : newWage , id : id}).then(
      (response) => {
        setemployeeList(employeeList.map((val) => {
          return val.id == id ? {
            id : val.id,
            name: val.name,
            country: val.country,
            age:val.age,
            position: val.position,
            wage: newWage,
          } : val;
        }))
      }
    );
  };

  const deleteEmployees = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=> {
      setemployeeList(employeeList.filter((val)=>{
        return val.id != id
      })
      );
    });
  };
  
    

  return (
  <div className="App">
    <div className="Information">
      <label>Name:</label>
      <input 
        type="text" 
          onChange={(event) =>{
            setName(event.target.value);
          }}
      />
      <label> Age: </label>
      <input 
          type="number"
            onChange={(event) =>{
              setAge(event.target.value);
            }}
      />
      <label>Country</label>
      <input 
        type="text"  
          onChange={(event) =>{
              setCountry(event.target.value);
            }}  
      />
      <label>Position</label>
      <input 
        type="text"  
          onChange={(event) =>{
              setPosition(event.target.value);
            }}
      />
      <label>Wage:</label>
      <input 
        type="number"  
          onChange={(event) =>{
              setWage(event.target.value);
            }}
       />
      <button onClick={addEmployee}> Add Employee </button>
    </div>
    <div className="employees">
    <button onClick={getEmployees}> Show Employees </button>

    {employeeList.map((val,key) => {
      return (
        <div className="employee"> 
            <div>
              <h3>Name : {val.name}</h3>
              <h3>Age : {val.age}</h3> 
              <h3>Country :{val.country}</h3> 
              <h3>Position : {val.position}</h3> 
              <h3>Wage : {val.wage}</h3> 
            </div>
              <div> 
                <input 
                type ="text" 
                placeholder="2000..." 
                onChange={(event) => {
                  setNewWage(event.target.value);
                }} 
              /> 
                <button onClick= {() => {updateEmployees(val.id);}}> Update </button>
                <button onClick= {() => {deleteEmployees(val.id)}}> Delete </button>
              </div>
        </div>
      );
    })}
    </div>

  </div> );
}

export default App;
