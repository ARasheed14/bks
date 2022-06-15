import { Person } from '../../../models/person';
import { IonList, IonItem, IonGrid, IonRow, IonCol, IonSearchbar, IonToolbar, IonAvatar } from '@ionic/react';
import './userListComponent.css';
import { useState } from 'react';

interface ContainerProps {
  peopleList: Person[]
  setCurrentSelectedPerson: any,
  setIsSelected: any
}

const UserListComponent: React.FC<ContainerProps> = ({ peopleList, setCurrentSelectedPerson, setIsSelected }) => {
  const [searchText, setSearchText] = useState('');
  return (
    <>
      <IonToolbar>
        <IonSearchbar onIonChange={(e) => setSearchText(e.detail.value!)} placeholder='Enter your search'></IonSearchbar>
      </IonToolbar>
      <IonList> 
        {peopleList.filter((val) => {
          //Todo: Refactor this.
          if(searchText == '') {
            return val
          } else if (val.first_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
            return val
          }
        }).map((person, key) => 
        <IonItem key={key} onClick={() => {setCurrentSelectedPerson(person); setIsSelected(true)}}>
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonCol size="3">
              <IonAvatar>
                <img src={person.avatarimg} />
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
