import { TutorRepository } from '../../Repositories/TutorRepository';
import Tutors from '../../Models/tutors';

jest.mock('../../Models/tutors.ts');

describe('TutorRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createTutor should create a new tutor', async () => {
    // Configura o mock do Tutors.create para retornar um objeto simulado
    const mockTutor = { _id: 'existingId', name: 'John Doe' };
    (Tutors.create as jest.Mock).mockResolvedValue(mockTutor);

    const tutorRepository = new TutorRepository();
    const tutorData = { name: 'John Doe', email: 'john@example.com' };
    const createdTutor = await tutorRepository.createTutor(tutorData);

    expect(Tutors.create).toHaveBeenCalledWith(tutorData);
    expect(createdTutor).toEqual(mockTutor);
  });
  test("findAllTutor should return all pets", async () => {
    // Configure the mock of Pet.find to return a simulated array of pets
    const mockPets = [
      { _id: "1", name: "Dog" },
      { _id: "2", name: "Cat" },
    ];
    (Tutors.find as jest.Mock).mockResolvedValue(mockPets);

    const tutorRepository = new TutorRepository();
    const tutors = await tutorRepository.findAllTutors();

    expect(Tutors.find).toHaveBeenCalledWith();
    expect(tutors).toEqual(mockPets);
  });
  
  test('updateTutor should update an existing tutor', async () => {
    // Configura o mock do Tutors.findByIdAndUpdate para retornar o objeto atualizado simulado
    const mockTutor = { _id: 'existingId', name: 'Updated John Doe' };
    (Tutors.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockTutor);

    const tutorRepository = new TutorRepository();
    const tutorId = 'existingId';
    const updatedData = { name: 'Updated John Doe', email: 'updated@example.com' };
    const updatedTutor = await tutorRepository.updateTutor(tutorId, updatedData);

    expect(Tutors.findByIdAndUpdate).toHaveBeenCalledWith(tutorId, updatedData);
    expect(updatedTutor).toEqual(mockTutor);
  });

 
  test('findTutorById should get a tutor by ID from the database', async () => {
    // Configura o mock do Tutors.findById para retornar um objeto simulado
    const mockTutor = { _id: 'existingId', name: 'John Doe' };
    (Tutors.findById as jest.Mock).mockResolvedValue(mockTutor);

    const tutorRepository = new TutorRepository();
    const tutorId = 'existingId';
    const tutor = await tutorRepository.findTutorById(tutorId);

    expect(Tutors.findById).toHaveBeenCalledWith(tutorId);
    expect(tutor).toEqual(mockTutor);
  });

  test('deleteTutor should delete a tutor by ID from the database', async () => {
    // Configura o mock do Tutors.findByIdAndDelete para retornar o objeto deletado simulado
    const mockDeletedTutor = { _id: 'deletedId', name: 'Deleted Tutor' };
    (Tutors.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDeletedTutor);

    const tutorRepository = new TutorRepository();
    const tutorId = 'existingId';
    const deletedTutor = await tutorRepository.deleteTutor(tutorId);

    expect(Tutors.findByIdAndDelete).toHaveBeenCalledWith(tutorId);
    expect(deletedTutor).toEqual(mockDeletedTutor);
  });
});