import React, { Component } from 'react'

const WikiTile = props => {
  return(
    <div className= {props.wikiClass}>
      <p>{props.wikiIntro}</p>
      <img src={props.wikiImage}></img>
    </div>
  )
}

export default WikiTile
