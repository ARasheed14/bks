import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/react';
import { pinOutline } from 'ionicons/icons';
import './eventsListComponent.css';

interface ContainerProps {
  selectedEvent: any
}

const EventsDetailsComponent: React.FC<ContainerProps> = ({ selectedEvent }) => {
  console.log(selectedEvent, 'current event');
  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{selectedEvent.title}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <IonIcon icon={pinOutline}></IonIcon> {selectedEvent.location}
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default EventsDetailsComponent;