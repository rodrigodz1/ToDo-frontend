import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router'
import axios from 'axios';
import { ULdeTasks } from '../../styles/Styled'

export default function Dashboard() {

    const [userObj, setUserObj] = useState("")
    const [userTasks, setUserTasks] = useState([])

    const [profile, setProfile] = useState(false)
    const [mostrarTasks, setMostrarTasks] = useState(false)

    useEffect(() => {
        let temp = localStorage.getItem("accesstoken")

        if (temp) {

            axios.post("http://localhost:3333/auth/verify", {
                accesstoken: temp
            }).then(function (response) {
                setUserObj(response.data.user)
            }).catch(function (error) {
                console.log("Erro: " + error);
                localStorage.removeItem("accesstoken")
                Router.push({ pathname: '/' })
            })

            axios.get("http://localhost:3333/task", {
                headers: {
                    'accesstoken': temp
                }
            }).then(function (response) {
                setUserTasks(response.data)
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

    function EditarTask() {

    }

    function RemoverTask(id) {
        axios.delete(`http://localhost:3333/task/${id}`, {
            headers: {
                'accesstoken': localStorage.getItem("accesstoken")
            }
        }).then(function (response) {
            console.log(response.data);
            document.location.reload(true);
        }).catch(function (error) {
            console.log("Erro: " + error);
        })
    }

    return (
        <div>
            <div>
                <Head>
                    <title>User Panel</title>
                </Head>
                <h2>Bem vindo, {userObj.name ? userObj.name : null}</h2> <button onClick={() => Logout()}>Logout</button>
                <ULdeTasks>
                    <p>Minhas tasks</p>
                    {
                        userTasks.map((task, indice) => {
                            return <li key={indice}>
                                <span>{task.name}</span>

                                <button>Editar</button>
                                <button onClick={() => RemoverTask(task.id)}>Excluir</button>
                            </li>
                        })
                    }
                </ULdeTasks>
                <main>
                    <button onClick={() => setProfile(!profile)} >Gerenciar Perfil</button>
                    {profile ? <div>
                        Meu e-mail: {userObj.email ? userObj.email : null}
                        <button>Mudar senha</button>
                    </div> : null}
                    <button onClick={() => setMostrarTasks(!mostrarTasks)}>Gerenciar minhas Tarefas</button>
                    {mostrarTasks ? <div>
                        Adicionar altas tasks aqui
                    </div> : null}
                </main>
                <footer>

                </footer>
            </div>


        </div>
    )
}