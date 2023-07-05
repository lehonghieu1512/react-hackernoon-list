import logo from './logo.svg';
import './App.css';
import React, { useReducer, useState } from 'react';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
const HACKERNOONHOST = "https://hn.algolia.com/api/v1/search?query=";
const FETCH_SUCCESS = "FETCH_SUCCESS";
function useCustomSearchState(state, action) {
  if (action.type === FETCH_SUCCESS) {
    return action.payload;
  }
}
function App() {
  const [searchResults, dispatchSearchResults] = useReducer(useCustomSearchState, []); 
  const [searchTerm, setSearchTerm] = useState("");
  React.useEffect(() => {
    const timeoutObj = setTimeout(() => {
    console.log(searchTerm, "sss");
    fetch(`${HACKERNOONHOST}${searchTerm}`).then(
      resp => resp.json()
    ).then(result => {
      dispatchSearchResults({type: FETCH_SUCCESS, payload: result.hits})
    }).catch((err) => {
      console.log("errorrrrr", err);
    })
    }, 1000);
    return () => clearTimeout(timeoutObj);
  }, [searchTerm]); 
  
  const onChangeSearchTerm = (event) => {
    console.log(event);
    setSearchTerm(event.target.value);
  };
  return <div>
    <h1>Hacker noon search</h1>
    <input type="text" onChange={onChangeSearchTerm}></input>
    <ul>
      {
      searchResults.map(item => 
        <a href={item.url}><li>{item.title}</li></a>
      )}
    </ul>
  </div>
}
export default App;
