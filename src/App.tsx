import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Feed from './pages/Feed'
import Vagas from './pages/Vagas'
import NovaVaga from './pages/NovaVaga'
import Painel from './pages/Painel'
import Perfil from './pages/Perfil'
import Noticias from './pages/Noticias'
import Transparencia from './pages/Transparencia'
import Forum from './pages/Forum'
import Biblioteca from './pages/Biblioteca'
import Mapa from './pages/Mapa'
import Atendimento from './pages/Atendimento'
import Denuncias from './pages/Denuncias'
import Indicadores from './pages/Indicadores'
import Cursos from './pages/Cursos'
import Calendario from './pages/Calendario'
import Governos from './pages/Governos'
import Govers from './pages/Govers'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import PerfilPublico from './pages/PerfilPublico'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/vagas" element={<Vagas />} />
      <Route path="/vagas/nova" element={<NovaVaga />} />
      <Route path="/painel" element={<Painel />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/perfil/:id" element={<PerfilPublico />} />
      <Route path="/noticias" element={<Noticias />} />
      <Route path="/transparencia" element={<Transparencia />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/biblioteca" element={<Biblioteca />} />
      <Route path="/mapa" element={<Mapa />} />
      <Route path="/atendimento" element={<Atendimento />} />
      <Route path="/denuncias" element={<Denuncias />} />
      <Route path="/indicadores" element={<Indicadores />} />
      <Route path="/cursos" element={<Cursos />} />
      <Route path="/calendario" element={<Calendario />} />
      <Route path="/governos" element={<Governos />} />
      <Route path="/govers" element={<Govers />} />
    </Routes>
  )
}

export default App
