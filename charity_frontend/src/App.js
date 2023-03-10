import './App.css';
import React from 'react';
import {Route,Routes} from "react-router-dom"

import EventTypeChoose from './components/EventTypeChoose/EventTypeChoose';
import FormComponent from './components/FormComponent/FormComponent';
import UserAccount from './components/UserAccount/UserAccount';
import AdminPanel from './components/AdminPanel/AdminPanel';
import GetEvents from './components/GetEvents/GetEvents';
import GetEventsFundraising from './components/GetEvents/GetEventsFundraising';
import GetEventsVolunteering from './components/GetEvents/GetEventsVolunteering';
import SpecificEventView from './components/SpecificEventView/SpecificEventView';
import SuccessfullDonate from './components/SuccessfullDonate/SuccessfullDonate';
import VerificationView from './components/VerificationView/VerificationView';
import UserView from './components/UserView/UserView';
import UserDeactivatedView from './components/UserDeactivatedView/UserDeactivatedView';
import UserVolunteerView from './components/UserVolunteerView/UserVolunteerView';
import UserDeniedView from './components/UserDeniedView/UserDeniedView';
import EditEvent from './components/EditEvent/EditEvent';
import Signup from './components/SignUp/SignUp.jsx'
import Login from './components/Login/Login.jsx'
import MainPage from './components/MainPage/MainPage';

function App() {
  return (
    <Routes>
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="" exact element={<MainPage/>}/>
      <Route path="/eventTypeChoose" exact element={<EventTypeChoose/>}/>
      <Route path="/form" exact element={<FormComponent/>}/>
      <Route path="/userAccount" exact element={<UserAccount/>}/>
      <Route path="/adminPanel" exact element={<AdminPanel/>}/>
      <Route path="/getEvents" exact element={<GetEvents/>}/>
      <Route path="/getFundraising" exact element={<GetEventsFundraising/>}/>
      <Route path="/getVolunteering" exact element={<GetEventsVolunteering/>}/>
      <Route path="/event/:id" exact element={<SpecificEventView/>}/>
      <Route path="/successDonate" exact element={<SuccessfullDonate/>}/>
      <Route path="/verification/:id" exact element={<VerificationView/>}/>
      <Route path="/myEvent/:id" exact element={<UserView/>}/>
      <Route path="/deactivatedEvent/:id" exact element={<UserDeactivatedView/>}/>
      <Route path="/volunteerEvent/:id" exact element={<UserVolunteerView/>}/>
      <Route path="/deniedEvent/:id" exact element={<UserDeniedView/>}/>
      <Route path="/editEvent/:id" exact element={<EditEvent/>}/>
    </Routes>
  );
}

export default App;
