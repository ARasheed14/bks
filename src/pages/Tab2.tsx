import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import EventsListComponent from '../components/events/eventsListComponent';
import EventsDetailsComponent from '../components/events/eventsDetailComponent';
import './Tab2.css';
import { useState } from 'react';

const Tab2: React.FC = () => {
  const [isEventSelected, setIsEventSelected] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isEventSelected? 
          <EventsDetailsComponent />
         : 
          <EventsListComponent />
        }
        <EventsListComponent />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
