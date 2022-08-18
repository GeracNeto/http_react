import './App.css'

import { useEffect, useState } from 'react'

const url = 'http://localhost:3000/products'

function App() {

  const [products, setProducts] = useState([])

  // 1 Resgatando dados
  useEffect(() => {

    async function fecthData() {
      const res = await fetch(url)
      const data = await res.json()

      setProducts(data)
    }

    fecthData()
  }, [])

  //console.log(products)

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map(product => (<li key={product.id}>{product.name} - {product.price}</li>))}
      </ul>
    </div>
  )
}

export default App;
