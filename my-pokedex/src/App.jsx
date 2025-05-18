import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [entryNum, setEntryNum] = useState(1)
  const url = `https://pokeapi.co/api/v2/pokemon/${entryNum}`
  const entryNumImgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entryNum}.png`

  useEffect(()=>{
    fetchPokemon()
    document.querySelector("img").setAttribute('src', entryNumImgUrl)
  },[entryNum])

  const fetchPokemon = () => {
      fetch (url)
      .then((response) =>{
        if(!response.ok){
          throw new Error(`This isnt working because ${response.status}`);
        }
        return response.json()
      }
    )
    .then((json) => {
      console.log(json.species.name)
    })
    .catch((error) => {
      console.error(error.message);
    })
  }

  return (
    <>
      <div>
        <div>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"/>
        </div>
      </div>
      <div className="card">
        Current entry number is: <input id="user" type="number" defaultValue={1} min={1}/>
        <br></br>
        <button id="sub" onClick={() => setEntryNum((entryNum) => {
          if(document.getElementById("user").value>0){
          entryNum = document.getElementById("user").value
          return entryNum
          }
        })}>
          Seach
        </button>
        <button id="rand" onClick={() => setEntryNum((entryNum) => {
            entryNum = Math.floor(Math.random()*1025+1)
            document.getElementById("user").value = entryNum
            return entryNum
          })}>
          Randomize
        </button>
      </div>
    </>
  )
}

export default App
