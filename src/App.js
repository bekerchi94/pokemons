import logo from './logo.svg';
import './App.css';
import Pokemoncart from "./components/pokemon_cart/pokemon_cart";
import Menu from "./components/menu/menu";
import PokemonInfoPage from "./components/pokemon_info_page/pokemon_info_page";
import {Component} from "react";

class App extends Component {

    constructor(props) {
        super(props);
        this.menuClick = this.menuClick.bind(this);
    }

    state={
        showmenu:false
    }

    menuClick(url) {
        this.setState({showmenu: !this.state.showmenu});
    }


    render() {
        const ShowMenu = this.state.showmenu;
        let MenuElement;
        if (ShowMenu) {
            MenuElement = <Menu/>;
        }
        return (
            <div className="App">
                <a id="toggle" onClick={this.menuClick}><span></span></a>
                {MenuElement}
                    <Pokemoncart id={1} name="Asan" src={logo}/>
            </div>
        );
    }

}

export default App;
