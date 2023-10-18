import React, {useState, useEffect} from 'react';
import "./pokemon.css";

const Pokemon = () => {
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon/1');
                if (response.ok) {
                    const data = await response.json();
                    setPokemon(data);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Fout bij het ophalen van Pokémon-gegevens:', error);
                setLoading(false);
            }
        }

        fetchPokemon();
    }, []);

    if (loading) {
        return <p>Laden...</p>;
    }

    return (
        <div className={"pokemon-card"}>
            <h2>Pokémon Details</h2>
            <p>Naam: {pokemon.name}</p>
            <p>Nummer: {pokemon.id}</p>
        </div>
    );
};

export default Pokemon;