import styled from 'styled-components';

export const AddFoto = styled.label`
    background: none;
    border: none;
    position: absolute;
    bottom: 5px;
    right: 5px;

    & > i {
        font-size: 30px;
        color: var(--cinza5);
        cursor: pointer;
        background-color: var(--cinza1);
        border-radius: 60px;
    }
`

export const AddItem = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
    & > i {
        color: var(--cor1);
        font-size: 25px;
        background-color: var(--cor5);
    }
`

export const RemoveItem = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    margin: 10px;
    right: 0;
    transform: translateY(-180%);
    color: var(--cinza5);
    
    &.centro{
        top: 50%;
        transform: translateY(-50%);
    }

    & > i {
        color: darkred;
        font-size: 15px;
    }
`

