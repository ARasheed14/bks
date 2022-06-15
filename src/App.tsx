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
import { useState } from 'react';

setupIonicReact();

const pList: Person[] = [
  { 
    _id: 2,
    first_name: 'Manny',
    avatarimg: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=mp',
    last_name: 'Doe',
    age: '20',
    about: 'IT Director for 20 years.',
    profession: 'IT Director'
  },
  { 
    _id: 2,
    first_name: 'Ali',
    avatarimg: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=mp',
    last_name: 'Doe',
    age: '20',
    about: 'I\'m a designer',
    profession: 'Graphic Designer'
  },
  { 
    _id: 2,
    first_name: 'Will',
    avatarimg: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=mp',
    last_name: 'Doe',
    age: '20',
    about: 'I\'m a coder',
    profession: 'Software Engineer'
  }
];

const App: React.FC = () => {
  const [token, setToken] = useState('');
  // const [isSignUp, setIsSignUp] = useState(false);
  const [peopleList, setPeopleList] = useState(pList);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const updateSignUpFlag = (isSignUp: boolean) => {
  //   setIsSignUp(isSignUp);
  // };
  const loginCheck = () => {
    console.log(isLoggedIn);
  }
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
    return (
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/tab1">
                <Tab1 list={peopleList} />
              </Route>
              <Route exact path="/tab2">
                <Tab2 />
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
