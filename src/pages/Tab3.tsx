import { IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonList, IonPage, IonRow, IonTitle, IonToolbar, IonRange, IonIcon, IonSearchbar } from '@ionic/react';
import { play, playOutline, snowOutline, sunnyOutline } from 'ionicons/icons';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='header-title'>Sessions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonToolbar>
          <IonSearchbar onIonChange={(e) => setSearchText(e.detail.value!)} placeholder='Enter your search'></IonSearchbar>
        </IonToolbar>
        <IonList>
          <IonItem>
            <IonGrid>
              <IonRow style={{alignItems: 'center', textAlign: 'center'}}>
                <IonCol size='3'>
                  <IonImg style={{ height: '60px', width: '60px' }} src='https://source.unsplash.com/200x200/?microphone' />
                </IonCol>
                <IonCol>
                  <IonRow style={{paddingLeft: '14px'}}>
                    <IonRange pin={true} pinFormatter={(value: number) => `${value}%`} style={{padding: '0px'}}/>
                  </IonRow>
                  <IonRow>
                    <IonCol size='2' style={{textAlign: 'left'}}>
                      <IonIcon icon={play}/>
                    </IonCol>
                    <IonCol style={{textAlign: 'left'}}>
                      <span style={{whiteSpace: 'nowrap'}}>Astrophysics Lecture</span>
                    </IonCol>
                  </IonRow>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;