const express = require("express")
import { sendNotification } from '../controllers/notification';

export const router = express.Router();

router.post('/send-notification', sendNotification);
