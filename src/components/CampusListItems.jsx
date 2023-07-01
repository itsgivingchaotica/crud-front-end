import React from 'react'

const CampusListItems = (props) => {
  return (
    <div>
    {props.allCampuses.map((campus)=>{
        return (<div key={campus.id}>
                    <h1>{campus.name }</h1>
                </div>)
    })}
    </div>
  )
}

export default CampusListItems