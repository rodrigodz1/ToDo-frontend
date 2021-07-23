import Router from 'next/router'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

let localAPI = process.env.localAPI

export default function ManageTasks() {

  const [userObj, setUserObj] = useState("")
  const [userTasks, setUserTasks] = useState([])

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

        axios.get(`${localAPI}/task/getalltasks`, {
            headers: {
                'accesstoken': temp
            }
        }).then(function (response) {
            setUserTasks(response.data.tasks);
        }).catch(function (error) {
            console.log("Erro: " + error);
        })

    } else {
        Router.push({ pathname: '/' })
    }

}, [])

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
      <h2>Essas são todas as tasks cadastradas no banco de dados atualmente:</h2>
      <ul>
      {
        userTasks.map((task, indice) => {
          return <li key={indice}>
            <strong>ID:</strong> {task.id}, <strong>Nome:</strong> {task.name},
             <strong>Descrição:</strong> {task.description}, <strong>ID do criador: </strong>  
             {task.user_id} - <button onClick={() => RemoverTask(task.id)}>Excluir task</button>
            </li>
        })
      }
      </ul>
      <section>
      <button onClick={() => Router.push({ pathname: '/dashboard' })}>Ir para Dashboard</button>
      <button onClick={() => {
        localStorage.removeItem("accesstoken")
        Router.push({ pathname: '/' })
      }}>Logout</button>
      </section>
    </div>
  )
}