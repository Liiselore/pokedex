import React, {useState, useEffect, useRef} from 'react';
import "./pokemon.css";

const Pokemon = () => {
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedPokemonId, setSelectedPokemonId] = useState(randomPokemon());
    const modalRef = useRef();

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonId}`);
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

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [selectedPokemonId]);

    function randomPokemon() {
        return Math.floor(Math.random() * 151);
    }

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    };

    if (loading) {
        return <p>Laden...</p>;
    }

    return (
        <div className={"pokemon-card"} onClick={openModal}>
            <h2>{pokemon.name}</h2>
            <p>ID: #{pokemon.id}</p>
            <p> Type: {pokemon.types[0].type.name}</p>
            {showModal && (
                <div className="modal">
                    <div className="modal-content" ref={modalRef}>
                        <h2>{pokemon.name}</h2>
                        <p>Height: {pokemon.height} dm</p>
                        <p>Weight: {pokemon.weight} hg</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pokemon;