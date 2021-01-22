import React, { Component } from 'react';
import './menu.css';
import axios from "axios";
class Menu extends Component {

    constructor(props) {
        super(props);
    }

    /*
    * состояние данные покемонов и ссылка на первый набор данных имен покемонов
    * */
    state={
       pokemonsdata:[],
        firsturl:'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50',
    }

    /*
    * метод при клике по элементу меню, передается родителю компонента изменение состояние скрытие карточки покемонов,
    * ссылка на страницу покемона и закрытие списка меню
    * */
    menuElementClick = (url) => {
        this.props.hidePokemonsCart(true);
        this.props.setPokemonInfoUrl(url);
        this.props.menuClose(false);
    }

    /*
    * метод получение данных покемонов по ссылке, получанные данные добавляется на состояние данных покемонов,
    * и проверятся ссылка на следующий набор данных покемона из ответа, если ссылка имеется, то вызывается
    * метод рекурсивно до конца набора данных.
    * */
    GetPokemonsNameList = (url) => {
        axios.get(url)
            .then(res => {
                const data= res.data.results;
                const nexturl = res.data.next;
                this.setState({ pokemonsdata:this.state.pokemonsdata.concat(data) });
                if(nexturl!==null){
                    this.GetPokemonsNameList(nexturl);
                }
            })
    }

    /*
    * при монтировании компонента вызывается метод получение данных покемонов по ссылке по начальной ссылке
    * */
    componentDidMount = () => {
        this.GetPokemonsNameList(this.state.firsturl);
    }

    /*
    * рендеринг списка покемонов по состоянием данных покемонов
    * */
    render() {
        let PokemonsList = this.state.pokemonsdata;
                return (
                    <ul className="menu_ul">
                    {PokemonsList.map(key => <li className="menu_li" key={key.name}
                                                     onClick={() => this.menuElementClick(key.url)}>{key.name}</li>)}
                </ul>
                );
    }
}

export     default     Menu;