import { IonPage, IonHeader, IonToolbar, IonButton, IonContent, IonGrid, IonCol, IonRow, IonImg } from '@ionic/react';
import './landingComponent.css';

interface ContainerProps {
  setIsSignUp: any
}
const LandingComponent: React.FC<ContainerProps> = ({ setIsSignUp }) => {

  const updateSignInState = (e:any) => {
    e.preventDefault();
    setIsSignUp(true);
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='image-container'> 
          <IonImg src={require('../../assets/images/AppIcon-83.5x83.5@2x.png')}/>
        </div>
        <IonToolbar className='landingbuttons'>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton routerLink='/createprofilecomponent' className='pulse-button' expand="block" onClick={updateSignInState}>Sign Up</IonButton>
              </IonCol>
              <IonCol>
                <IonButton routerLink='/logincomponent' className='pulse-button' expand="block">Sign In</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonContent>
    </ IonPage>
  );
};

export default LandingComponent;