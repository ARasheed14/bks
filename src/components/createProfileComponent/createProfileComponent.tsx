import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonBackButton, IonButtons, IonGrid, IonCol, IonRow, IonButton } from '@ionic/react';

const CreateProfileComponent: React.FC = () => {

  const [text, setText] = useState<string>();
  const [number, setNumber] = useState<number>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Create Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonItemDivider>Name</IonItemDivider>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">First Name:</IonLabel>
                  <IonInput value={text}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Last Name:</IonLabel>
                  <IonInput value={text}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
            <IonItem>
              <IonLabel position="floating">Age:</IonLabel>
              <IonInput type="number" value={number}></IonInput>
            </IonItem>
          <IonItemDivider>Occupation</IonItemDivider>
          <IonItem>
            <IonLabel position="floating">Profession:</IonLabel>
            <IonInput value={text}></IonInput>
          </IonItem>
          <IonItemDivider>Hobbies</IonItemDivider>
          <IonItem>
            <IonInput value={text} placeholder="Enter at least one hobby" onIonChange={e => setText(e.detail.value!)}></IonInput>
          </IonItem>
        </IonList>
        <IonButton expand="block">Submit</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CreateProfileComponent;