const express = require("express")
import { router as notificationRouter } from './routes/notification';

const app = express();
app.use(express.json());

// Single route for handling notifications
app.use('/api/v1/notification', notificationRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
