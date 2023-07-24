import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Api funcionando',
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at the URL http://localhost:${PORT}`);
});
