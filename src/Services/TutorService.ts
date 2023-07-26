import Tutors from "../Models/tutors"
import Pets from "../Models/pets"

export class TutorService {
  async createTutor(data: any) {
    try {
      return await Tutors.create(data);
    } catch (error) {
      throw error;
    }
  }

  async updateTutor(tutors_id: string, updatedData: any) {
    try {
      return await Tutors.findByIdAndUpdate(tutors_id, updatedData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async getTutors() {
    try {
      const tutorss = await Tutors.find();
      const tutorssWithPets = [];

      for (const tutors of tutorss) {
        const pets = await Pets.find({ tutors: tutors._id });

        const formattedPets = pets.map((pet: any) => ({
          id: pet._id,
          name: pet.name,
          species: pet.species,
          carry: pet.carry,
          weight: pet.weight,
          date_of_birth: pet.date_of_birth,
        }));

        tutorssWithPets.push({
          id: tutors._id,
          name: tutors.name,
          phone: tutors.phone,
          email: tutors.email,
          date_of_birth: tutors.date_of_birth,
          zip_code: tutors.zip_code,
          pets: formattedPets,
        });
      }

      return tutorssWithPets;
    } catch (error) {
      throw error;
    }
  }

  async getTutorById(tutors_id: string) {
    try {
      const tutors = await Tutors.findById(tutors_id);
      if (!tutors) {
        throw new Error('Tutor not found');
      }
      return tutors;
    } catch (error) {
      throw error;
    }
  }

  async deleteTutor(tutors_id: string) {
    try {
      const tutorsHasPets = await Pets.exists({ tutors: tutors_id });
      if (tutorsHasPets) {
        throw new Error('Cannot delete tutors with associated pets');
      }
      
      return await Tutors.findByIdAndDelete(tutors_id);
    } catch (error) {
      throw error;
    }
  }
}
