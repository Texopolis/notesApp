import React, { useState } from 'react'
import plus from '../images/plus-solid.png'
import minus from '../images/minus-solid.png'



export default function Card(props) {

    const [stateTag, setStateTag] = useState({value:'', id:null});

    const handleTagChange=(e)=>{
        setStateTag(prev=>{
            return {...prev, value: e.target.value, id: e.target.id}
    })
  }

    const handleTagSubmit = (e)=>{
        props.addTag(stateTag)
        setStateTag({value:'', id:null})
        e.preventDefault()
    }

  return (
    <>
        <div className="card">
            <div className="mainContent">
                <img className='avatar' src={props.img}/>
                <div className="content">
                    <h1 className="name">{props.name}</h1>
                    <div className="details">
                        <p>Email: {props.email}</p>
                        <p>Company: {props.company}</p>
                        <p>Skill: {props.skill}</p>
                        <p>Average: {props.average}%</p>
                    </div>
                </div>
            </div>
                {props.clicked && 
                    <div className="testScores">
                        {props.testScores.map((score, index)=>{
                            return(
                            <p key={index}>
                                {`Test ${index +1}: \u00A0\u00A0\u00A0\u00A0\u00A0 ${score}%`}
                            </p>)
                        })}
                    </div>
                }
            <div className="tagField">
                <div className="tagElements">
                    {props.tags && props.tags.map((tag, id)=>{
                        return <div className="tag" key={id}>{tag}</div>
                    })}
                </div>
                <div className="tagDivUnderline">
                    <form onSubmit={handleTagSubmit}>
                        <input
                            type="text"
                            placeholder="Add a tag"
                            className="tagInput"
                            name="tags"
                            value={stateTag.value}
                            onChange={handleTagChange}
                            id={props.id}
                            onSubmit={handleTagSubmit}
                        />
                    </form>
                </div>
            </div>
            <button className="btn" onClick={()=>props.buttonHandler(props.id)}>
                <img className="btn-img" src={props.clicked? minus : plus}/>
            </button>
        </div>

    </>
  )
}
