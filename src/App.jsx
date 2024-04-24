import React, { useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [receitas, setReceitas] = useState([]);
  const [nome, setNome] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [nomePesquisa, setNomePesquisa] = useState('');
  const [novaQuantidade, setNovaQuantidade] = useState(1);

  const incluirReceita = () => {
    const novaReceita = { 
     
      nome: nome, 
      ingredientes: ingredientes 
    
    };
    setReceitas([...receitas, novaReceita]);
    setNome('');
    setIngredientes([]);
  };

  const pesquisarReceita = () => {
    return receitas.find(receita => receita.nome === nomePesquisa);
  };

  const editarReceita = (nome, novosIngredientes) => {
    setReceitas(receitas.map(receita =>
      receita.nome === nome ? { ...receita, ingredientes: novosIngredientes } : receita
    ));
  };

  const deletarReceita = (nome) => {
    setReceitas(receitas.filter(receita => receita.nome !== nome));
  };

  const fracionarReceita = (nome, fator) => {
    const receita = pesquisarReceita(nome);
    if (receita) {
      const novosIngredientes = receita.ingredientes.map(ingrediente => ({
        ...ingrediente,
        quantidade: ingrediente.quantidade * fator
      }));
      editarReceita(nome, novosIngredientes);
    }
  };
  return (
    <div>
      <h1>Master Receitas</h1>
      <div>
        <h2>Incluir Receita</h2>
        <input  placeholder="Nome da Receita" value={nome} onChange={e => setNome(e.target.value)} />
        <input  placeholder="Ingredientes (separados por vírgula)" value={ingredientes} onChange={e => setIngredientes(e.target.value.split(','))} />
        <button onClick={incluirReceita}>Incluir</button>
      </div>
      <div>
        <h2>Pesquisar Receita</h2>
        <input  placeholder="Nome da Receita" value={nomePesquisa} onChange={e => setNomePesquisa(e.target.value)} />
        <button onClick={() => console.log(pesquisarReceita())}>Pesquisar</button>
      </div>
      <div>
        <h2>Fracionar Receita</h2>
        <input placeholder="Nome da Receita" value={nomePesquisa} onChange={e => setNomePesquisa(e.target.value)} />
        <input  placeholder="Fator de Multiplicação" value={novaQuantidade} onChange={e => setNovaQuantidade(e.target.value)} />
        <button onClick={() => fracionarReceita(nomePesquisa, novaQuantidade)}>Fracionar</button>
      </div>
      <div>
        <h2>Lista de Receitas</h2>
        <ul>
          {receitas.map(receita => (
            <li key={receita.nome}>
              <strong>{receita.nome}</strong>: {receita.ingredientes.join(', ')}
              <button onClick={() => editarReceita(receita.nome, ['Novo Ingrediente'])}>Editar</button>
              <button onClick={() => deletarReceita(receita.nome)}>Deletar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 


export default App
