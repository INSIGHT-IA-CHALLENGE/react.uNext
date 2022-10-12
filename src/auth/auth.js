
export function baseUrl() {
    const host = window.location.hostname

    if (host === "localhost")
        return "http://localhost:8080/ApiUnext/rest"
    else
        return ""
}

export async function logar(user) {

    const res = await fetch(`${baseUrl()}/usuario/logar`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })

    if (res.status === 200) {
        const data = await res.json()

        localStorage.setItem('user-logado', JSON.stringify({
            id: parseInt(data[0]),
            tipo: data[1]
        }))

        return 200
    }
    else
        return res.status
}

export function deslogar() {
    localStorage.removeItem('user-logado')
}

export function validaLogin() {
    const userLogado = JSON.parse(localStorage.getItem('user-logado'))

    if (userLogado !== undefined && userLogado !== null) {
        if (userLogado.id > 0 && ["empresa", "candidato"].includes(userLogado.tipo))
            return true
        else {
            deslogar()
            return false
        }
    }
}

export function userLogado(){
    return JSON.parse(localStorage.getItem('user-logado'))
}