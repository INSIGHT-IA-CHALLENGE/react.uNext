import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cadastro from './pages/Cadastro/Cadastro';
import Candidatura from './pages/Candidatura/Candidatura';
import Candidaturas from './pages/Candidaturas/Candidaturas';
import Estatisticas from './pages/Estatisticas/Estatisticas';
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

        <Route path='/candidaturas' element={<Candidaturas />} />
        <Route path='/candidaturas/:idCandidatura' element={<Candidatura />} />

        <Route path='/perfil/:idUser' element={<Perfil />} />

        <Route path='/notificacoes' element={<Notificacoes />} />

        <Route path='/estatisticas' element={<Estatisticas />} />
      </Routes>
    </BrowserRouter>
  )
}
