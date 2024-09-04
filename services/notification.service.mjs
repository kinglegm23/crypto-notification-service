import NotificationModel from "../models/notification.mjs"

export const create = async (data) => {
    console.log(data);
    const {
        emailIds,
        message,
    } = data;
    if(!message || !emailIds.length) {
        throw new Error("Invalid data!")
    }
    const newNotification = NotificationModel({
        message,
        emailIds
    })
    await newNotification.save()
}

const emailServiceSend = ({ message, emailIds }) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log(`${message} sent to ${emailIds.join(",")}`)
            res();
        }, 100)
    })
}

export const sendNotification = async (id) => {
    const notification = await NotificationModel.findById(id);
    if (!id) {
        throw new Error("Notification not found")
    }
    if (notification.status != "pending") {
        throw new Error("Already sent!")
    }
    try {
        await emailServiceSend({
            message: notification.message,
            emailIds: notification.emailIds
        })
        notification.status = "sent"
    } catch (e) {
        notification.status = "failed"
    }
    await notification.save()
}

export const getByStatus = async (status) => {
    if (!status) {
        return
    }
    const notifications = await NotificationModel.find({
        status
    })
    return notifications
}

export const deleteById = async (id) => {
    const notification = await NotificationModel.findById(id);
    if (!notification) {
        throw new Error("Notification not found")
    }
    notification.isDeleted = true;
    await notification.save()
}


export const updateMessageById = async (id, message) => {
    const notification = await NotificationModel.findById(id);
    if (!notification || notification.isDeleted) {
        throw new Error("Notification not found")
    }
    notification.message = message;
    await notification.save()
}

