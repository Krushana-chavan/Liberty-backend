const { AuthModel } = require("../models/auth.model");
const { taskModel } = require("../models/task.model");


const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, message }) => {



    try {
        // Replace with your actual Gmail and App Password
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: 'krushnachavan29@gmail.com',           // Your full Gmail address
                pass:process.env.PASS_KEY
            },
        });

        const mailOptions = {
            from: '"Liberty Task Manger" <krushnachavan29@gmail.com>',
            to,
            subject,
            text: message,
            html: `<p>${message}</p>`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
        return info;

    } catch (error) {
        console.error('Error sending email:', error);

    }
};
// Create a new task
const addTask = async (req, res) => {
    const {
        title,
        company,
        userId,
        type,
        date,
        time,
        color,
        notes,
        assignees,
        workflowStatus,
        completionStatus,
        isRecurring,
        recurringType,
    } = req.body;

    try {
        const newTask = new taskModel({
            title,
            company,
            type,
            date,
            time,
            userId,
            color,
            notes,
            assignees,
            workflowStatus,
            completionStatus,
            isRecurring,
            recurringType,
        });


        if (!title || !company || !userId) {
            return res.status(400).json({ error: `Title, company, and userId are required fields.` });
        }
        if (assignees.length > 0) {
            assignees.forEach(async (assignee) => {
                const userInfo = await AuthModel.findById(assignee);
                console.log("Assignee Info:", userInfo);
                if (!userInfo) {
                    return res.status(400).json({ error: `Assignee with ID ${assignee} does not exist.` });
                }


                sendEmail({
                    to: userInfo.email,
                    subject: `New Task Assigned: ${title}`,
                    message: `You have been assigned a new task: ${title} at ${company}.
        Please check your task list for more details.`,
                }).catch((error) => {
                    console.error("Error sending email:", error);
                    return res.status(500).json({ error: "Failed to send notification email" });
                });
               

            })


        }
        await newTask.save();
        res.status(200).json({ msg: "Task created successfully!" });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Failed to create task" });
    }
};

// Get all tasks
const getTasks = async (req, res) => {


    module.exports = sendEmail;
    try {
        const tasks = await taskModel.find({});
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await taskModel.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: "Task not found!" });
        }
        res.status(200).json({ msg: "Task deleted successfully!" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Failed to delete task" });
    }
};

// Update multiple tasks
const updateMultipleTasks = async (req, res) => {
    const { updates } = req.body;

    if (!Array.isArray(updates) || updates.length === 0) {
        return res.status(400).json({ error: "Invalid updates payload" });
    }

    try {
        const bulkOps = updates.map(({ id, ...fieldsToUpdate }) => ({
            updateOne: {
                filter: { _id: id },
                update: { $set: fieldsToUpdate },
            },
        }));

        const result = await taskModel.bulkWrite(bulkOps);

        res.status(200).json({
            msg: "Tasks updated successfully",
            modifiedCount: result.modifiedCount,
        });
    } catch (error) {
        console.error("Bulk update error:", error);
        res.status(500).json({ error: "Failed to update tasks" });
    }
};

const upateSingleTask = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
console.log("Updating task with ID:", id);
    console.log("Updates:", updates);

    if (updates?.assignees.length > 0) {
            updates?.assignees.forEach(async (assignee) => {
                const userInfo = await AuthModel.findById(assignee);
                console.log("Assignee Info:", userInfo);
                if (!userInfo) {
                    return res.status(400).json({ error: `Assignee with ID ${assignee} does not exist.` });
                }


                sendEmail({
                    to: userInfo.email,
                    subject: `Task: ${updates.title} Updated`,
                    message: `Your assigned task : ${updates?.title} at ${updates?.company}.
       Updated, Please check your task list for more details.`,
                }).catch((error) => {
                    console.error("Error sending email:", error);
                    return res.status(500).json({ error: "Failed to send notification email" });
                });
               

            })


        }
    try {
        const updatedTask = await taskModel.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found!" });
        }
        res.status(200).json({ msg: "Task updated successfully!", task: updatedTask });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Failed to update task" });
    }
}

const getLoggedInUserTasks = async (req, res) => {
    const { id } = req.params;// Assuming user ID is stored in req.user
    console.log("Fetching tasks for user:", id);
    try {
        const tasks = await taskModel.find({
            assignees: id, // Mongoose automatically checks if assigneeId is in the array
        });
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks by assignee:", error);
        throw error;
    }
}

const taskController = {
    addTask,
    getTasks,
    deleteTask,
    updateMultipleTasks,
    getLoggedInUserTasks,
    upateSingleTask,
    sendEmail

};

module.exports = {
    taskController,
};
