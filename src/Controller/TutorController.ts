import { Request, Response } from 'express';
import { TutorService } from '../Services/TutorService';

export class TutorController {
  private tutorService: TutorService;

  constructor() {
    this.tutorService = new TutorService();
  }

  async createTutor(req: Request, res: Response) {
    const bodyData = req.body;
    try {
      const newTutor = await this.tutorService.createTutor(bodyData);
      return res.status(201).json({ newTutor, message: 'Tutor created successfully' });
    } catch (error) {
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

  async updateTutor(req: Request, res: Response) {
    const { id } = req.params; // Certifique-se de usar 'id' aqui
    const updatedData = req.body;

    try {
      const updatedTutor = await this.tutorService.updateTutor(id, updatedData);

      if (!updatedTutor) {
        return res.status(404).json({ message: 'Tutor not found' });
      }

      return res.status(200).json({ updatedTutor, message: 'Tutor updated successfully' });
    } catch (error) {
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

  async getTutors(req: Request, res: Response) {
    try {
      const tutors = await this.tutorService.getTutors();
      return res.status(200).json(tutors);
    } catch (error) {
      return res.status(500).json({ error, message: 'Internal server error' });
    }
  }

  async getTutorById(req: Request, res: Response) {
    const { id } = req.params; // Certifique-se de usar 'id' aqui

    try {
      const tutor = await this.tutorService.getTutorById(id);

      if (!tutor) {
        return res.status(404).json({ message: 'Tutor not found' });
      }

      return res.status(200).json(tutor);
    } catch (error) {
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

  async deleteTutor(req: Request, res: Response) {
    const { id } = req.params; // Certifique-se de usar 'id' aqui

    try {
      const deletedTutor = await this.tutorService.deleteTutor(id);

      if (!deletedTutor) {
        return res.status(404).json({ message: 'Tutor not found' });
      }

      return res.status(204).json({ message: 'Tutor deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }
}