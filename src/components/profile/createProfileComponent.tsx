import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonBackButton, IonButtons, IonGrid, IonCol, IonRow, IonButton, useIonLoading } from '@ionic/react';
import { useHistory } from "react-router-dom";
import './createProfileComponent.css';
import * as PeopleService from '../../services/person.service';
import { Person } from '../../models/person';

interface ContainerProps {
  // setIsSignUp: any,
  // setToken: any,
  updatePeopleList: any
}

const CreateProfileComponent: React.FC<ContainerProps> = ({ updatePeopleList }) => {
  const [formState, setFormState] = useState<any>({
    first_name: '',
    last_name: '',
    avatarimg: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=mp',
    age: '',
    profession: '',
    about: ''
  });
  const [present, dismiss] = useIonLoading();

  const history = useHistory();

  const createPerson = async (person: Person) => {
    await PeopleService.addPerson(person);
  }

  const handleSubmit = (e:any) => {
    // setIsSignUp(false);
    // setToken('Token');
    present({
      message: 'Creating Profile...',
    })
    createPerson(formState).then((res) => {
      updatePeopleList(formState);
      history.goBack()
      dismiss();
    }).catch((err) => {
      console.log(err);
    });
    console.log(formState, 'person to create');
  }

  const handleChange = (e: any) => {
      const val = e.target.value;
      setFormState({
        ...formState,
        [e.target.name]: val
      });
    console.log(formState);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton />
          </IonButtons>
          <IonTitle>Create Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form>
        <IonList>
          <IonItemDivider>Name</IonItemDivider>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">First Name:</IonLabel>
                  <IonInput type="text" name="first_name" required onIonChange={handleChange}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Last Name:</IonLabel>
                  <IonInput type="text" name="last_name" required onIonChange={handleChange}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
            <IonItem>
              <IonLabel position="floating">Age:</IonLabel>
              <IonInput type="number" name="age" required onIonChange={handleChange}></IonInput>
            </IonItem>
          <IonItemDivider>Occupation</IonItemDivider>
          <IonItem>
            <IonLabel position="floating">Profession:</IonLabel>
            <IonInput type="text" name="profession" required onIonChange={handleChange}></IonInput>
          </IonItem>
          <IonItemDivider>About</IonItemDivider>
          <IonItem>
            <IonInput type="text" name="about" required placeholder="Enter at least one hobby" onIonChange={handleChange}></IonInput>
          </IonItem>
        </IonList> 
        <IonButton type="submit" expand="block" onClick={handleSubmit}>Submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateProfileComponent;