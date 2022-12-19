import React,{useState,useEffect} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import styles from "./UserVolunteerView.module.scss"
import { useParams } from "react-router-dom";
import EventCarousel from "../EventCarousel/EventCarousel";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode'
import DonationDialog from "../ButtonPopUps/DonationDialog";
import GetDonationsById from "../GetDonationsById/GetDonationsById";
import GetVolunteersById from "../GetVolunteersById/GetVolunteersById";
import { Button } from "@mui/material";

const UserVolunteerView = () => {
    const params = useParams();
    const id = params.id
    const [jwtcookie,,] = useCookies(["jwt"]);
    const token = jwtcookie.jwt
    const decoded = jwtDecode(token)
    const userId = decoded.Id
    const [eventData, setEventData] = useState([]);
    const [photos,setPhotos]= useState([]);
    const navigate = useNavigate();
    const goBack = () =>{
      navigate(-2)
    }
    const data = {
        idUser: userId,
        idVolunteering: eventData.volunteeringId,
    }
    const revertVolunteer = async () =>{
        axios({method:'delete',url:"http://localhost:5012/v1/Volunteer",data,headers:{Authorization: `Bearer ${token}`}})
        .then(navigate(-2))
    }

    useEffect(() => {
        const fetchEvents = async () => {
            axios.get("http://localhost:5012/v1/Search/"+id,{headers:{Authorization: `Bearer ${token}`}})
            .then(response => {
             setEventData(response.data)
          });
        }
        const fetchPhotos = async () => {
            axios.get("http://localhost:5012/v1/CharityEvent/images/"+id,{headers:{Authorization: `Bearer ${token}`}})
            .then(response => {
             setPhotos(response.data)
          });
        }
     fetchEvents()
     fetchPhotos()
    },[]);
    console.log(eventData)
    return(
        <div>
            {eventData.length !== 0 && 
             <div className={styles.display}>
                <CloseIcon className={styles.close} onClick={goBack}/>
                <h1 className={styles.title}>{eventData.title}</h1>
                <h2 className={styles.description}>{eventData.description}</h2>
                <div>
                    {
                        (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering === null) ?
                            <div>
                                <div className={styles.fundT}>Cel zbiórki: {eventData.charityEventFundraising.fundTarget}</div>
                                <div className={styles.money}>{"Obecnie zebrano: "}
                                    {eventData.charityEventFundraising.amountOfAlreadyCollectedMoney}/
                                        {eventData.charityEventFundraising.amountOfMoneyToCollect}
                                        <div className={styles.button}><DonationDialog props={eventData.charityEventFundraising.id} /></div>
                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                                <div style={{marginBottom:'20px',marginTop:'20px'}}><GetDonationsById id={eventData.fundraisingId}/></div>
                            </div>:
                        (eventData.charityEventVolunteering !== null && eventData.charityEventFundraising === null) ?
                            <div>
                                <div className={styles.money}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {" potrzebnych wolontariuszy"}
                                    <div className={styles.button}><Button variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}} color="error" onClick={revertVolunteer}>Wycofaj się z akcji</Button></div>
                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                                <div style={{marginBottom:'20px',marginTop:'20px'}}><GetVolunteersById id={eventData.volunteeringId}/></div>
                            </div>:
                        (eventData.charityEventVolunteering !== null && eventData.charityEventFundraising !== null && eventData.charityEventVolunteering.isActive === 1 && eventData.charityEventFundraising.isActive === 0) ?
                            <div>
                                <div className={styles.money}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {" potrzebnych wolontariuszy"}
                                    <div className={styles.button}><Button variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}} color="error" onClick={revertVolunteer}>Wycofaj się z akcji</Button></div>
                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                                <div style={{marginBottom:'20px',marginTop:'20px'}}><GetVolunteersById id={eventData.volunteeringId}/></div>
                            </div>:
                        (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null && eventData.charityEventVolunteering.isActive === 0 && eventData.charityEventFundraising.isActive === 1 ) ?
                            <div>
                                <div className={styles.fundT}>Cel zbiórki: {eventData.charityEventFundraising.fundTarget}</div>
                                <div className={styles.money}>{"Obecnie zebrano: "}
                                    {eventData.charityEventFundraising.amountOfAlreadyCollectedMoney}/
                                        {eventData.charityEventFundraising.amountOfMoneyToCollect}
                                        <div className={styles.button}><DonationDialog props={eventData.charityEventFundraising.id} /></div>
                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                                <div style={{marginBottom:'20px',marginTop:'20px'}}><GetDonationsById id={eventData.fundraisingId}/></div>
                            </div>:
                            <div>
                                <div className={styles.fundT}>Cel zbiórki: {eventData.charityEventFundraising.fundTarget}</div>
                                <div className={styles.money}>{"Obecnie zebrano: "}
                                    {eventData.charityEventFundraising.amountOfAlreadyCollectedMoney}/
                                        {eventData.charityEventFundraising.amountOfMoneyToCollect} zł
                                        <div className={styles.button}><DonationDialog props={eventData.charityEventFundraising.id} /></div>
                                </div>
                                <div className={styles.money}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {" wolontariuszy"}
                                            <div className={styles.button}><Button variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}} color="error" onClick={revertVolunteer}>Wycofaj się z akcji</Button></div>
                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                                <div className={styles.stats}><div style={{marginBottom:'20px',marginTop:'20px'}}><GetDonationsById id={eventData.fundraisingId}/></div>
                                <div style={{marginBottom:'20px',marginTop:'20px'}}><GetVolunteersById id={eventData.volunteeringId}/></div></div>
                            </div>
                    }    
                </div>
             </div>
            }
        </div>
    );
}   

export default UserVolunteerView