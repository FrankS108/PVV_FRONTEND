import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEnterprise } from '../hooks/useEnterprise';
import ClipLoader from "react-spinners/ClipLoader";
import { ProductCard } from '../components/ProductCard';

export const Products = () => {
  const [search, setSearch] = useState("");
  const { getProducts, products, loading, handleSearchProduct } = useEnterprise();
  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  const params = useParams();
  const navigate = useNavigate();

  const { id } = params;
  useEffect(() => {
    getProducts(id);
  }, [])

  const handleAdd = (e) => {
    e.preventDefault();
    navigate(`/enterprises/new-product/${id}`);
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
    handleSearchProduct(search)
  }


  if(loading) return <div style={style}><ClipLoader loading={loading} color="#FDBC2C" size={150}/></div>
  return (
    <>
      <div className="inputs container">
        <input value={search} onChange={handleSearch} className="search" type="search" name="" id="search" placeholder="Buscar"/>
        <button className="add" onClick={handleAdd}>+</button>
      </div>
      <div className="generic__container container">
        {
          products.length ? 
          products.map((element, index) => (
            <ProductCard key={index} product={element}/>
          ))
          : <p className='text__alternative'>No hay productos</p>
        }
      </div>
    </>
  )
}