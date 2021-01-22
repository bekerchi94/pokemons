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

    /*
    * состояние показа списка меню, скрытие карточек покемонов, ссылка на страницы покемона
    * */
    state={
        showmenu:false,
        hidePokemonCart:false,
        UrlPokemonInfo:''
    }

    /*
    клик по кнопке меню, изменяет состояние показа списка меню
    * */
    menuClick =()=> {
        this.setState({showmenu: !this.state.showmenu});
    }

    /*
    * изменить состояние показа списка меню в закрытое положение при переходе по пункту меню
    * */
    menuClose =(value)=>{
        this.setState({showmenu:value});
    }

    /*
    * изменение состояние показа карточек покемонов, чтобы не показывался карточки при переходе по пункту меню
    * */
    updatePokemonsState = (value) => {
        this.setState({ hidePokemonCart: value });
    }

    /*
    * Изменение состояние ссылки на покемона чтобы, открыть страницу покемона
    * */
    setPokemonInfoUrl = (url) => {
        this.setState({UrlPokemonInfo: url});
    }

    render() {
        /*
        * Если состояние показа меню истинное то, для перемнного Элемента меню вызывается компонента меню и
        * передается методы изменение ссылка на покемона, изменение состояние показа меню и скрытие карточек покемонов
        * иначе переменная пустая, переменная используется далее при рендеринге.
        * */
        const ShowMenu = this.state.showmenu;
        let MenuElement;
        if (ShowMenu) {
            MenuElement = <Menu setPokemonInfoUrl={this.setPokemonInfoUrl} menuClose={this.menuClose} hidePokemonsCart={this.updatePokemonsState} />;
        }

        /*
        * Если состояние ссылки на покемона не пустое то для переменного элемент информации покемона вызывается компонента Страница покемона,
        * иначе переменная пустая, переменная используется дальнейшем при рендеринге.
        * */
        let PokemonInfoUrl = this.state.UrlPokemonInfo;
        let PokemonInfoElement;
        if(PokemonInfoUrl!==''){
            PokemonInfoElement= <PokemonInfoPage url={PokemonInfoUrl} />;
        }

        /*
        * Если состояние скрытие карточек покемона ложно, то для переменного карточки покемонов вызывается компонента карта покемонов
        * и передается метод изменение ссылки на страницу покемона,
        * иначе переменная пустая, переменная используется дальнейшем при рендеринге
        * */
        const hidePokemonsCart =this.state.hidePokemonCart;
        let PokemonsCart;
        if(hidePokemonsCart===false){
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
