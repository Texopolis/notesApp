import './App.css';
import { getStudents } from './utilities/getData';
import { useEffect, useState } from 'react';
import Card from './components/card'


function App() {
  
  const [allStudents, setStudents] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(async() => {
    setStudents(await getStudents())},[]);

    console.table(allStudents)

    const getAverage = (arr) =>{
      let numArray = arr.map(Number)
      let sum = numArray.reduce((a,b) => a + b )
      return sum / numArray.length;
    }

    const buttonHandler = (id)=>{
      setStudents(prev=>{
        return prev.map((card)=>{
          return card.id == id ? {...card, clicked: !card.clicked } : card
        })
      })
    }

    const addTag=(val)=>{
      // console.log(val.value)
      setStudents(prev=>{
        return prev.map((card)=>{
          return card.id == val.id ? {...card, tags:[...card.tags, val.value]} : card
        })
      })
    }

    const studentObject = allStudents.filter((val)=>{
        if (searchText == ""){
          return val
        }else if(val.firstName.toLowerCase().includes(searchText.toLowerCase())
                || val.lastName.toLowerCase().includes(searchText.toLowerCase())){
          return val
        }
        }).map((student, index)=>{
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

    // console.log(stateTag)

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
        </div>
        <div className="container">
          {studentObject}
        </div>
      </div>
    </div>
  );
}

export default App;
