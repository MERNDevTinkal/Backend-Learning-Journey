import mongoose from "mongoose";

const todoSchema = ({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

});

 export const todo = mongoose.model("todo",todoSchema);