import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon';
import './PokemonList.css'


function PokemonList () {

    const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";
    const [pokemonList , setPokemonList] = useState([]);
    const [pokedexUrl , setPokedexUrl] = useState(DEFAULT_URL);
    const [nextURL , setNextURL] = useState(DEFAULT_URL);
    const [prevURL , setPrevURL] = useState(DEFAULT_URL);

   

     async function downloadPokemons(){

            const response = await axios.get(setPokemonList.pokedexUrl ? setPokemonList.pokedexUrl : DEFAULT_URL);
     
            const Individual_data = response.data.results;

            setNextURL(response.data.next);
            setPrevURL(response.data.previous);
 
            

            const pokemon_promise = Individual_data.map((pokemon) => axios.get(pokemon.url));
            const pokemonListData = await axios.all(pokemon_promise);

            const PokeMonFinalList = pokemonListData.map(pokemonData => {
                const pokemon = pokemonData.data;
                
                return{
                    id : pokemon.id,
                    name : pokemon.name,
                    image : pokemon.sprites.other.dream_world.front_default,
                    types : pokemon.types
                }

            });

            setPokemonList(PokeMonFinalList);
          
    }

   

    useEffect(() => {
        downloadPokemons();
    }, [pokedexUrl])

   return (
    <div className='pokemon-list-wrapper'>
       <h1>Pokemon List</h1>

      <div className='page-controls'>
            <button onClick={() => setPokedexUrl(prevURL)}>Previous</button>
            <button onClick={() => setPokedexUrl(nextURL)}>Next</button>
       </div>

       <div className='pokemon-list'>

         {pokemonList.map(pokemon => <Pokemon name = {pokemon.name} key={pokemon.id} url={pokemon.image} id={pokemon.id} />)}
       </div>
    </div>
  )
}

export default PokemonList;
