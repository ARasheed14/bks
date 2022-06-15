import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonBackButton, IonButtons, IonGrid, IonCol, IonRow, IonButton, useIonLoading } from '@ionic/react';
import { useHistory } from "react-router-dom";
import './createProfileComponent.css';

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

  const handleSubmit = (e:any) => {
    // setIsSignUp(false);
    // setToken('Token');
    present({
      message: 'Creating Profile...',
      duration: 3000
    })
    updatePeopleList(formState);
    setTimeout(() => {
      history.goBack()
    }, 3000)
    console.log(formState);
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

      <IonContent className='test'>
        <form>
        <IonList>
          <IonItemDivider>Name</IonItemDivider>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">First Name:</IonLabel>
                  <IonInput type="text" name="first_name" onIonChange={handleChange}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Last Name:</IonLabel>
                  <IonInput type="text" name="last_name" onIonChange={handleChange}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
            <IonItem>
              <IonLabel position="floating">Age:</IonLabel>
              <IonInput type="number" name="age" onIonChange={handleChange}></IonInput>
            </IonItem>
          <IonItemDivider>Occupation</IonItemDivider>
          <IonItem>
            <IonLabel position="floating">Profession:</IonLabel>
            <IonInput type="text" name="profession" onIonChange={handleChange}></IonInput>
          </IonItem>
          <IonItemDivider>About</IonItemDivider>
          <IonItem>
            <IonInput type="text" name="about" placeholder="Enter at least one hobby" onIonChange={handleChange}></IonInput>
          </IonItem>
        </IonList> 
        <IonButton expand="block" onClick={handleSubmit}>Submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateProfileComponent;