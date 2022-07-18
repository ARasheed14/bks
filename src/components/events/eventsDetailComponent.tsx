import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonImg, IonRow } from '@ionic/react';
import { pin, pinOutline, time } from 'ionicons/icons';
import './eventsDetailsComponent.css';

interface ContainerProps {
  selectedEvent: any
}

const EventsDetailsComponent: React.FC<ContainerProps> = ({ selectedEvent }) => {
  return (
    <>
      <IonCard>
        {selectedEvent.event_img ? (
            <IonImg src={selectedEvent.event_img}/>
          ) : (
            <IonImg src='https://source.unsplash.com/200x200/?nature'/>
          )  
        }
        <IonImg src={selectedEvent.event_img}/>
        <IonCardHeader>
          <IonCardTitle>{selectedEvent.title}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <IonGrid>
            <IonRow>{selectedEvent.description}</IonRow>
            <IonRow className='card-time-location'>
              <IonCol><IonIcon icon={time} className='icon-padding'/>Date: {selectedEvent.date}</IonCol>
              <IonCol><IonIcon icon={pin} className='icon-padding'/>Location: {selectedEvent.location}</IonCol>
            </IonRow>
            <IonRow className='fee-restrictions'>
              <IonCol>Entrance Fee: {selectedEvent.entrance_fee}</IonCol>
            </IonRow>
            <IonRow className='fee-restrictions'>
              <IonCol>Restrictions: {selectedEvent.restrictions}</IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default EventsDetailsComponent;