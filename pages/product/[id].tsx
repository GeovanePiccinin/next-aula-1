import { NextPage } from "next/types";
import { Product } from "../../types/Product";
import useSWR from "swr";

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3001/products?_limit=10");

  const products: Product[] = await res.json();

  const paths = products.map((product) => {
    return {
      params: { id: String(product.id) },
    };
  });
  return { paths, fallback: true };
}

export async function getStaticProps({ params }: any) {
  const product: Product = await fetch(
    `http:localhost:3001/products/${params.id}`
  ).then((resp) => resp.json());

  return {
    props: { product },
    revalidate: 10,
  };
}

const Product: NextPage<{ product: Product }> = ({ product }) => {
  const { data, error } = useSWR(
    product && product.id
      ? `http://localhost:3001/products/${product.id}`
      : null,
    product && product.id
      ? () =>
          fetch(`http://localhost:3001/products/${product.id}`).then((res) =>
            res.json()
          )
      : null,
    {
      fallbackData: product,
    }
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <div>Title:{data.title}</div>
      <div>Description:{data.desc}</div>
      <div>Price:{data.price}</div>
    </div>
  );
};

export default Product;
