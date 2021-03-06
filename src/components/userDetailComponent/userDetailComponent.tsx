import { Person } from '../../models/person';
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
              <IonCol size="3">
                <IonAvatar>
                  <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=mp" />
                </IonAvatar>
              </IonCol>
              <IonCol size="9">
                {person.first_name} {person.last_name}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>
      </IonList>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          <IonCardTitle>Card Title</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          Keep close to Nature's heart... and break clear away, once in awhile,
          and climb a mountain or spend a week in the woods. Wash your spirit clean.
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default UserDetailComponent;
