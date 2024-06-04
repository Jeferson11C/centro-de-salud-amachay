import http from "../../shared/services/http.js";

export class PersonasApiService {
    getAll() {
        return http.get('/personas').then(response => {
            return response.data.map(persona => {
                if (persona.id === 1) {
                    persona.googleMapsUrl = 'https://www.google.com/maps/place/Centro+de+Salud+Mental+Comunitario+Amachay+(Cuidar)/@-11.9269347,-77.0596924,17z/data=!3m1!4b1!4m6!3m5!1s0x9105d1669fbf6a0f:0xc2b791d4c0b800d2!8m2!3d-11.92694!4d-77.0548268!16s%2Fg%2F11vlrj_cwv?hl=es&entry=ttuhttps://www.google.com/maps/place/Centro+de+Salud+Mental+Comunitario+Amachay+(Cuidar)/@-11.9269347,-77.0596924,17z/data=!3m1!4b1!4m6!3m5!1s0x9105d1669fbf6a0f:0xc2b791d4c0b800d2!8m2!3d-11.92694!4d-77.0548268!16s%2Fg%2F11vlrj_cwv?hl=es&entry=ttu';
                }
                return persona;
            });
        });
    }

    create(persona) {
        return http.post('/personas', persona);
    }
}