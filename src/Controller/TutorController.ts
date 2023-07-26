import { Request, Response } from 'express';
import { TutorService } from "../Services/TutorService";

export class TutorController {
  private tutorService: TutorService;
  
  constructor() {
    this.tutorService = new TutorService();
  }
  
  async createTutor(req: Request, res: Response) {
    const bodyData = req.body;
    try {
      const newTutors = await this.tutorService.createTutor(bodyData);
      return res.status(201).json({ newTutors, message: 'Tutors created successfully' });
    } catch (error) {
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

  async updateTutors(req: Request, res: Response) {
    const { tutors_id } = req.params;
    const updatedData = req.body;

    try {
      const updatedTutors = await this.tutorService.updateTutor(tutors_id, updatedData);

      if (!updatedTutors) {
        return res.status(404).json({ message: 'Tutors not found' });
      }

      return res.status(200).json({ updatedTutors, message: 'Tutors updated successfully' });
    } catch (error) {
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

  async getTutors(req: Request, res: Response) {
    try {
      const tutorss = await this.tutorService.getTutors();
      return res.status(200).json(tutorss);
    } catch (error) {
      return res.status(500).json({ error, message: 'Internal server error' });
    }
  }

  async getTutorById(req: Request, res: Response) {
    const { tutors_id } = req.params;

    try {
      const tutors = await this.tutorService.getTutorById(tutors_id);
      return res.status(200).json(tutors);
    } catch (error) {
      return res.status(400).json({ error, message: 'Request error check and try again' });
    }
  }

  async deleteTutors(req: Request, res: Response) {
    const { tutors_id } = req.params;

    try {
      await this.tutorService.deleteTutor(tutors_id);
      return res.status(204).json({ message: 'Delete successful' });
    } catch (error) {
      return res.status(400).json({ error, message: 'Request error check and try again' });
    }
  }
}
