import { app } from "./app.js";
import connectDB from "./db/index.js";

const PORT = process.env.PORT || 4001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongodb connection error", error);
  });
