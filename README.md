# LazyCover

This is an annoyingly basic web app to determine whether I need to cover my car, so I don't have to look out the window.

## How to run
- Compile the main typescript file using `npx tsc`.
- Set these three environment variables:
  - **API_KEY**: This is the API key you need to get from [this site](https://openweathermap.org/api).
  - **LAT**: The *latitude* of the location you want to track.
  - **LON**: The *longitude* of the location you want to track.
- Start serving the app running `node dist/telo.js`.
