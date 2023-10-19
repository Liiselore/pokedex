import './App.css';
import Pokemon from "./components/pokemon/Pokemon";

function App() {

    return (
        <>
            <h1>Pokédex</h1>
            <div className={"pokemon-cards"}>
                <Pokemon/>
                <Pokemon/>
                <Pokemon/>
                <Pokemon/>
                <Pokemon/>
                <Pokemon/>
            </div>
            <div>
                <button type={"button"}
                        className={"randomize-button"}
                >
                    Randomize pokémon
                </button>
            </div>
        </>
    );
}

export default App;
