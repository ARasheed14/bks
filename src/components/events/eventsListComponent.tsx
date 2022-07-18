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

const EventsListComponent: React.FC<ContainerProps> = ({ eventsList, setIsEventSelected, setCurrentSelectedEvent }) => {

  const noCon = tcStringParse('CPb6LlgPb6LlgEsABBENCXCgAAAAAH_AACiQAAAQWYDyFSIgEKCYFDSASQoQAIsACAAAMBAFAADBgAAECQASVgAIEAEAAEQABAAABwAAAwAAAAAAAAAAAIAwAAACAEAAAAAAAAAQAAAAAAAAAAAAAAAAAAAIAABAAgACAABAACAAAwAABgAIAJAAAIAAAAAAAAAAAAAAAAAgAAQAAAAAACCIAAA.YAAAAGgAAAA');
  const yesCon = tcStringParse('CPcHFwgPcHFwgEsABBENCXCoAP_AAH_AACiQILMB5CpEQCFBMCh9AJoUIAEWgBhgAGAgCgABg4ABCBIAJKwAECACAACIAAgAAA4AAAYAAAAAAAAAAAEAYAAABACEAAAAAAAAIAAAAAAAAAAAAAAAAAEAEAAAgAQABAAAgABEAAYAAAwAEAEgAAEAAAgAAAAAAAAAAAAAQAgIAAAAACBBEEFmA8hUiIBCgmBQ0gEkKEACLAAgAADAQBQAAwYAABAkAElYACBABAABEAAQAAAcAAAMAAAAAAAAAAACAMAAAAgBAAAAAAAAAEAAAAAAAAAAAAAAAAAAACAAAQAIAAgAAQAAgAAMAAAYACACQAACAAAAAAAAAAAAAAAAAIAAEAAAAAAAgiAA.fhAAAGgAAAA');

    const setSearchText = (e: string) => {
        throw new Error('Function not implemented.');
    }

    const getCookie = (cname: any) => {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    // console.log('No Con', noCon);
    // console.log('Yes Con', yesCon);
    if(Object.keys(yesCon.publisher.consents).length ) {
      let t = getCookie('wp-settings-1');
      console.log(t);
    }
  return (
    <>
      <IonToolbar>
        <IonSearchbar onIonChange={(e) => setSearchText(e.detail.value!)} placeholder='Enter your search'></IonSearchbar>
      </IonToolbar>
      <IonList>
        {eventsList.map((attendableEvent: AttendableEvent, key: any) => 
          <IonCard key={key} onClick={() => { setIsEventSelected(true); setCurrentSelectedEvent(attendableEvent) }} className='card-margin'>
            {attendableEvent.event_img ? (
              <IonImg src={attendableEvent.event_img}/>
            ) : (
              <IonImg src='https://source.unsplash.com/200x200/?nature'/>
            )  
            }
            <IonCardHeader>
              <IonCardTitle className='title'>{attendableEvent.title}</IonCardTitle>
            </IonCardHeader>
            <div className='card-content-container'>
              <IonCardContent className='card-border'>
                <IonGrid>
                  <IonRow className='card-time-location'>
                    <IonCol className='card-info'>
                      <IonIcon icon={time} className='card-icon'/>
                      <div>
                        {attendableEvent.date}
                      </div>
                    </IonCol>
                    <IonCol className='left-border card-info'>
                      <IonIcon icon={pin} className='card-icon'/>
                      <div>
                        {attendableEvent.location}
                      </div>
                    </IonCol>
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
