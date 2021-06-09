import React from 'react';
import { FaQuoteLeft } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function Joke({ jokes }) {
    return (
        <section className="results">
            {jokes.map((joke) => {
                return (
                    <div className="result" key={joke.id}>
                        <div className="result__text">
                            <IconContext.Provider value={{ className: 'quote__icons' }}><FaQuoteLeft /></IconContext.Provider>
                            <span className="text">{joke.joke}</span>
                        </div>

                    </div>)
            })}
        </section>
    )
}