'use client';
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import api from "@/services/api";

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMTMyNmJlLWQwZDAtNGU4Yy1hZDczLWI4OTBlMTg5M2M0MSIsImlhdCI6MTcxNjA3MDMyNCwiZXhwIjoxNzE2MDc3NTI0fQ.-AUIeIaaly42DHUSn3SVavMFZw3nFMXSZ15hugLbL6M";
        const response = await api.get("/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const updatedProducts = response.data.map(product => ({
          ...product,
          img: "https://nextui.org/images/hero-card-complete.jpeg"
        }));

        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {products.map((product, index) => (
        <Card
          shadow="sm"
          key={index}
          isPressable
          onPress={() => console.log("product presionado")}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={product.name}
              className="w-full object-cover h-[140px]"
              src={product.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{product.name}</b>
            <p className="text-default-500">{`$${product.price.toLocaleString()} COP`}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
