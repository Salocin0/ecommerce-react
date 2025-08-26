import { useEffect } from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  useEffect(() => {
    console.log(product);
  }, []);

  return (
    <div>
      <Link to={"/product/" + product.id}>
        <h2>{product.title}</h2>
        <img src={product.image} alt={product.title} />
        <p>{product.description}</p>
        <p>{product.price}</p>
        <div>
          <p>{product.rating.rate}</p>
          <p>{product.rating.count}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
