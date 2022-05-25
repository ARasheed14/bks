import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import * as PeopleService from '../services/person.service';
import UserListComponent from '../components/userListComponent/userListComponent';
import UserDetailComponent from '../components/userDetailComponent/userDetailComponent';
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
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>People Search</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen>
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
          <IonTitle size="large">Home</IonTitle>
        </IonToolbar>
        }
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
