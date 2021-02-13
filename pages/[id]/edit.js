import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const EditProduct = ({ product }) => {
    const [form, setForm] = useState({ title: product.title, price: product.price });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateProduct();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const updateProduct = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/products/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.title) {
            err.title = 'Um nome é necessário';
        }
        if (!form.price) {
            err.price = 'Um preço é necessário';
        }

        return err;
    }

    return (
        <div classtitle="form-container">
            <h1>Atualizar produto</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.title ? { content: 'Por favor digite um nome', pointing: 'below' } : null}
                                label='Title'
                                placeholder='Title'
                                title='title'
                                name={form.title}
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                label='Preço'
                                placeholder='Preço'
                                name='price'
                                error={errors.price ? { content: 'Por favor digite uma descrição', pointing: 'below' } : null}
                                value={form.price}
                                onChange={handleChange}
                            />
                            
                            <Button type='submit'>Atualizar</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

EditProduct.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`);
    const { data } = await res.json();

    return { product: data }
}

export default EditProduct;