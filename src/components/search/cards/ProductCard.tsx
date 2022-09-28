import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Product from "../../../types/products";
import { Image } from "@yext/pages/components";

const ProductCard = ({ result }: CardProps<Product>): JSX.Element => {
  const product = result.rawData;
  const productImage = product.photoGallery?.[0];

  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      <figure>
        {productImage && <Image className="h-96" image={productImage} />}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="">{product.richTextDescription}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
