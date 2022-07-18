import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import EventsListComponent from '../components/events/eventsListComponent';
import EventsDetailsComponent from '../components/events/eventsDetailComponent';
import './Tab2.css';
import { useState } from 'react';
import { addOutline, cog, personCircle, starOutline } from 'ionicons/icons';

interface ContainerProps {
  eventsList: []
}
const Tab2: React.FC<ContainerProps> = ({ eventsList }) => {
  const [isEventSelected, setIsEventSelected] = useState(false);
  const [selectedEvent, setCurrentSelectedEvent] = useState<any>('');
  return (
    <IonPage>
      {isEventSelected ?
        <IonToolbar>
          <IonButtons>
            <IonButton onClick={() => { setIsEventSelected(false) }}>
              Back
            </IonButton>
          </IonButtons>
        </IonToolbar>
        :
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon slot="icon-only" size="large" color="medium" icon={starOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="secondary">
            <IonButton routerLink='/createprofilecomponent'>
              <IonIcon slot="icon-only" size="large" color="medium" icon={addOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle className='header-title'>Events</IonTitle>
        </IonToolbar>
      }
      <IonContent fullscreen>
        {isEventSelected ?
          <EventsDetailsComponent selectedEvent={selectedEvent} />
          :
          <EventsListComponent eventsList={eventsList} setCurrentSelectedEvent={setCurrentSelectedEvent} setIsEventSelected={setIsEventSelected} />
        }
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
