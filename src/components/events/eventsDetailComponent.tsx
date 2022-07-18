import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonImg, IonRow, IonText } from '@ionic/react';
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
        <IonCardHeader>
          <IonCardTitle>{selectedEvent.title}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <IonGrid>
            <IonRow className='description'>{selectedEvent.description}</IonRow>
            <IonRow className='card-time-location'>
              <IonCol style={{display: 'flex'}}>
                <IonIcon icon={time} className='icon-padding' style={{height: '20px', width: '20px'}} />
                <div>
                  {selectedEvent.date}
                </div>
              </IonCol>
              <IonCol style={{display: 'flex'}}>
                <IonIcon icon={pin} className='icon-padding' style={{height: '20px', width: '20px'}} />
                <IonText>
                  {selectedEvent.location}
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow className='fee-restrictions'>
              <IonCol>Entrance Fee:</IonCol>
              <IonCol>{selectedEvent.entrance_fee}</IonCol>
            </IonRow>
            <IonRow className='fee-restrictions'>
              <IonCol>Restrictions:</IonCol>
              <IonCol>{selectedEvent.restrictions}</IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default EventsDetailsComponent;