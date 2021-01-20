import './pokemon_info_page.css';

function Pokemoncart(props){
    return (
        <div className="pokemonCart">
            <img className="avatar" src={props.src} alt={props.name} />
            <h3 className="pokemonName">
                {props.name}
            </h3>
        </div>
    );
}

export default Pokemoncart;
