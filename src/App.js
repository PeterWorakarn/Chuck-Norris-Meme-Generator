import React, { useState } from 'react';
import {useForm} from "react-hook-form";
import Joke from './components/Joke';
import Loading from './components/Loading';
import { IconContext } from "react-icons";
import { FaExclamationTriangle } from "react-icons/fa";


function App() {
  const [jokes, setJokes] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors }} = useForm();

  const fetchJokes = async ({amount, firstName, lastName}) => {
    setLoading(true);
    // console.log("fetch Jokes");
    try {
      const response = await fetch(`https://api.icndb.com/jokes/random/${parseInt(amount)}?escape=javascript&firstName=${firstName}&lastName=${lastName}`);
      const data = await response.json();
      setJokes(data.value);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const formHandler = (data) => {
    fetchJokes(data)
    reset({firstName:'',lastName:'',amount:''})
  }

  return (
    <div className="App">
      {loading && <Loading />}
      <main className="container">
        <div className="container__left"><h1>Create your  🤠 Chuck Norris Meme by yourself</h1></div>
        <div className="container__right">
          <form className="form" onSubmit={handleSubmit(formHandler)}>
            <h2 className="form__headline">Fill the form to generate meme</h2>
            <div className="input --firstName">
              <div className="input__wrapper">
                <label className="input__label" htmlFor="firstName">First Name</label>
                {errors.firstName?.type === 'required' && <div className="input__alert"><IconContext.Provider value={{ className: "input__icon" }}><FaExclamationTriangle /></IconContext.Provider></div>}
              </div>
              <input className="input__field" type="text" name="firstName" {...register("firstName",{required: true})} />
            </div>
            <div className="input --lastName">
              <div className="input__wrapper">
                <label className="input__label" htmlFor="lastName">Last Name</label>
                {errors.lastName?.type === 'required' && <div className="input__alert"><IconContext.Provider value={{ className: "input__icon" }}><FaExclamationTriangle /></IconContext.Provider></div>}
              </div>
              <input className="input__field" type="text" name="lastName" {...register("lastName",{required: true})} />
            </div>
            <div className="input --amount">
              <div className="input__wrapper">
                <label className="input__label" htmlFor="amount">Amount</label>
                {errors.amount && <div className="input__alert"><IconContext.Provider value={{ className: "input__icon" }}><FaExclamationTriangle /></IconContext.Provider></div>}
              </div>
              <input inputMode="decimal" className="input__field" type="number" name="amount" {...register("amount",{required: true,min:1})} />
            </div>
            <button className="form__btn" type="submit">Submit</button>
          </form>
        </div>
      </main>
      {jokes && <> <Joke jokes={jokes} /> </>}
    </div>
  );
}

export default App;
