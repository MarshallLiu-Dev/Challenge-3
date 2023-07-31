import { PetRepository } from "../../Repositories/PetRepository";
import Pet from "../../Models/pets";

jest.mock("../../Models/pets.ts");

describe("PetRepository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("createPet should create a new pet", async () => {
    // Configure the mock of Pet.create to return a simulated object
    const mockPet = { _id: "existingId", name: "Dog" };
    (Pet.create as jest.Mock).mockResolvedValue(mockPet);

    const petRepository = new PetRepository();
    const petData = { name: "Dog", species: "Canis familiaris" };
    const createdPet = await petRepository.createPet(petData);

    expect(Pet.create).toHaveBeenCalledWith(petData);
    expect(createdPet).toEqual(mockPet);
  });

  test("findAllPets should return all pets", async () => {
    // Configure the mock of Pet.find to return a simulated array of pets
    const mockPets = [
      { _id: "1", name: "Dog" },
      { _id: "2", name: "Cat" },
    ];
    (Pet.find as jest.Mock).mockResolvedValue(mockPets);

    const petRepository = new PetRepository();
    const pets = await petRepository.findAllPet();

    expect(Pet.find).toHaveBeenCalledWith();
    expect(pets).toEqual(mockPets);
  });

  test("updatePet should update an existing pet", async () => {
    // Configure the mock of Pet.findByIdAndUpdate to return the updated simulated object
    const mockPet = { _id: "existingId", name: "Updated Dog" };
    (Pet.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockPet);

    const petRepository = new PetRepository();
    const petId = "existingId";
    const updatedData = { name: "Updated Dog", species: "Canis familiaris" };
    const updatedPet = await petRepository.updatePet(petId, updatedData);

    expect(Pet.findByIdAndUpdate).toHaveBeenCalledWith(petId, updatedData);
    expect(updatedPet).toEqual(mockPet);
  });

  test("findPetById should get a pet by ID from the database", async () => {
    // Configure the mock of Pet.findById to return a simulated object
    const mockPet = { _id: "existingId", name: "Dog" };
    (Pet.findById as jest.Mock).mockResolvedValue(mockPet);

    const petRepository = new PetRepository();
    const petId = "existingId";
    const pet = await petRepository.findPetById(petId);

    expect(Pet.findById).toHaveBeenCalledWith(petId);
    expect(pet).toEqual(mockPet);
  });

  test("deletePet should delete a pet by ID from the database", async () => {
    // Configure the mock of Pet.findByIdAndDelete to return the deleted simulated object
    const mockDeletedPet = { _id: "deletedId", name: "Deleted Pet" };
    (Pet.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDeletedPet);

    const petRepository = new PetRepository();
    const petId = "existingId";
    const deletedPet = await petRepository.deletePet(petId);

    expect(Pet.findByIdAndDelete).toHaveBeenCalledWith(petId);
    expect(deletedPet).toEqual(mockDeletedPet);
  });
});