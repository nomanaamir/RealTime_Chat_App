import React, { Component } from 'react';

const Data = (array) => {
  return (
    array.map((props, index)=>{
    return <div key={index}>
      <p>{props.age}</p>
      <p>{props.gender}</p>
      <p>{props.address}</p>
      <p>{props.email}</p>
    </div>


    })
  )
}
export default Data