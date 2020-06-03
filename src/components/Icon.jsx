import React from 'react'
import FontAwesome from 'react-fontawesome'
 
function Icon(props){
    return (
        <FontAwesome
          name={props.name}
          className = "fa-c"
          className = {props.className}
        />
      )
}

export default Icon;