# GameSort

A search engine for video games with different sorting algorithms. Created as part of an assignment for our data structures and algorithms course.

## Disclaimers

Because this project was created for our data structures and algorithms assignment course assignment, we will NOT be maintaining this. If you would like to make your own changes this project, consider creating a fork.
This project is licensed under the terms of the MIT license.

## Getting Started

Check to make sure you have Node.js and npm installed. You can do this by opening a terminal instance and entering the commands:
```
node -v
```
```
npm -v
```

To run the app, navigate into the GameSort directory and enter the commands:
```
npm install
```
```
npm run dev
```
You can then click the provided link to open the app in your browser.

## Providing Data

This repository does not provide any data for the program to use. The app will not load correctly if there is no data provided. To provide the data, create a file titled `data.json` in the `public/data` directory. The JSON object must adhere to the `GameInfo` interface specified in `src/interfaces/GameInfo.ts`

```ts
interface Game {
  name: string
  description?: string
  rating: number
  ratingCount?: number
  releaseDate?: string
  genres?: string
  platforms?: string
  tags?: string
  ageRatings?: string
  imageUrl?: string
  similarGames?: string
  url?: string
}

interface GameInfo {
  [key: string]: Game  // key is a string containing the numerical index of this game
}
```

