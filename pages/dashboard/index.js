import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router'
import axios from 'axios';

export default function Dashboard() {

    const [userObj, setUserObj] = useState("")


    const [profile, setProfile] = useState(false)
    const [tasks, setTasks] = useState(false)

    useEffect(() => {
        let temp = localStorage.getItem("accesstoken")

        if (temp) {

            axios.post("http://localhost:3333/auth/verify", {
                accesstoken: temp
            }).then(function (response) {
                setUserObj(response.data.user)
            }).catch(function (error) {
                console.log("Erro: " + error);
            })

        } else {
            Router.push({ pathname: '/' })
        }

    }, [])

    function Logout() {
        localStorage.removeItem('accesstoken')
        Router.push({ pathname: '/' })
    }

    return (
        <div>
            <div>
                <Head>
                    <title>User Panel</title>
                </Head>
                <h2>Bem vindo, {userObj.name ? userObj.name : null}</h2> <button onClick={() => Logout()}>Logout</button>
                <ul>
                    Tasks
                    <li></li>
                </ul>
                <main>
                    <button onClick={() => setProfile(!profile)} >Gerenciar Perfil</button>
                    {profile ? <div>
                        Meu e-mail: {userObj.email ? userObj.email : null}
                        <button>Mudar senha</button>
                    </div> : null}
                    <button onClick={() => setTasks(!tasks)} >Gerenciar minhas Tarefas</button>
                    {tasks ? <div>
                        Adicionar altas tasks aqui
                    </div> : null}
                </main>
                <footer>

                </footer>
            </div>


        </div>
    )
}