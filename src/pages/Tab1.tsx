import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import UserListComponent from '../components/user/userListComponent/userListComponent';
import UserDetailComponent from '../components/user/userDetailComponent/userDetailComponent';
import './Tab1.css';
import { Person } from '../models/person';
import { useState } from 'react';

interface ContainerProps {
  list: Person[]
}

const Tab1: React.FC<ContainerProps> = ({ list }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [currentSelectedPerson, setCurrentSelectedPerson] = useState<any>('');

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
              <IonIcon size="large" slot="start" color="medium" icon={personCircle} />
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
