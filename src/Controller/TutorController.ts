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
      const newTutor = await this.tutorService.createTutor(bodyData);
      return res.status(201).json({ newTutor, message: 'Tutor created successfully' });
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
        return res.status(404).json({ message: 'Tutor not found' });
      }

      return res.status(200).json({ updatedTutors, message: 'Tutor updated successfully' });
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
    const { tutors_id } = req.params;

    try {
      const tutor = await this.tutorService.getTutorById(tutors_id);
      if (!tutor) {
        return res.status(404).json({ message: 'Tutor not found' });
      }
      return res.status(200).json(tutor);
    } catch (error) {
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

  async deleteTutors(req: Request, res: Response) {
    const { tutors_id } = req.params;

    try {
      const deletedTutor = await this.tutorService.deleteTutor(tutors_id);
      if (!deletedTutor) {
        return res.status(404).json({ message: 'Tutor not found' });
      }
      return res.status(204).json({ message: 'Tutor deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }
}
