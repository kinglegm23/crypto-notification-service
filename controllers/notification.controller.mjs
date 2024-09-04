import { Router } from "express";
import { create, sendNotification, getByStatus, deleteById, updateMessageById } from "../services/notification.service.mjs"

const router = Router();

router.post("/add", async (req, res) => {
    await create(req.body)
    res.json({
        status: "success",
        error: null
    })
})

router.get("/list", async (req, res) => {
    const { status = "pending" } = req.query;
    const data = await getByStatus(status);
    res.json({
        status: "success",
        error: null,
        data: data
    })
})

router.post("/send/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await sendNotification(id)
        res.json({
            status: "success",
            error: null
        })
    } catch (e) {
        res.json({
            status: "error",
            error: `${e}`
        })
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await deleteById(id)
        res.json({
            status: "success",
            error: null
        })
    } catch (e) {
        res.json({
            status: "error",
            error: `${e}`
        })
    }
})

router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    try {
        await updateMessageById(id, message);
        res.json({
            status: "success",
            error: null
        })
    } catch (e) {
        res.json({
            status: "error",
            error: `${e}`
        })
    }
})


export default router
