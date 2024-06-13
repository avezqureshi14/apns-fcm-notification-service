import { router as notificationRouter } from './routes/notification';
const express = require("express")

const app = express();
app.use(express.json());


app.use('/api/v1/notifications', notificationRouter);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
