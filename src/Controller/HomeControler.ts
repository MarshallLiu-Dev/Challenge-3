import { Request, Response } from 'express';

class HomeController {
    public home(req: Request, res: Response) {
        res.status(200).json({
            message: 'A API está funcionando.',
        });
    }
}

export const homeController = new HomeController();