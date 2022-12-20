import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import styles from './EventFormDonation.module.scss'
import jwtDecode from 'jwt-decode'
import {useCookies} from "react-cookie"
import Footer from "../Footer/Footer.jsx"
import axios from 'axios';

const EventFormDonation = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fundTarget, setFundTarget] = useState("");
    const [volunteers, setVolunteers] = useState([]);
    const [money, setMoney] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [files, setFiles] = useState('');
    const [message, setMessage] = useState("");
    const [jwtcookie,,] = useCookies(["jwt"]);
    const navigate = useNavigate()
    const token = jwtcookie.jwt
    const decoded = jwtDecode(token)
    const id = decoded.Id
    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );
    const handleSubmit = async(e) => {
        e.preventDefault();
        const formdata = new FormData()
        formdata.append("isVolunteering",true)
        formdata.append("isFundraising",true)
        formdata.append("title",title)
        formdata.append("description",description)
        formdata.append("organizerId",id)
        formdata.append("imageCharityEvent",selectedFile,selectedFile.name)
        for (let i = 0; i < files.length; i++) {
            formdata.append("imagesCharityEvent", files[i])
        }
        formdata.append("fundTarget",fundTarget)
        formdata.append("amountOfMoneyToCollect",money)
        formdata.append("amountOfNeededVolunteers",volunteers)
        
        try{
            let res = await axios.post("http://localhost:5012/v1/CharityEvent",formdata,
            {headers:{'Content-Type': 'multipart/form-data',Authorization: `Bearer ${token}`}})
            if (res.status === 200) {
                setMessage("Dodano ogłoszenie!");
                await sleep(2000)
                navigate("/")
                console.log(res)
              } else {
                setMessage("Spróbuj jeszcze raz");
                
              }
            } catch (err) {
              console.log(err);
            }
    }
    return (
        <div>
        <div className={styles.main_container}>
        <div className={styles.form_footer}>    
        <div className = {styles.form_box}>
        <form onSubmit={handleSubmit}>
            <div className ={styles.field1}>
                <div><label className={styles.field1_label}> Tytuł akcji  </label></div>
                <textarea className={styles.input} placeholder="Podaj tytuł"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                />
            </div>

            <div className={styles.field2}>
            <div><label className={styles.field2_label}> Opis akcji </label> </div>
            <textarea className={styles.input2} placeholder="Podaj opis" 
                value={description}
                onChange={(e) => setDescription(e.target.value)} 
             />
            </div>

            <div className={styles.field3}>    
            <div><label className={styles.field3_label}> Cel zbiórki</label></div>
            <textarea className={styles.input3} placeholder="Podaj cel"
                value={fundTarget}
                onChange={(e) => setFundTarget(e.target.value)} 
             />
            </div>

            <div className={styles.field4}>    
            <div><label className={styles.field4_label}>Kwota do zebrania</label></div>
            <input type="number" min="1" onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {
                event.preventDefault();}}} 
                className={styles.input4} placeholder="Podaj kwotę"
                value={money}
                onChange={(e) => setMoney(e.target.value)} 
             />
            </div>

            <div className={styles.field4}>    
            <div><label className={styles.field4_label}>Ilość potrzebnych wolontariuszy</label></div>
            <input type="number" min="1" onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {
                event.preventDefault();}}} 
                className={styles.input4} placeholder="Podaj ilość"
                value={volunteers}
                onChange={(e) => setVolunteers(e.target.value)} 
             />
            </div>

            <div className={styles.field5}>    
            <div><label className={styles.field5_label}>Dodaj zdjęcie tytułowe do twojej akcji</label></div>
            <input className={styles.inputIm} type="file" 
                id="file" 
                onChange={(e) => setSelectedFile(e.target.files[0])}
                accept="image/*"
            />
            </div>

            <div className={styles.field5}>    
            <div><label className={styles.field5_label}>Dodaj zdjęcia do twojej akcji</label></div>
            <input className={styles.inputIm} type="file" multiple 
                id="file1" 
                onChange={(e) => setFiles(e.target.files)}
                accept="image/*"
            />
            </div>

            <button type = "submit" id= "submitBtn" className ={styles.sub_btn}> Dodaj Ogłoszenie</button>
            <div className={styles.message}>{message ? <p>{message}</p> : null}</div>
        </form>
        
    </div>
    </div>
    <Footer/>
    
</div>

</div>
)
}

export default EventFormDonation