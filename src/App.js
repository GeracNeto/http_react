import './App.css'

import { useEffect, useState } from 'react'

const url = 'http://localhost:3000/products'

function App() {

  const [products, setProducts] = useState([])

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  // 1 Resgatando dados (GET)
  useEffect(() => {

    async function fecthData() {
      const res = await fetch(url)
      const data = await res.json()

      setProducts(data)
    }

    fecthData()
  }, [])

  //console.log(products)

  // Add de produtos (POST)
  const handleSubmit = async (e) => {

    e.preventDefault()

    const product = {
      name,
      price
      /*
      Mesmo que dizer:

      name: name
      price: price

      Isso porque as chaves possuem os mesmos nomes que os valores
      */
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })

    // 3 Carregamento dinâmico
    const addedProduct = await res.json()

    setProducts(prevProducts => [...prevProducts, addedProduct]) 

    setName('')
    setPrice('')
    
    console.log(product)
  }

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map(product => (<li key={product.id}>{product.name} - R$ {product.price}</li>))}
      </ul>
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" value={name} name='name' onChange={e => setName(e.target.value)} />
          </label>
          <label>
            Preço:
            <input type="number" value={price} name='name' onChange={e => setPrice(e.target.value)} />
          </label>
          <input type="submit" value='Criar' />
        </form>
      </div>
    </div>
  )
}

export default App;
