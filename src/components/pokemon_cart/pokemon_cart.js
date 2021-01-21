import React, { Component } from 'react';
import './pokemon_cart.css';
import axios from "axios";

class Pokemoncart extends Component {

    constructor(props) {
        super(props);
        this.cartClick = this.cartClick.bind(this);
    }

    state={
        params:[],
        next:'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10',
        prev:''
    }

    cartClick =(url)=> {
        this.props.setPokemonInfoUrl(url);
    }

    GetPokemonImageUrl = (urls) => {
       Promise.all([axios.get(urls[0].url),
                   axios.get(urls[1].url),
                   axios.get(urls[2].url),
                   axios.get(urls[3].url),
                   axios.get(urls[4].url),
                   axios.get(urls[5].url),
                   axios.get(urls[6].url),
                   axios.get(urls[7].url),
                   axios.get(urls[8].url),
                   axios.get(urls[9].url)
       ]).then(pokemoninfo => {

           const params = this.state.params;
           let newparams =[];

           const count =params.length;
           for(let i=0; i<count; i++){
            let item = {
                name : params[i].name,
                url : params[i].url,
                image : pokemoninfo[i].data.sprites.other['official-artwork'].front_default
            }
            newparams.push(item);
           }

            this.setState({params : newparams});

        });

    }

    GetPokemonsNameList = (url) => {
        axios.get(url)
            .then(res => {
                const next = res.data.next;
                const prev = res.data.previous;
                const params = res.data.results;
                this.GetPokemonImageUrl(params);
                this.setState({ params,next,prev});
            })
    }

    componentDidMount = () => {
        this.GetPokemonsNameList(this.state.next);
    }

    render() {
        const prev = this.state.prev;
        let buttonPrev;
        if (prev) {
            buttonPrev = <button className="navbutton" onClick={() => this.GetPokemonsNameList(prev)} >Previous page</button>;
        }
        const next = this.state.next;
        let buttonNext;
        if (next) {
            buttonNext = <button className="navbutton" onClick={() => this.GetPokemonsNameList(next)} >Next page</button>;
        }

            return (
                <div className="container">
                    <h2>Pokemons</h2>
            <div className="row">
                {this.state.params.map(key =><div className="pokemonCart" onClick={() => this.cartClick(key.url)}>
                        <img className="avatar" src={key.image} alt={key.name}/>
                        <h3 className="pokemonName">
                            {key.name}
                        </h3>
                    </div>
                )}
            </div>
                    {buttonPrev}
                    {buttonNext}
            </div>
            );
        }
}

export     default     Pokemoncart;