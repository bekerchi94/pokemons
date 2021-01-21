import logo from './logo.svg';
import './App.css';
import Pokemoncart from "./components/pokemon_cart/pokemon_cart";
import Menu from "./components/menu/menu";
import PokemonInfoPage from "./components/pokemon_info_page/pokemon_info_page";
import React, {Component} from "react";

class App extends Component {

    constructor(props) {
        super(props);
        this.menuClick = this.menuClick.bind(this);
    }

    state={
        showmenu:false,
        hidePokemonCart:false,
        UrlPokemonInfo:''
    }

    menuClick =()=> {
        this.setState({showmenu: !this.state.showmenu});
    }

    menuClose =(value)=>{
        this.setState({showmenu:value});
    }

    updatePokemonsState = (value) => {
        this.setState({ hidePokemonCart: value });
    }

    setPokemonInfoUrl = (url) => {
        this.setState({UrlPokemonInfo: url});
    }

    render() {
        const ShowMenu = this.state.showmenu;
        let MenuElement;
        if (ShowMenu) {
            MenuElement = <Menu setPokemonInfoUrl={this.setPokemonInfoUrl} menuClose={this.menuClose} hidePokemonsCart={this.updatePokemonsState} />;
        }

        let PokemonInfoUrl = this.state.UrlPokemonInfo;
        let PokemonInfoElement;
        if(PokemonInfoUrl!==''){
            PokemonInfoElement= <PokemonInfoPage url={PokemonInfoUrl} />;
        }
        //alert(PokemonInfoUrl+"app");

        const hidePokemonsCart =this.state.hidePokemonCart;
        let PokemonsCart;
        if(hidePokemonsCart==false){
            PokemonsCart=<Pokemoncart setPokemonInfoUrl={this.setPokemonInfoUrl} />;
        }


        return (
            <div className="App">
                <div className="row" onClick={this.menuClick}>
                    <span><h1>Menu</h1></span>
                    <span id="toggle"><span></span></span>
                </div>
                {MenuElement}
                {PokemonInfoElement}
                {PokemonsCart}
            </div>
        );
    }

}

export default App;
