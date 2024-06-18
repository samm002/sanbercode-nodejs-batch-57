import express from "express";
import router from "./route"; // Import instance router dari file ./route

const app = express();
const PORT = 3000;

// Mendefinisikan penggunaan route oleh server dari instance router
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
