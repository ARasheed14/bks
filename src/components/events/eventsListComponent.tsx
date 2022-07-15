import { IonToolbar, IonSearchbar, IonItem, IonList, IonButton, IonCard, IonCardContent, IonIcon, IonLabel, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonImg, IonCol, IonRow } from '@ionic/react';
import { pin, time } from 'ionicons/icons';
import { AttendableEvent } from '../../models/attendableEvent';
import * as EventsService from '../../services/events.service';
import './eventsListComponent.css'
// const tcStringParse = require('tc-string-parse');
import tcStringParse from '../../services/tcCon.service';

interface ContainerProps {
  eventsList: []
  setIsEventSelected: any
  setCurrentSelectedEvent: any
}
const test = `
  let tcParse = ${tcStringParse};
  let fcT = 'CPb6LlgPb6LlgEsABBENCXCgAAAAAH_AACiQAAAQWYDyFSIgEKCYFDSASQoQAIsACAAAMBAFAADBgAAECQASVgAIEAEAAEQABAAABwAAAwAAAAAAAAAAAIAwAAACAEAAAAAAAAAQAAAAAAAAAAAAAAAAAAAIAABAAgACAABAACAAAwAABgAIAJAAAIAAAAAAAAAAAAAAAAAgAAQAAAAAACCIAAA.YAAAAGgAAAA';
  if (fcT){ console.log(JSON.stringify(tcParse(fcT))); }`;
const EventsListComponent: React.FC<ContainerProps> = ({ eventsList, setIsEventSelected, setCurrentSelectedEvent }) => {

  const noCon = tcStringParse('CPb6LlgPb6LlgEsABBENCXCgAAAAAH_AACiQAAAQWYDyFSIgEKCYFDSASQoQAIsACAAAMBAFAADBgAAECQASVgAIEAEAAEQABAAABwAAAwAAAAAAAAAAAIAwAAACAEAAAAAAAAAQAAAAAAAAAAAAAAAAAAAIAABAAgACAABAACAAAwAABgAIAJAAAIAAAAAAAAAAAAAAAAAgAAQAAAAAACCIAAA.YAAAAGgAAAA');
  const yesCon = tcStringParse('CPcHFwgPcHFwgEsABBENCXCoAP_AAH_AACiQILMB5CpEQCFBMCh9AJoUIAEWgBhgAGAgCgABg4ABCBIAJKwAECACAACIAAgAAA4AAAYAAAAAAAAAAAEAYAAABACEAAAAAAAAIAAAAAAAAAAAAAAAAAEAEAAAgAQABAAAgABEAAYAAAwAEAEgAAEAAAgAAAAAAAAAAAAAQAgIAAAAACBBEEFmA8hUiIBCgmBQ0gEkKEACLAAgAADAQBQAAwYAABAkAElYACBABAABEAAQAAAcAAAMAAAAAAAAAAACAMAAAAgBAAAAAAAAAEAAAAAAAAAAAAAAAAAAACAAAQAIAAgAAQAAgAAMAAAYACACQAACAAAAAAAAAAAAAAAAAIAAEAAAAAAAgiAA.fhAAAGgAAAA');

    const setSearchText = (e: string) => {
        throw new Error('Function not implemented.');
    }
    // console.log('No Con', noCon);
    console.log('Yes Con', yesCon);
    if(Object.keys(yesCon.publisher.consents).length ) console.log(yesCon.publisher.consents);
  return (
    <>
      <IonToolbar>
        <IonSearchbar onIonChange={(e) => setSearchText(e.detail.value!)} placeholder='Enter your search'></IonSearchbar>
      </IonToolbar>
      <IonList>
        {eventsList.map((attendableEvent: AttendableEvent, key: any) => 
          <IonCard key={key}>
            {attendableEvent.event_img ? (
              <IonImg onClick={() => { setIsEventSelected(true); setCurrentSelectedEvent(attendableEvent) }} src={attendableEvent.event_img}/>
            ) : (
              <IonImg onClick={() => { setIsEventSelected(true); setCurrentSelectedEvent(attendableEvent)}} src='https://source.unsplash.com/200x200/?nature'/>
            )  
            }
            <IonCardHeader>
              <IonCardTitle className='title'>{attendableEvent.title}</IonCardTitle>
            </IonCardHeader>
            <div className='card-content-container'>
              <IonCardContent>
                <IonGrid>
                  <IonRow className='card-time-location'>
                    <IonCol><IonIcon icon={time} className='icon-padding'/>{attendableEvent.date}</IonCol>
                    <IonCol><IonIcon icon={pin} className='icon-padding'/>{attendableEvent.location}</IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </div>
          </IonCard>
          )
        }
      </IonList>
    </>
  );
};

export default EventsListComponent;
