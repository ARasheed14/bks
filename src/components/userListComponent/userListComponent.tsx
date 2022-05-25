import { Person } from '../../models/person';
import { IonList, IonItem, IonGrid, IonRow, IonCol, IonSearchbar, IonToolbar, IonAvatar } from '@ionic/react';
import './userListComponent.css';
import { Link } from 'react-router-dom';

interface ContainerProps {
  peopleList: Person[]
  setCurrentSelectedPerson: any,
  setIsSelected: any
}

const UserListComponent: React.FC<ContainerProps> = ({ peopleList, setCurrentSelectedPerson, setIsSelected }) => {
  return (
    <>
      <IonToolbar>
        <IonSearchbar placeholder='Enter your search'></IonSearchbar>
      </IonToolbar>
      <IonList> 
        {peopleList.map((person, key) => 
        <IonItem key={key} onClick={() => {setCurrentSelectedPerson(person); setIsSelected(true)}}>
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
        )}
      </IonList>
    </>
  );
};

export default UserListComponent;
