"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const DB_USER = 'admin';
const DB_PASSWORD = 'admin';
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Api funcionando",
    });
});
mongoose_1.default
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.mpd7oue.mongodb.net/`)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at the URL http://localhost:${PORT}`);
    });
})
    .catch((err) => console.log(err));
