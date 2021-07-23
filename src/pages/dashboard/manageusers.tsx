import Router from 'next/router'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

let localAPI = process.env.localAPI

export default function ManageTasks() {
  const [userObj, setUserObj] = useState("")
  const [allUsers, setAllUsers] = useState([])

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

        axios.get(`${localAPI}/user`, {
            headers: {
                'accesstoken': temp
            }
        }).then(function (response) {
            setAllUsers(response.data.users);
        }).catch(function (error) {
            console.log("Erro: " + error);
        })

    } else {
        Router.push({ pathname: '/' })
    }

}, [])

  return (
    <div>
      <h2>Lista com todos os usuários cadastrados:</h2>
      <ul>
        {
          allUsers.map(user => {
            return <li key={user.id}>
              <strong>ID:</strong> {user.id}, <strong>Nome:</strong> {user.name}, <strong>E-mail:</strong> {user.email}
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