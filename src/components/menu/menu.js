import React, { Component } from 'react';
import './menu.css';
import PokemonInfoPage from "./../pokemon_info_page/pokemon_info_page";
import axios from "axios";
class Menu extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    state={
       names:[],
        next:'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50',
       showPokemonUrl:''
    }

    handleClick(url) {
        this.setState({showPokemonUrl: url});
    }

    GetPokemonsNameList(url){
        axios.get(url)
            .then(res => {
                const name1= res.data.results;
                const next = res.data.next;
                this.setState({ names:this.state.names.concat(name1) });
                if(next!==null){
                    this.GetPokemonsNameList(next);
                }
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
            }else {
                return (
                    <ul className="menu_ul">
                    {this.state.names.map(key => <li className="menu_li" key={key.name}
                                                     onClick={() => this.handleClick(key.url)}>{key.name}</li>)}
                </ul>
                );
            }
    }
}

export     default     Menu;