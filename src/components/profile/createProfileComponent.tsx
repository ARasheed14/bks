import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonBackButton, IonButtons, IonGrid, IonCol, IonRow, IonButton } from '@ionic/react';
import './createProfileComponent.css';

interface ContainerProps {
  setIsSignUp: any,
  setToken: any
}

const CreateProfileComponent: React.FC<ContainerProps> = ({ setIsSignUp, setToken }) => {
  const [formState, setFormState] = useState<any>({
    firstName: '',
    lastName: '',
    age: '',
    profession: '',
    about: ''
  });

  const handleSubmit = (e:any) => {
    setIsSignUp(false);
    setToken('Token');
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
                  <IonInput type="text" name="firstName" onIonChange={handleChange}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Last Name:</IonLabel>
                  <IonInput type="text" name="lastName" onIonChange={handleChange}></IonInput>
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