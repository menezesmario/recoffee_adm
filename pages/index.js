import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card } from 'semantic-ui-react';

const Index = ({ products }) => {
  return (
    <div className="products-container">
      <h1>Produtos</h1>
      <div className="grid wrapper">
        {products.map(product => {
        return (
            <div key={product._id}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${product._id}`}>
                      <a style={{color: '#705705'}}>{product.title}</a>
                    </Link>
                   </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Link href={`/${product._id}`}>
                    <Button style={{backgroundColor: '#705705', color: 'white'}}>Visualizar</Button>
                  </Link>
                  <Link href={`/${product._id}/edit`}>
                    <Button style={{backgroundColor: '#af8e23', color: 'white'}}>Editar</Button>
                  </Link>
                </Card.Content>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/products');
  const { data } = await res.json();

  return { products: data }
}

export default Index;



