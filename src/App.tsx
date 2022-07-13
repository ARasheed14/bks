import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendar, ellipse, home, mic, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import UserDetailComponent from './components/user/userDetailComponent/userDetailComponent';
import CreateProfileComponent from './components/profile/createProfileComponent';
import LoginComponent from './components/login/loginComponent';
import LandingComponent from './components/landing/landingComponent';
import { Person } from './models/person';
import * as PeopleService from './services/person.service';
import * as EventsService from './services/events.service';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useEffect, useState } from 'react';

setupIonicReact();

const App: React.FC = () => {
  let list: any = [];
  const [token, setToken] = useState('');
  // const [isSignUp, setIsSignUp] = useState(false);
  const [peopleList, setPeopleList] = useState<any>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [eventsList, setEventsList] = useState<any>([]);

  // const updateSignUpFlag = (isSignUp: boolean) => {
  //   setIsSignUp(isSignUp);

  // const loginCheck = () => {
  //   console.log(isLoggedIn);
  // }
  const updateList = (person: Person) => {
    setPeopleList([
      ...peopleList, person
    ])
  }
  // console.log(token, isSignUp, 'here')
  // if(token === '' && isSignUp === false) {
  //   return ( <LandingComponent  setIsSignUp={updateSignUpFlag} /> )
  // }  else if (isSignUp === true) {
  //   return ( <CreateProfileComponent  setToken={setToken} setIsSignUp={updateSignUpFlag} /> )
  // } 
  // else {

    const getPeople = async () => {
      const pep = await PeopleService.getPeople();
      const list:any = [];
      pep.forEach((person: any) => {
        list.push(person.requestBody);
      });
      setPeopleList(list);
    }

    const getEvents = async () => {
      const list: any = [];
      await EventsService.getEvents().then((res) => {
        res.forEach((event: any) => {
          list.push(event.requestBody);
        });
      })
      setEventsList(list);
    }

    useEffect(() => {
      getPeople();
      getEvents();
    }, []);

    return (
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/tab1" component={Tab1}>
                <Tab1 peopleList={peopleList} />
              </Route>
              <Route exact path="/tab2">
                <Tab2 eventsList={eventsList} />
              </Route>
              <Route path="/tab3">
                <Tab3 />
              </Route>
              <Route exact path="/">
                <Redirect to="/tab1" />
              </Route>
              <Route path="/userdetailcomponent/users/:id" component={UserDetailComponent} />
              <Route path="/createprofilecomponent" render={() => <CreateProfileComponent updatePeopleList={updateList}/>} />
              <Route path="/landingcomponent" component={LandingComponent} />
              <Route path="/logincomponent" component={LoginComponent} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon icon={calendar} />
                <IonLabel>Events</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon icon={mic} />
                <IonLabel>Live Sessions</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    )
  // }
  
};

export default App;
