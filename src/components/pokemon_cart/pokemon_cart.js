import React, { Component } from 'react';
import './pokemon_cart.css';
class Pokemoncart extends Component {

    constructor(props) {
        super(props);
        // Эта привязка обязательна для работы `this` в колбэке.
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(id) {
        //e.preventDefault();
        console.log('По ссылке кликнули.' + id);
    }


   // function
    render() {
        return (
            <div className="pokemonCart" onClick={() => this.handleClick( this.props.id)}>
                <img className="avatar" src={this.props.src} alt={ this.props.name}/>
                <h3 className="pokemonName">
                    {this.props.name}
                </h3>
            </div>
        );
    }
}

export     default     Pokemoncart;