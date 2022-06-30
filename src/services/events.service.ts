import { AttendableEvent } from "../models/attendableEvent";

export const getEvents = async () => {
    try {
        const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/application-0-kkkdw/endpoint/bks/events',
        {
            method: 'GET',
        });
        let res = await response.json();
        return res;
    }
    catch(error){
        console.log('Somethings wrong', error);
    }
}

export const addEvent = async (event: AttendableEvent) => {
  try {
      const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/application-0-kkkdw/endpoint/bks/events',
      {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(event)
      });
      const res = await response;
      console.log(res);
      return res;
  }
  catch(error){
      console.log('Somethings wrong', error);
  }
}