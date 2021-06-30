import Head from 'next/head'
import React, { useState } from 'react';

export default function Admin() {

    const [email, setEmail] = useState("rb@ufpi.edu.br")

    const [profile, setProfile] = useState(false)
    const [tasks, setTasks] = useState(false)
    const [users, setUsers] = useState(false)

    return (
        <div>
            <Head>
                <title>Superuser Panel</title>
            </Head>
            <h2>Bem vindo, {email}</h2> <button>Logout</button>
            <main>
                <button onClick={() => setProfile(!profile)} >Gerenciar Perfil</button>
                {profile ? <div>
                    Meu e-mail: {email}
                    <button>Mudar senha</button>
                </div> : null}
                <button onClick={() => setTasks(!tasks)} >Gerenciar minhas Tarefas</button>
                {tasks ? <div>
                    Adicionar altas tasks aqui
                </div> : null}
                <button onClick={() => setUsers(!users)} >Gerenciar Usuários</button>
                {users ? <div>
                    Mostrar todos os usuários aqui
                </div> : null}
            </main>
            <footer>

            </footer>
        </div>
    )
}