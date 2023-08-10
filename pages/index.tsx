import styled from "styled-components";
import { Product } from "@/types/Product";
import { NextPage } from "next";
import Link from "next/link";

const Header = styled.div`
  background-color: lightgray;
  display: flex;
  align-items: center;
  padding: 8px;
  font-weight: 800;
`;

const List = styled.ul`
  li {
    list-style: none;
    padding: 8-px;
    margin: 8px;
  }
`;

const Title = styled.h2`
  padding-left: 16px;
  color: blue;
`;

export async function getStaticProps() {
  const res = await fetch("http://localhost:3001/products?_limit=10");
  const products: Product[] = await res.json();

  return {
    props: { products },
    revalidate: 10,
  };
}

const Home: NextPage<{ products: Product[] }> = ({ products }) => {
  return (
    <>
      <Header>Loja de Hardware</Header>
      <Title>10 produtos mais vendidos</Title>
      <List>
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <li>
              <strong>{product.title}</strong>
            </li>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Home;
