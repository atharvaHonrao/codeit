import bgimage from '../assets/background.jpg';
import logo from '../assets/codeit-logo-light.png';
import '../styles/homepage.module.css';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
    //     return <div style={{width: '100%', height: '100%', background: 'white', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
    //          <img style={{width: 250,  left: 36, top: 20, position: 'absolute'}} src={logo} />
    //     <img style={{width: '100%', height: '100vh'}} src={bgimage} />
    // </div>
    const navigate = useNavigate();

    return <div style={{ width: '100%', height: '100%', position: 'relative', background: 'white' }}>
        <img style={{ width: 470, height: '100vh', left: 0, top: 0, position: 'absolute', objectFit: 'cover' }} src={bgimage} />
        <div style={{ width: 822, height: 272, left: 309, top: 174, position: 'absolute' }} />
        <img style={{ width: 244, left: 90, top: 40, position: 'absolute' }} src={logo} />
        <div style={{ width: 774, height: 170, left: 567, top: 182, position: 'absolute', color: '#2B2B2B', fontSize: 72, fontFamily: 'K2D', fontWeight: '700', wordWrap: 'break-word' }}>Start Scripting Your Success Story with CodeIT</div>
        <div style={{ width: 235, height: 68, left: 567, top: 512, position: 'absolute', background: '#FFFFFF', borderRadius: 63, border: '1px black solid', padding: 'auto', cursor: 'pointer' }} onClick={()=> navigate('/signup')}><div style={{  margin: '15px',textAlign: 'center', color: '#2B2B2B', fontSize: 32, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }} >Sign Up</div></div>
        <div style={{ width: 235, height: 68, left: 886, top: 512, position: 'absolute', background: '#FFFFFF', borderRadius: 63, border: '1px black solid', cursor: 'pointer' }} onClick={() => navigate('/login')}><div style={{ margin: '15px', textAlign: 'center', color: '#2B2B2B', fontSize: 32, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Login</div></div>

    </div>
}