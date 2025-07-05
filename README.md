# Helper Web App

Helper is a full-stack web application that leverages AI and OCR to answer user questions. Users can type questions or upload images containing text, and receive intelligent answers powered by an AI backend.

## Features

- **Ask Questions:** Type any question and get an AI-generated answer.
- **OCR Upload:** Upload an image with text (e.g., a photo of a textbook page), extract the text using OCR, and get an answer to the extracted question.
- **History:** All questions and answers are stored in a MongoDB database.
- **Modern UI:** Built with React and Tailwind CSS for a responsive, user-friendly experience.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Tesseract.js (for OCR)
- **Backend:** Node.js, Express, Mongoose, dotenv, CORS
- **Database:** MongoDB
- **AI:** Custom handler (e.g., Llama) for generating answers

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (or use npm/yarn)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Installation

#### 1. Clone the repository

```sh
git clone https://github.com/underatedkiddo/helper.git
cd helper
```

#### 2. Setup the Backend

```sh
cd backend
pnpm install
```

- Create a `.env` file in the `backend` folder:

  ```
  MONGO_URI=mongodb://127.0.0.1:27017/helper
  ```

- Start the backend server:

  ```sh
  pnpm start
  ```

  The backend will run on [http://localhost:5000](http://localhost:5000).

#### 3. Setup the Frontend

```sh
cd ../frontend
pnpm install
pnpm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173) by default.

## Usage

1. **Ask a Question:**  
   Type your question in the input box and submit. The answer will appear below.

2. **Upload an Image for OCR:**  
   Click the "Upload Image for OCR" button, select an image containing text, and the app will extract the text and get an answer for you.

3. **View Answers:**  
   Answers are displayed in a styled box for easy reading.

## Project Structure

```
backend/
  server.js
  .env
  controllers/
  models/
  routes/
  ai/
frontend/
  src/
    components/
    api/
    App.jsx
    main.jsx
  public/
  index.html
```


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

---

**Enjoy using Helper! If you have any questions or suggestions, feel free to open an issue


## pitch deck link bellow 
https://www.canva.com/design/DAGsOCe2EYM/rEGE6jBj-P_Z0dew1i6UHQ/view?utm_content=DAGsOCe2EYM&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hec56da14aa

## youtube video
https://youtu.be/7QqJ0SvY2Mo