import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router'
import axios from 'axios';
import { ULdeTasks, NavTopBar, AdminPanel } from '../../styles/Styled'
let localAPI = process.env.localAPI
//let remoteAPI= "https://trabseg-api.herokuapp.com"

export default function Dashboard() {

    const [userObj, setUserObj] = useState(Object)
    const [userTasks, setUserTasks] = useState([])

    const [profile, setProfile] = useState(false)

    const [taskName, setTaskName] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [adicionarTask, setAdicionarTask] = useState(false)

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

    function manageUsers(){
        let temp = localStorage.getItem("accesstoken")

        axios.post(`${localAPI}/auth/verify`, {
            accesstoken: temp
        }).then(function (response) {
            //token valido...
            if (userObj.id !== response.data.user.id){
                console.log("IDs da sessão atual e id do token não correspondem.");
                localStorage.removeItem("accesstoken")
                Router.push({ pathname: '/' })
            } else {
                Router.push({ pathname: '/dashboard/manageusers' })
            }

        }).catch(function (error) {
            console.log("Erro: " + error);
            localStorage.removeItem("accesstoken")
            Router.push({ pathname: '/' })
        })

    }

    function manageTasks(){
        let temp = localStorage.getItem("accesstoken")

        axios.post(`${localAPI}/auth/verify`, {
            accesstoken: temp
        }).then(function (response) {
            //token valido...
            if (userObj.id !== response.data.user.id){
                console.log("IDs da sessão atual e id do token não correspondem.");
                localStorage.removeItem("accesstoken")
                Router.push({ pathname: '/' })
            } else {
                Router.push({ pathname: '/dashboard/managetasks' })
            }

        }).catch(function (error) {
            console.log("Erro: " + error);
            localStorage.removeItem("accesstoken")
            Router.push({ pathname: '/' })
        })

    }

    return (
        <div>
            <div>
                <Head>
                    <title>User Panel</title>
                </Head>

                <NavTopBar>
                <h2>Olá, {userObj.name ? userObj.name : null}!
                {userObj.is_superuser ? <a> Logado como administrador</a> : null }
                </h2>
                 <button onClick={() => Logout()}>Logout</button>
                </NavTopBar>

                <ULdeTasks>
                    <p>Minhas tasks</p>
                    <a>Nome da task</a>
                    {
                        userTasks.map((task, indice) => {

                            return <li key={indice}>
                              <div>
                                  <span>{task.name}</span>
                                    <button onClick={() => RemoverTask(task.id)}>Excluir task</button>
                                </div>
                            </li>
                        })
                    }
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

                </ULdeTasks>
                <main>
                    <button onClick={() => setProfile(!profile)} >Ver meu e-mail</button>
                    {profile ? <div>
                        {userObj.email ? userObj.email : null}
                    </div> : null}



                </main>
                { userObj.is_superuser ?

                    <AdminPanel>
                        <h2>
                            <p>Painel de Administrador</p>
                            <section>
                                <button onClick={() => manageUsers()}>Gerenciar Usuários</button>
                                <button onClick={() => manageTasks()}>Visualizar todas as tarefas</button>
                           </section>

                                                        </h2>
                    </AdminPanel>

                : null }
                <footer>

                </footer>
            </div>


        </div>
    )
}
