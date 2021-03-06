import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;

    p {
        text-align: center;
    }
`

export const LoginButton = styled.input`
    color: blue;
`
export const ErrorMsg = styled.div`
    justify-content: center;
    display: flex;
    color: red;
`

export const Form = styled.form`
    margin-top: 50px;
    flex-direction: column;
    text-align: center;
    label {
        margin: 10px 0px 10px 0px;
        justify-content: center;
        display: flex;
    };

    span {
        display: flex;
        justify-content: center;

        button {
            margin-left: 4px
        }
    }

`

export const ULdeTasks = styled.ul`
    display: flex;
    align-items: center;
    flex-direction: column;
    border-style: solid;
    border-color: gray;
    list-style-type: none;
    p {
        text-align: center;
    };
    li {
    };
    button {
        margin: 10px;
    };
    div {
      display: grid;
      grid-template-columns: 400px 400px;
      align-items: center;
      button {
        width: 200px;
      }
    };
`


export const NavTopBar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-around;
    a {
        color: red;
    }
`

export const AdminPanel = styled.section`

    display: flex;
    justify-content: center;
    background-color: gray;
    text-align: center;
    h2 {
        display: flex;
        flex-direction: column;
    };
    button {
        color: red;
        background-color: black;
        padding: 5px;
        margin: 5px;
    }
`
