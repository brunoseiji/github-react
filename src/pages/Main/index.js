import React, { useState, useCallback } from 'react';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';
import {Container, Form, SubmitButton} from './style';

import api from '../../services/api';

export default function Main() {

    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState(['']);
    const [loading, setloading] = useState(false);

    const handleSubmit = useCallback((e) => {

        e.preventDefault();

        async function submit() {
            setloading(true);
            try {
                const response = await api.get(`repos/${newRepo}`);
                const data = {
                    name: response.data.full_name,
                }

                setRepositorios([...repositorios, data]);
                setNewRepo('');
            } catch(error) {
                console.log(error);
            } finally {
                setloading(false);
            }
        }

        submit();

    }, [newRepo, repositorios]);
    
    function handleInputChange(e) {
        setNewRepo(e.target.value);
    }

    return(
        <Container>
            <h1>
                <FaGithub size={25} />
                Meus Repositórios
            </h1>

            <Form onSubmit={handleSubmit}>
                <input type="text" placeholder="Adicionar repositórios"
                value={newRepo}
                onChange={handleInputChange}
                />

                <SubmitButton loading={loading ? 1: 0}>
                    {loading ? (
                        <FaSpinner color="#fff" size={14}/>
                    ) : (
                        <FaPlus color="#fff" size={14} />
                    )}
                </SubmitButton>

            </Form>

        </Container>
    )
}