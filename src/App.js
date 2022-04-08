import "./App.css";
import ProductsList from "./components/ProductsList";
import Cart from "./components/Cart";
import { useState, useEffect } from "react";
import fotoLogo from "./components/imgs/logo.svg";

function App() {
  const [products, setProducts] = useState([]);

  const [currentSale, setCurrentSale] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchResponse = async () => {
      const response = await fetch(
        "https://hamburgueria-kenzie-json-serve.herokuapp.com/products"
      );

      const jsonResponse = await response.json();

      setProducts(jsonResponse);
      setFilteredProducts(jsonResponse);
    };

    fetchResponse();
  }, []);

  const showProducts = () => {
    const filtraPesquisa = products.filter((item) => {
      return (
        item.name.toUpperCase().includes(input.toUpperCase()) ||
        item.category.toUpperCase().includes(input.toUpperCase())
      );
    });
    setFilteredProducts(filtraPesquisa);
  };

  const handleClick = (id) => {
    const findProduct = products.find((product) => product.id === id);
    const checkFindProduct = currentSale.find(
      (cartProduct) => cartProduct.id === id
    );

    !checkFindProduct && setCurrentSale([...currentSale, findProduct]);
  };

  const handleClickRemove = (id) => {
    const newCurrentSale = currentSale.filter((item) => item.id !== id);

    setCurrentSale(newCurrentSale);
  };

  const removeAllItems = () => {
    setCurrentSale([]);
  };

  return (
    <>
      <header>
        <img src={fotoLogo} alt="Logo Burguer Kenzie" />
        <form>
          <input
            type="text"
            placeholder="Digitar Pesquisa"
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="button" onClick={() => showProducts()}>
            Pesquisar
          </button>
        </form>
      </header>

      <main>
        <section className="vitrine">
          <ProductsList
            products={filteredProducts}
            handleClick={handleClick}
            children={"Adicionar"}
          />
        </section>

        <section className="carrinho">
          {currentSale.length >= 1 ? (
            <div className="divProduct">
              <h2>Carrinho de Compras</h2>
              <ProductsList
                products={currentSale}
                handleClick={handleClickRemove}
                children={"excluir"}
              />
              {currentSale.length > 0 && <Cart currentSale={currentSale} />}
              <button className="deleteAll" onClick={removeAllItems}>
                Remover Todos{" "}
              </button>
            </div>
          ) : (
            <div className="divCarrinho">
              <h2>Carrinho de Compras</h2>
              <p>Sua Sacola Esta Vazia</p>
              <span>Adicione Itens</span>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
