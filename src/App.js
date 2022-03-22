import './App.css';
import { getStudents } from './utilities/getData';
import { useEffect, useState } from 'react';


function App() {
  
  const [allStudents, setStudents] = useState([])

  useEffect(async() => {
    setStudents(await getStudents())},[]);

    console.log(allStudents)

    const getAverage = (arr) =>{
      let numArray = arr.map(Number)
      let sum = numArray.reduce((a,b) => a + b )
      return sum / numArray.length
    }

    const studentObject = allStudents.map(student=>{
      return(
          <div>
            <img src={student.pic}/>
            <h2>{student.firstName} {student.lastName}</h2>
            <p>Email: {student.email}</p>
            <p>Company: {student.company}</p>
            <p>Skill: {student.skill}</p>
            <p>Average: {getAverage(student.grades)}</p>
          </div>
      )
    }) 


  return (
    <div className="App">
      {studentObject}
    </div>
  );
}

export default App;
