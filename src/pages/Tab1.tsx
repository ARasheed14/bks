import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { cog, cogOutline, personCircle } from 'ionicons/icons';
import UserListComponent from '../components/user/userListComponent/userListComponent';
import UserDetailComponent from '../components/user/userDetailComponent/userDetailComponent';
import './Tab1.css';
import { Person } from '../models/person';
import { useState } from 'react';

interface ContainerProps {
  peopleList: Person[]
}

const Tab1: React.FC<ContainerProps> = ({ peopleList }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [currentSelectedPerson, setCurrentSelectedPerson] = useState<any>('');

  return (
    <IonPage>
      <IonHeader>
        {isSelected ?
          <IonToolbar>
            <IonButtons>
              <IonButton onClick={() => { setIsSelected(false) }}>
                Back
              </IonButton>
            </IonButtons>
          </IonToolbar>
          :
          // <IonToolbar>
          //   <IonButtons slot="start">
          //     <IonButton>
          //       <IonIcon className='header-icon' slot="icon-only" color="medium" icon={cog}/>
          //     </IonButton>
          //   </IonButtons>
          //   <IonButtons slot="end">
          //     <IonButton routerLink='/createprofilecomponent'>
          //       <IonIcon className='header-icon' slot="icon-only" color="medium" icon={personCircle} />
          //     </IonButton>
          //   </IonButtons>
          //   <IonTitle size="large">Home</IonTitle>
          // </IonToolbar>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton>
                <IonIcon slot="icon-only" size="large" color="medium" icon={cogOutline} />
              </IonButton>
            </IonButtons>
            <IonButtons slot="secondary">
              <IonButton routerLink='/createprofilecomponent'>
                <IonIcon slot="icon-only" size="large" color="medium" icon={personCircle} />
              </IonButton>
            </IonButtons>
            <IonTitle className='header-title'>Home</IonTitle>
          </IonToolbar>
        }
      </IonHeader>
      <IonContent fullscreen>
        {isSelected ?
          <UserDetailComponent person={currentSelectedPerson} />
          :
          <UserListComponent peopleList={peopleList} setCurrentSelectedPerson={setCurrentSelectedPerson} setIsSelected={setIsSelected} />
        }
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
