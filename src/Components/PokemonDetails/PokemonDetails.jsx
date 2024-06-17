import React, { useEffect, useState } from 'react'
import './PokemonDetails.css'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
 
function PokemonDetails(){

  const { id } = useParams();
  
  const POKEDEX_DETAIL_URL =  "https://pokeapi.co/api/v2/pokemon/";

  const [Pokemon,setPokemon] = useState(null);

  async function downloadPokemon(){
      const response = await axios.get(POKEDEX_DETAIL_URL + id);
      const Pokemon = response.data;
      console.log(response);
      console.log(Pokemon);

      setPokemon({
          name : Pokemon.name,
          height : Pokemon.height,
          weight : Pokemon.weight,
          types : Pokemon.types,
          image : Pokemon.sprites.other.dream_world.front_default
      })
  }

  useEffect(() => {
    downloadPokemon();
  },[])


  return (
    <>
    <h1 className='pokedex-redirect'>
     <Link to={"/"} className='redirect'>POKEDEX</Link>
    </h1>

 
    {Pokemon && <div className='pokemon-details-wrapper'>
      <div className='pokemon-detail-name'>
        {Pokemon.name}
      </div>
      <div className='pokemon-image'> 
        <img src={Pokemon.image} alt="" />
      </div>
      <div className='pokemon-attributes'>
       <p> height:{Pokemon.height}</p>
       <p>weight:{Pokemon.weight}</p>
      </div>
      <div className='pokemon-types'>
        <h1>Type:</h1>{Pokemon.types.map(t =><span className='type' key={t.type.name}>{t.type.name}</span>)}
      </div>
    </div>}
    </>
  )
}

export default PokemonDetails