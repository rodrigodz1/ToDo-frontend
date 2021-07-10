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
    border-style: ridge;
    list-style-type: none;
    p {
        text-align: center;
    };
    li {
        span {
            margin-right: 50px;
        }
    }
`

export const NavTopBar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-around;
    a {
        color: red;
    }
`

