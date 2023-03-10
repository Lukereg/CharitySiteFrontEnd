import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './NavBar.module.scss'
import DropdownList from "../DropdownList/DropdownList";
import UserPanel from "../UserPanel/UserPanel";
import jwtDecode from 'jwt-decode'
import {useCookies} from "react-cookie"
import MyDialog from '../Dialog/MyDialog';
import Logo from '../images/pageLogo.png'

const NavBar = () =>{
    const [opened, setShowOpened] = useState(false);
    const [jwtcookie,setJwtcookie,] = useCookies(["jwt"]);
    setJwtcookie({secure: true,sameSite:'none'})
    const token = jwtcookie.jwt
    let login = ""
    if (token !== undefined)
    {
        const decoded = jwtDecode(token)
        login = decoded.Roles
    }
        return(
            <nav className={styles.navbar}>
                 {jwtcookie.jwt !== undefined && login === 'Organizer,Volunteer' &&
                    <h1>Witaj, organizatorze! </h1>
                 }
                 {jwtcookie.jwt !== undefined && login === 'Volunteer' &&
                    <h1>Witaj, wolontariuszu! </h1>
                 }
                 {jwtcookie.jwt !== undefined && login.includes('Admin') &&
                    <h1>Witaj, administratorze! </h1>
                 }
                 {jwtcookie.jwt === undefined && 
                    <h1>Witaj, gościu! </h1>
                 }
                <DropdownList data1 = {'Zobacz akcje wolontariackie'} 
                    data2 = {'Zobacz zbiórki pieniężne'}
                        data3 = {'Zobacz wszystkie akcje'}
                            titlebutton = {'Przegląd akcji'}/>
                <ul className={styles.ul}>
                    { jwtcookie.jwt !== undefined &&     
                        <li className={styles.li}><Link to="/form" style={{textDecoration: 'none'}}>Utwórz akcję</Link></li>
                    } 
                    { jwtcookie.jwt === undefined &&
                           <li className={styles.li} onClick={() => setShowOpened(true)}><Link to="" style={{textDecoration: 'none'}}>Utwórz akcję</Link></li>
                    }   
                    <li className={styles.lis}><Link to="/" style={{textDecoration: 'none'}}>Strona główna</Link></li>
                     
                </ul>
                <img style={{marginTop:'17px',marginRight:'80px'}} src={Logo} alt="logo" width="300" height="200"/>
                <UserPanel/>
                <MyDialog open={opened} setShowOpened={setShowOpened}/>
            </nav>
        );
}

export default NavBar


