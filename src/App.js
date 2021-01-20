import logo from './logo.svg';
import './App.css';
import Pokemoncart from "./components/pokemon_cart/pokemon_cart";

function App() {
  return (
    <div className="App">
      <h2>Pokemons</h2>
        <div className="kk">
          <Pokemoncart id={1} name="Asan" src={logo} />
          <Pokemoncart id={2} name="Uson" src={logo} />
          <Pokemoncart id={3} name="Andrei" src={logo} />
        </div>
    </div>
  );
}

export default App;
