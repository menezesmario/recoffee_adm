import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const NewProduct = () => {
    const [form, setForm] = useState({ title: '', price: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createProduct();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const createProduct = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
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
            err.title = 'Um título é necessário';
        }
        if (!form.price) {
            err.price = 'Um preço é necessário';
        }

        return err;
    }

    return (
        <div className="form-container">
            <h1>Cadastrar Produto</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.title ? { content: 'Por favor, adicione um nome', pointing: 'below' } : null}
                                label='Nome'
                                placeholder='Nome'
                                name='title'
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                label='Preço'
                                placeholder='Preço'
                                name='price'
                                error={errors.price ? { content: 'Por favor, adicione um preço', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                
                            <Button type='submit'>Registrar</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

export default NewProduct;