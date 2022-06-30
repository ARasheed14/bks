import { IonToolbar, IonSearchbar, IonItem, IonList, IonButton, IonCard, IonCardContent, IonIcon, IonLabel, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonImg, IonCol, IonRow } from '@ionic/react';
import { pin, walk, warning, wifi, wine } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { AttendableEvent } from '../../models/attendableEvent';
import * as EventsService from '../../services/events.service';
import './eventsListComponent.css'

interface ContainerProps {
  
}

const EventsListComponent: React.FC<ContainerProps> = () => {
  const [eventsList, setEventsList] = useState<any>([]);

  const updateEventsList = (event: AttendableEvent) => {
    setEventsList([
      ...eventsList, event
    ])
  }

    useEffect(() => {
      const getEvents = async () => {
        const list: any = [];
        await EventsService.getEvents().then((res) => {
          res.forEach((event: any) => {
            list.push(event.requestBody);
          });
        })
        setEventsList(list);
      }
      getEvents();
    }, []);
    const setSearchText = (e: string) => {
        throw new Error('Function not implemented.');
    }

  return (
    <>
      <IonToolbar>
        <IonSearchbar onIonChange={(e) => setSearchText(e.detail.value!)} placeholder='Enter your search'></IonSearchbar>
      </IonToolbar>
      <IonList>
        {eventsList.map((attendableEvent: AttendableEvent, key: any) => 
          <IonCard key={key}>
            {attendableEvent.event_img ? (
              <IonImg src={attendableEvent.event_img}/>
            ) : (
              <IonImg src='https://source.unsplash.com/200x200/?nature'/>
            )  
            }
            <IonCardHeader>
              <IonCardTitle>{attendableEvent.title}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
            {attendableEvent.description}
              <IonGrid>
                <IonRow>
                  <IonCol>{attendableEvent.date}</IonCol>
                  <IonCol>{attendableEvent.location}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol className="ion-align-self-end">Price: {attendableEvent.entrance_fee}</IonCol>
                  <IonCol className="ion-align-self-end">by: {attendableEvent.host}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol className="ion-align-self-end">{attendableEvent.restrictions}</IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
          )
        }
      </IonList>
    </>
  );
};

export default EventsListComponent;
