import React from 'react'

export const ProductCard = ({product}) => {
  const { name, price, amount } = product;
  return (
    <div className='product__card'>
      <p>Nombre: {name}</p>
      <p>Precio: {price}</p>
      <p>Cantidad: {amount}</p>
    </div>
  )
}