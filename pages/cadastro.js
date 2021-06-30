import React, { useState, useEffect } from "react";
import axios from 'axios';
import Router, { withRouter } from 'next/router'

export default function Cadastro() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        let temp = localStorage.getItem("accesstoken")

        if (temp) {

            axios.post("http://localhost:3333/auth/verify", {
                accesstoken: temp
            }).then(function (response) {
                Router.push({ pathname: '/dashboard' })
            }).catch(function (error) {
                console.log("Erro: " + error);
            })

        } else {
            Router.push({ pathname: '/' })
        }

    }, [])

    const handleSubmit = (evt) => {
        evt.preventDefault();

        axios.post("http://localhost:3333/auth/register", {
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
            <form onSubmit={handleSubmit}>
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
                <input type="submit" value="Cadastrar" />
            </form>
        </div>
    )
}