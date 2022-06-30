import { Person } from "../models/person";

export async function getPeople() {
    try {
        const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/application-0-kkkdw/endpoint/bks',
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

export async function addPerson(person: Person) {
    try {
        const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/application-0-kkkdw/endpoint/bks',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(person)
        });
        const res = await response;
        return res;
    }
    catch(error){
        console.log('Somethings wrong', error);
    }
}