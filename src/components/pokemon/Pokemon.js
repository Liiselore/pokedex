import React, {useState, useEffect} from 'react';
import "./pokemon.css";

const Pokemon = () => {
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

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

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);

        console.log("SLUIT DAN")
    };

    if (loading) {
        return <p>Laden...</p>;
    }

    return (
        <div className={"pokemon-card"} onClick={openModal}>
            <h2>{pokemon.name}</h2>
            <p>ID: #{pokemon.id}</p>
            <p>Type: {pokemon.types[0].type.name} & {pokemon.types[1].type.name}</p>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>X</span>
                        <h2>{pokemon.name}</h2>
                        <p> Type: {pokemon.types[0].type.name} & {pokemon.types[1].type.name} </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pokemon;