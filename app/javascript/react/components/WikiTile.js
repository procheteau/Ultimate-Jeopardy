import React, { Component } from 'react'

const WikiTile = props => {
  return(
    <div className= "wiki-box">
      <p>{props.wikiIntro}</p>
      <img src={props.wikiImage}></img>
    </div>
  )
}

export default WikiTile
