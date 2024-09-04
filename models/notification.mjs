import { model, Schema } from "mongoose";

const NotificationSchema = new Schema({
    status: {
        type: String,
        enum: ["pending", "sent", "failed"],
        default: "pending"
    },
    message: {
        type: String,
        required: true
    },
    emailIds: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const NotificationModel = model('Notification', NotificationSchema)

export default NotificationModel
