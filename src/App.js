import React, { useState } from 'react';
import Joke from './components/Joke';
import Loading from './components/Loading';
import { FaRegTimesCircle} from "react-icons/fa";


function App() {
  const [jokes, setJokes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [firstName, setFirstName] = useState('Chuck');
  const [lastName, setLastName] = useState('Norris');
  const [amount, setAmount] = useState(10);

  const fetchJokes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.icndb.com/jokes/random/${amount}?escape=javascript&firstName=${firstName}&lastName=${lastName}`);
      const data = await response.json();
      setJokes(data.value);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const formHandler = (e) => {
    e.preventDefault();
    if (firstName.length !== 0 && lastName.length !== 0 && amount > 0 && Boolean(amount)) {
      fetchJokes()
      setFirstName('');
      setLastName('');
      setAmount('');
      setError(false);
    }
    else {
      setError(true);
    }

  }

  return (
    <div className="App">
      {loading && <Loading />}
      <main className="container">
        <div className="container__left"><h1>Create your  🤠 Chuck Norris Meme by yourself</h1></div>
        <div className="container__right">
          <form className="form" onSubmit={formHandler}>
            <h2 className="form__headline">Fill the form to generate meme</h2>
            <div className="input --firstName">
              <label className="input__label" htmlFor="firstName">First Name</label>
              <input className="input__field" type="text" name="firstName" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
            </div>
            <div className="input --lastName">
              <label className="input__label" htmlFor="lastName">Last Name</label>
              <input className="input__field" type="text" name="lastName" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
            </div>
            <div className="input --amount">
              <label className="input__label" htmlFor="amount">Amount</label>
              <input className="input__field" type="number" name="amount" value={amount} onChange={(e) => { setAmount(parseInt(e.target.value)) }} />
            </div>
            {error && <div className="form__alert"><FaRegTimesCircle /><p>Please complete the form before submit</p></div>}
            <button className="form__btn" type="submit">Submit</button>
          </form>
        </div>
      </main>
      {jokes && <> <Joke jokes={jokes} /> </>}
    </div>
  );
}

export default App;
