import React from 'react'
import './Pokemon.css'
import { Link } from 'react-router-dom'
 

function Pokemon ({name ,  url , id})  {
  return (

    <Link to={`/pokemon/${id}`} className='pokemon-wrapper'>
      <div className='pokemon'>
        <div className='content'>
              <div className='pokemon-name'>{name}</div>
              <div>
                 <img  className ='pokemon-image' src={url} alt="image" />
              </div>
        </div>
      </div>
    </Link>
  ) 
}

export default Pokemon