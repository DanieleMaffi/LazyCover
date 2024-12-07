import  express, { Request, Response } from 'express';
import path from 'path';

const API_KEY = process.env.API_KEY;
const LAT = process.env.LAT;
const LON = process.env.LON;

const app = express();
const PORT: number = 3000;
app.set('view engine', 'ejs');
app.set('views', path.join('./', 'views'));
app.use('/public', express.static('./public'));


interface ApiResponse {
    cod: number;
    message: number;
    cnt: number;
    list: Forecast[];
}


interface Forecast {
    dt: number;
    main: object;
    weather: Weather[];
    clouds: object;
    wind: object;
    visibility: number;
    pop: number;
    rain: object;
    sys: object;
    dt_text: string;
}


interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}


app.get('/', async (req: Request, res: Response) => {
    let hours: number = 0;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}`);
    const data: ApiResponse = await response.json();

    for (const forecast of data.list) {
        let is_rain: boolean = forecast.weather[0].main.toLowerCase().includes('rain');
        if (is_rain)
            break;
        else
            hours++;
    }

    // These is how long the weather will stay clear, in theory
    hours *= 3;

    const message: string = !hours ? "No Car Cover :)" : "Cmon Cover It!";
    res.render('index', { message, hours });
})

app.listen(PORT, () =>{
    console.log(`Server up and running at http://localhost:${PORT}`);
})