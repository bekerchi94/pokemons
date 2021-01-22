import React, { Component } from 'react';
import './pokemon_cart.css';
import axios from "axios";

class Pokemoncart extends Component {

    constructor(props) {
        super(props);
        this.cartClick = this.cartClick.bind(this);
    }

    /*
    * состояние параметров покенонов, следующая страница карточек покемонов тут ссылка на первой страницы
    * (limit=10 пагинация по 10 покемонов) и состояние ссылки на предыдущий страницы карточек покемонов
    * */
    state={
        params:[],
        next:'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10',
        prev:''
    }

    /*
    * метод при клике карточки покемона передается родителю ссылка на страницу покемона
    * */
    cartClick =(url)=> {
        this.props.setPokemonInfoUrl(url);
    }

    /*
    * метод получение ссылки на изображение покемонов из ссылок на страницу покемона, тут выполняется паралелный запрос
    * на станиц покемонов и полученными ссылками на изображений покемонов обновляется состояние данных покемонов
    * */
    GetPokemonImageUrl = (urls) => {
        /* паралельный запрос на страниц покемонов из списка данных покемонов */
        /*TODO исправить массив методов */
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
           /* присваивание новому переменному данных покемонов с добавлением ссылки на изображениий */
           const count =params.length;
           for(let i=0; i<count; i++){
            let item = {
                name : params[i].name,
                url : params[i].url,
                image : pokemoninfo[i].data.sprites.other['official-artwork'].front_default
            }
            newparams.push(item);
           }
            /* обновление состояние данных покемонов с новыми данными */
            this.setState({params : newparams});

        });

    }

    /*
    * метод получение списка покемонов с именем и ссылками на страницу покемона, также ссылки на слудущую и предыдущую страницу
    * карточек (для пагинации), тут также вызывается метод получение ссылки на изображение покемонов
    * */
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

    /*
    * при монтировании компонента вызывается метод получение списка покемонов с началной ссылкой
    * */
    componentDidMount = () => {
        this.GetPokemonsNameList(this.state.next);
    }

    render() {
        /*
        * если присуствует ссылка на предыдущую страницу карточек то присваивается переменному предыдущая кнопка
        * кнопка на предыдущую страницу карточек для вызова метода получение данных покемонов с сылкой на предыдущую страницу
        * иначе переменная пустая, переменная используется для дальнейщего рендеринга (пагинация)
        * */
        const prev = this.state.prev;
        let buttonPrev;
        if (prev) {
            buttonPrev = <button className="navbutton" onClick={() => this.GetPokemonsNameList(prev)} >Previous page</button>;
        }

        /*
        * если присуствует ссылка на следующую страницу карточек то присваивается переменному следующая кнопка
        * кнопка на следующаю страницу карточек для вызова метода получение данных покемонов с сылкой на следующую страницу
        * иначе переменная пустая, переменная используется для дальнейщего рендеринга (пагинация)
        * */
        const next = this.state.next;
        let buttonNext;
        if (next) {
            buttonNext = <button className="navbutton" onClick={() => this.GetPokemonsNameList(next)} >Next page</button>;
        }

        /*
        *  рендеринг карточек покемонов по состоянием данных покемонов и кнопками пагинации
        * */
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