import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header';
import TabMenu from './components/TabMenu/TabMenu';
import Cadastro from './pages/Cadastro/Cadastro';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Notificacoes from './pages/Notificacoes/Notificacoes';
import Perfil from './pages/Perfil/Perfil';
import RecuperarSenha from './pages/RecuperarSenha/RecuperarSenha';
import Vaga from './pages/Vaga/Vaga';
import Vagas from './pages/Vagas/Vagas';

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/recuperarSenha' element={<RecuperarSenha />} />

        <Route path='/vagas' element={<Vagas />} />
        <Route path='/vagas/:idVaga' element={<Vaga />} />

        <Route path='/perfil/:idUser' element={<Perfil />} />

        <Route path='/notificacoes' element={<Notificacoes />} />
      </Routes>
    </BrowserRouter>
  )
}
