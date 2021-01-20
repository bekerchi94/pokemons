import React, { Component } from 'react';
import './pokemon_cart.css';
import PokemonInfoPage from "./../pokemon_info_page/pokemon_info_page";
import axios from "axios";
class Pokemoncart extends Component {

    constructor(props) {
        super(props);
        // Эта привязка обязательна для работы `this` в колбэке.
        this.cartClick = this.cartClick.bind(this);
    }

    state={
        names:[],
        images:[],
        url:[],
        next:'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10',
        prev:'',
        showPokemonUrl:''
    }

    cartClick(url) {
        this.setState({showPokemonUrl: url});
    }

    GetPokemonImageUrl(url){
        axios.get(url)
            .then(res => {
                const image= res.data.sprites.other['official-artwork'].front_default;
                return image;
            })
    }

    GetPokemonsNameList(url){
        axios.get(url)
            .then(res => {
                let names= []; //res.data.results.name;
                const next = res.data.next;
                const prev = res.data.previous;
                const data = res.data.results;
                let url=[];
                let images=[];
                data.forEach(function(element){
                    names.push(element.name);
                    url.push(element.url);
                    let imageurl=this.GetPokemonImageUrl(element.url);
                    images.push(imageurl);
                    console.log(imageurl);
                },this);

                this.setState({ names,next,prev});
            })
    }

    componentDidMount() {
        this.GetPokemonsNameList(this.state.next);
    }

    render() {
        if((this.state.showPokemonUrl!==null)&&(this.state.showPokemonUrl!==''))
        {
            return (
                <PokemonInfoPage url={this.state.showPokemonUrl} />
            );
        }
        else {
            return (
                <div>
                    <h2>Pokemons</h2>
            <div className="row">
                <div className="pokemonCart" onClick={() => this.cartClick(this.props.id)}>
                    <img className="avatar" src={this.props.src} alt={this.props.name}/>
                    <h3 className="pokemonName">
                        {this.props.name}
                    </h3>
                </div>
            </div>
            <button className="navbutton">Previous page</button>
            <button className="navbutton">Next page</button>
            </div>
            );
        }
    }
}

export     default     Pokemoncart;