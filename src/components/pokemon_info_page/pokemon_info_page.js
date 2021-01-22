import React, { Component } from 'react';
import './pokemon_info_page.css';
import axios from 'axios';

class PokemonInfoPage extends Component {
    constructor(props) {
        super(props);
    }
    /*
    * состоянии имя, ссылка на изображение, рост, вес, тип, характеристики, движении покемона
    * */
    state = {
        name:'',
        img:'',
        height:'',
        weight:'',
        types:[],
        abilities:[],
        moves:[],
    }

    /*
    * метод для получение информации покемона по ссылке, по ответу сервера обновляет состояние данных покемона
    * */
    GetPokemonInfo = (url) => {
        axios.get(url)
            .then(res => {
                const name= res.data.name;
                const img = res.data.sprites.other['official-artwork'].front_default;
                const height = res.data.height;
                const weight = res.data.weight;
                const types = res.data.types;
                const abilities = res.data.abilities;
                const moves =res.data.moves;
                this.setState({ name,img,height,weight,types,abilities,moves });
            })
    }

    /*
    * вызов метода обновление данных покемона по ссылке при монтировании компонента
    * */
    componentDidMount = () => {
       this.GetPokemonInfo(this.props.url);
    }

    /*
    * вызов метода обновление данных покемона по ссылке при получении ссылки на покемона родителем компонента
    * */
    componentWillReceiveProps(nextProps) {
        if(nextProps.url!==this.props.url){
            this.GetPokemonInfo(nextProps.url);
        }
    }

    /*
    * рендеринг по состоянии данных покемона
    * */
    render() {
        return (
            <div className="pokemonInfoCart">
                <img className="avatar" src={this.state.img} alt={ this.state.name}/>
                <h3 className="pokemonInfoName">
                    Name : {this.state.name}
                </h3>
                <p> height : {this.state.height} </p>
                <p> weight : {this.state.weight} </p>
                <b>Type :</b>
                <ul className="parameters">
                    { this.state.types.map(key => <li key={key.state}>{key.type['name']}</li>)}
                </ul>
                <b>Abilities:</b>
                <ul className="parameters">
                    { this.state.abilities.map(key => <li key={key.slot}>{key.ability['name']}</li>)}
                </ul>
                <b>Moves:</b>
                <ul className="parameters">
                    { this.state.moves.map(key => <li key={key.move['name']}>{key.move['name']}</li>)}
                </ul>
            </div>
        );
    }
}

export     default     PokemonInfoPage;
