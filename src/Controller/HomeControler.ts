import { Request, Response } from 'express';

class HomeController {
    public home(req: Request, res: Response) {
        res.status(200).json({
            message: "Server running and API is working.",
        });
    }
}

export const homeController = new HomeController();