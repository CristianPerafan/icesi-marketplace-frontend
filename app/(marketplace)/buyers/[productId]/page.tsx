"use client";
import { useParams } from 'next/navigation';
import { getProductById } from '@/services/buyers';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductEntity } from '@/model/product.entity';

function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = React.useState<ProductEntity>()


  useEffect(() => {
    if (params.id) {
      getProductById(params.productId as string)
        .then((data) => {
          setProduct(data);
        })
        .catch(error => {
          console.error("Error fetching product:", error);
        });
    }
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center p-4">
      <div>
        <img
          alt={product.name}
          className="w-full object-cover"
          style={{ height: '400px', maxWidth: '600px' }}
          src={product.image}
        />
        <div className="mt-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-lg">{`Price: $${product.price.toLocaleString()} COP`}</p>
          <p>{product.description}</p>
          <button className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg'>Buy Now</button>
          <Link href="/buyers">
            <a className='mt-2 text-blue-500'>Back to Products</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
