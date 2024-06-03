"use client";
import { useParams } from 'next/navigation';
import { getProductById, getProductsByCategory } from '@/services/buyers';
import React, { useEffect, useState, useContext } from 'react';
import { ProductEntity } from '@/model/product.entity';
import { Link } from '@nextui-org/link';
import { Button, Card, CardBody, CardFooter, Image, Tooltip } from '@nextui-org/react';
import { Icon } from '@iconify/react';




function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<ProductEntity | null>(null);

  const [relatedProducts, setRelatedProducts] = useState<ProductEntity[]>([]);



  useEffect(() => {
    if (params.productId) {
      getProductById(params.productId as string)
        .then((data) => {
          setProduct(data);
        })
        .catch(error => {
          console.error("Error fetching product:", error);
        });



    }
  }, [params.productId]);

  useEffect(() => {
    if (product) {
      getProductsByCategory(product.category)
        .then((data) => {
          const updatedProducts = data.filter((p) => p.id !== product.id);
          setRelatedProducts(updatedProducts);
        })
        .catch(error => {
          console.error("Error fetching related products:", error);
        });
    }
  }, [product]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div className="flex flex-row p-6 gap-4  max-w-7xl m-auto ">
          <div className="">
            <img
              src={product.image}
              alt="Product-Image"
              className="w-full"
            />
          </div>

          <div className="flex flex-col">
            <div>
              {/* Product Title */}
              <h1 className="text-3xl text-primary font-semibold sm:text-4xl">
                {product.name}
              </h1>
              {/* Product Description */}
              <p className="mt-3 text-gray-600 text-md leading-6 text-justify sm:text-left sm:mt-4">
                {product.description}
              </p>

              <span className="text-xl text-blue-500 font-semibold sm:text-2xl">
                $ {product.price}
              </span>
            </div>
            <div className="">
              <div className="text-left flex flex-col gap-2 w-full">
                {/* Quantity Label */}
                <label className="font-semibold">Quantity</label>
                {/* Quantity Input */}
                <input
                  className="border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-blue-500"
                  type="number"
                  defaultValue="1"
                  required
                />
              </div>
              {/* Order Button */}
              <div className="w-full text-left my-4">
                <button
                  className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-blue-500 text-white text-md font-bold border border-blue-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-blue-500 lg:m-0 md:px-6"
                  title="Confirm Order"
                >
                  <span>Confirmar orden</span>
                </button>
              </div>
            </div>
          </div>




        </div>

        <div className="flex flex-col p-6 gap-4  max-w-7xl m-auto">
          <h2 className="text-2xl font-semibold">Productos relacionados</h2>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
          {relatedProducts.map((product) => (
            <div key={product.id}>
              <Link href={`/buyers/product/${product.id}`}>
                <Card shadow="sm" isPressable className="custom-card">
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={product.name}
                      className="w-full object-cover"
                      style={{ height: '200px', maxWidth: '300px' }}
                      src={product.image}
                    />
                  </CardBody>
                  <CardFooter className="p-4 flex flex-col items-center">
                    <b className="mb-2">{product.name}</b>
                    <p className="text-default-500">{`$${product.price.toLocaleString()} COP`}</p>


                    <div className="flex flex-row items-center gap-2">
                      <Button isIconOnly size="md" className="mt-2" color='primary' variant='ghost'><Icon icon="lucide:shopping-cart" /></Button>
                      <Tooltip content="Comprar">
                        <Button size="md" color='primary' variant='bordered'>Comprar</Button>
                      </Tooltip>
                    </div>

                  </CardFooter>
                </Card>
              </Link>
            </div>
          ))}
        </div>
        </div>





      </div>
    </div>
  );
}

export default ProductDetail;
