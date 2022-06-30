import { Person } from '../../../models/person';
import { IonList, IonItem, IonGrid, IonRow, IonCol, IonAvatar, IonCardHeader, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './userDetailComponent.css';

interface ContainerProps {
  person: Person
}

const UserDetailComponent: React.FC<ContainerProps> = ({ person }) => {
  return (
    <>
      <IonList>
        <IonItem>
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonCol className='ion-justify-content-center'>
                <IonAvatar style={{ margin: 'auto', height: '120px', width: '120px' }}>
                  <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=mp" />
                </IonAvatar>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>
      </IonList>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{person.first_name} {person.last_name}</IonCardTitle>
          <IonCardSubtitle>
            Curreent Title: <br />
            {person.profession}
          </IonCardSubtitle>
          <IonCardSubtitle>
            About:
          </IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          {person.about}
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default UserDetailComponent;
