import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonActionSheet } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import * as PeopleService from '../services/person.service';
import UserListComponent from '../components/userListComponent/userListComponent';
import UserDetailComponent from '../components/userDetailComponent/userDetailComponent';
import CreateProfileComponent from '../components/createProfileComponent/createProfileComponent';
import './Tab1.css';
import { Person } from '../models/person';
import { useState } from 'react';

interface ContainerProps {
  list: Person[]
}

const Tab1: React.FC<ContainerProps> = ({ list }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [currentSelectedPerson, setCurrentSelectedPerson] = useState<any>('');
  // PeopleService.addPerson(test);
  // PeopleService.getPeople();
  return (
    <IonPage>
      <IonHeader>
        {isSelected? 
          <IonToolbar>
            <IonButtons>
              <IonButton onClick={() => {setIsSelected(false)}}>
                Back
              </IonButton>
            </IonButtons>
          </IonToolbar>
        : 
        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton routerLink='/createprofilecomponent'>
              <IonIcon slot="start" color="medium" icon={personCircle} />
            </IonButton> 
          </IonButtons>
          <IonTitle size="large">Home</IonTitle>
        </IonToolbar>
        }
        </IonHeader>
      <IonContent fullscreen>
        {isSelected? 
        <UserDetailComponent person={currentSelectedPerson} />
        :  
        <UserListComponent peopleList={list} setCurrentSelectedPerson={setCurrentSelectedPerson} setIsSelected={setIsSelected}/>
        }
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
