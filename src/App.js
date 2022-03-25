import './App.css';
import { getStudents } from './utilities/getData';
import { useEffect, useState } from 'react';
import Card from './components/card'


function App() {
  //STATE
  const [allStudents, setStudents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTag, setSearchTag] = useState('');

  //GET DATA FROM API- ONE TIME
  useEffect(async() => {
    setStudents(await getStudents())},[]);

  //CALCULATE GRADE AVERAGE
    const getAverage = (arr) =>{
      let numArray = arr.map(Number)
      let sum = numArray.reduce((a,b) => a + b )
      return sum / numArray.length;
    }

  //HANDLE BUTTON THAT EXPANDS GRADES
    const buttonHandler = (id)=>{
      setStudents(prev=>{
        return prev.map((card)=>{
          return card.id == id ? {...card, clicked: !card.clicked } : card
        })
      })
    }

    //RECIEVES COPY OF STATE OBJECT FROM CARD COMPONENT AND PUTS INTO APP.JS STATE
    const addTag=(val)=>{
      setStudents(prev=>{
        return prev.map((card)=>{
          return card.id == val.id ? {...card, tags:[...card.tags, val.value]} : card
        })
      })
    }

    //ALL SEARCH LOGIC
    const studentObject = allStudents.filter((val)=>{
      switch(true){
        case (searchText == ""):
          return val
          break;
        case (val.firstName.toLowerCase().includes(searchText.toLowerCase())
          || val.lastName.toLowerCase().includes(searchText.toLowerCase())):
          return val
          break;
      }
      }).filter(student =>{
        switch(true){
          case( 
            student.tags.join('').toLowerCase().includes(searchTag.toLowerCase())):
            return student
            break;
        }
      })
      .map((student, index)=>{
        return( 
          <Card 
            key={index}
            id={student.id}
            img={student.pic}
            name={student.firstName + ' ' + student.lastName}
            email={student.email}
            company={student.company}
            skill={student.skill}
            average={getAverage(student.grades)}
            buttonHandler={buttonHandler}
            clicked={student.clicked}
            testScores={student.grades}
            addTag={addTag}
            tags={student.tags}
          />
    )
  }) 

//RENDERED APP
  return (
    <div className="App">
      <div className="wrapper">
        <div className='input'>
          <input
            type="text"
            className="submit"
            placeholder="Search by name"
            onChange={(e)=>{setSearchText(e.target.value)}}
          />
          <input
            type="text"
            className="submit"
            placeholder="Search by tag"
            onChange={(e)=>{setSearchTag(e.target.value)}}
          />

        </div>
        <div className="container">
          {studentObject}
        </div>
      </div>
    </div>
  );
}

export default App;
