import React, { useState, useEffect } from "react";
//import axios from 'axios';
import api from '../api/config'
import Router, { withRouter } from 'next/router'
import { Form } from '../styles/Styled'

export default function Cadastro() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        let temp = localStorage.getItem("accesstoken")

        if (temp) {

            api.post("/auth/verify", {
                accesstoken: temp
            }).then(function (response) {
                Router.push({ pathname: '/dashboard' })
            }).catch(function (error) {
                console.log("Erro: " + error);
                localStorage.removeItem("accesstoken")
                Router.push({ pathname: '/' })
            })

        } else {
        }

    }, [])

    const handleSubmit = (evt) => {
        evt.preventDefault();

        api.post("/auth/register", {
            name: name,
            email: email,
            password: password
        })
            .then(function (response) {
                localStorage.setItem('accesstoken', response.data.accesstoken)
                Router.push({ pathname: '/dashboard' })
            }).catch(function (error) {
                console.log("Erro: " + error);
            })
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input
                        type="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label>
                    E-mail:
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Senha:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    <input type="submit" value="Cadastrar" />
                </label>
            </Form>
        </div>
    )
}