import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router'
import axios from 'axios';
import { ULdeTasks, NavTopBar } from '../../styles/Styled'
let localAPI = process.env.localAPI
//let remoteAPI= "https://trabseg-api.herokuapp.com"

export default function Dashboard() {

    const [userObj, setUserObj] = useState("")
    const [userTasks, setUserTasks] = useState([])

    const [profile, setProfile] = useState(false)
    const [mostrarTasks, setMostrarTasks] = useState(false)

    const [taskName, setTaskName] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [adicionarTask, setAdicionarTask] = useState(false)
    const [editarTask, setEditarTask] = useState([])

    useEffect(() => {
        let temp = localStorage.getItem("accesstoken")

        if (temp) {

            axios.post(`${localAPI}/auth/verify`, {
                accesstoken: temp
            }).then(function (response) {
                setUserObj(response.data.user)
            }).catch(function (error) {
                console.log("Erro: " + error);
                localStorage.removeItem("accesstoken")
                Router.push({ pathname: '/' })
            })

            axios.get(`${localAPI}/task`, {
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


    const handleCreateTask = (evt) => {
        evt.preventDefault();
        let token = localStorage.getItem("accesstoken")

        let task = {
            name: taskName,
            description: taskDescription
        }

        axios.post(`${localAPI}/task/create`, task, {
            headers: {
                'accesstoken': token
            }
            //headers always last argument

        }).then(function (response) {
            console.log(response.data);
            document.location.reload(true);
        }).catch(function (error) {
            console.log("Erro: " + error);
        })

    }

    const handleEditarTask = id => {
        let token = localStorage.getItem("accesstoken")

        let task = {
            name: taskName,
            description: taskDescription
        }

        axios.put(`${localAPI}/task/${id}`, task, {
            headers: {
                'accesstoken': token
            }
            //headers always last argument

        }).then(function (response) {
            console.log(response.data);
            document.location.reload(true);
        }).catch(function (error) {
            console.log("Erro: " + error);
        })
    }

    function RemoverTask(id) {
        axios.delete(`${localAPI}/task/${id}`, {
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

                <NavTopBar>
                <h2>Bem vindo, {userObj.name ? userObj.name : null}! 
                {userObj.is_superuser ? <a> Logado como administrador</a> : null }
                </h2>
                 <button onClick={() => Logout()}>Logout</button>
                </NavTopBar>

                <ULdeTasks>
                    <p>Minhas tasks</p>
                    <button onClick={() => setAdicionarTask(!adicionarTask)}>Adicionar task</button>
                    { adicionarTask ?

                        <form onSubmit={handleCreateTask}>
                            <label>Nome da task:</label>
                            <input
                                type="text"
                                value={taskName}
                                onChange={e => setTaskName(e.target.value)}
                            />
                            <label>Insira uma descrição:</label>
                            <input
                                type="text"
                                value={taskDescription}
                                onChange={e => setTaskDescription(e.target.value)}
                            />
                            <input type="submit" value="Criar tarefa" />
                        </form>

                    : null}
                    {
                        userTasks.map((task, indice) => {

                            return <li key={indice}>
                                <span>{task.name}</span>

                                

                                <button onClick={() => RemoverTask(task.id)}>Excluir task</button>
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