import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';

const Product = ({ product }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteProduct();
        }
    }, [isDeleting])

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

    const deleteProduct = async () => {
        const productId = router.query.id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/products/${productId}`, {
                method: "Delete"
            });

            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    return (
        <div className="product-container">
            {isDeleting
                ? <Loader active />
                :
                <>
                    <h1>{product.title}</h1>
                    <p>{product.price}</p>
                    <Button color='red' onClick={open}>Excluir</Button>
                </>
            }
            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
        </div>
    )
}

Product.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`);
    const { data } = await res.json();

    return { product: data }
}

export default Product;