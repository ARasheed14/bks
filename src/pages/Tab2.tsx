import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import EventsListComponent from '../components/events/eventsListComponent';
import EventsDetailsComponent from '../components/events/eventsDetailComponent';
import './Tab2.css';
import { useState } from 'react';

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
        <IonHeader>
          <IonToolbar>
            <IonTitle>Events</IonTitle>
          </IonToolbar>
        </IonHeader>
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
