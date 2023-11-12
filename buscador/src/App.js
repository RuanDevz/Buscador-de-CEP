import {FiSearch} from 'react-icons/fi'
import './estilos/style.css';
import { useState } from 'react';
import api from './services/api'
import React from 'react'

const App = () => {

  const [input, setInput] = useState("")
  const [cep,setCep] = useState({});
  const [erro, setErro] = useState('')

  async function Handleclick()
  {
    if(input === '')
    {
      setErro("Preencha um CEP")
    }

    try
    {
      const response = await api.get(`${input}/json`);
      console.log(response.data)
      setCep(response.data)
      setInput("")
      setErro("")
    }catch
    {
      alert("Ops erro na tentativa de busca");
      setInput("")
    }
  }

  return (
    <div className='container'>
      <h1 className='title'>Buscador de CEP</h1>
      <div className='containerinput'>
        <input type='text' placeholder='Digite um CEP' value={input} onChange={(e) => setInput(e.target.value)}></input>
        <button className='buttonsearch' onClick={Handleclick}>
          <FiSearch size={30} color='#000'/>
        </button>
      </div>
      <p className='msgerro'>{erro}</p>

      {Object.keys(cep).length > 0 && (
              <main className='infos'>
              <h2>CEP: {cep.cep}</h2>
              <span>UF:{cep.uf}</span>
              <span>Cidade: {cep.localidade}</span>
              <span>Bairro: {cep.bairro}</span>
              <span>Rua: {cep.logradouro}</span>
              </main>
      )}
    </div>
  )
}

export default App
