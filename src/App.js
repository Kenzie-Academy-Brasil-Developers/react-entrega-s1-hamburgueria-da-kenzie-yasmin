import './App.css';
import { ProductsList } from './components/ProductsList'
import {useState, useEffect} from 'react'

function App() {

  const [products, setProducts] = useState('https://hamburgueria-kenzie-json-serve.herokuapp.com/products');

  useEffect(() => {

    const fetchResponse = async () => {
      const response = await fetch(products);

      const jsonResponse = await response.json();

      setProducts(jsonResponse);
    };

    fetchResponse();
  }, [products]);


  const showProducts = () => {
    
  }

  const handleClick = (productId) => {
    
  }

  return (
    
    <>
    <header></header>
    <main>
      <ProductsList products={products}/>
    </main>
    </>

  );
}

export default App;
