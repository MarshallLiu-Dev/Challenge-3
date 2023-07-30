import tutors from "../../Models/tutors";
import {TutorController} from "../../Controller/TutorController";

describe("Deve retornar testes de unidade de tutors", () => {
  afterEach(() => jest.clearAllMocks());

  const objetoTutor = {
    name: "Test",
    phone: 40028922,
    email: "test@gmail.com",
    password: "12345678",
    zip_code: 123435678,
    date_of_birth: "2023-12-12 10: 10",
  };

  // testando instanciar objeto
  it("Deve instanciar um objeto de tutor", () => {
    const tutor = new tutors(objetoTutor);
    expect(tutor).toEqual(expect.objectContaining(objetoTutor));

    expect(tutor).toHaveProperty("name", "Test");
  });

  it("Deve retornar uma lista de Tutores simulada com mock", () => {
    TutorController.getTutors = jest.fn().mockReturnValue([
      {
        name: "Test",
        phone: 40028922,
        email: "test@gmail.com",
        password: "12345678",
        zip_code: 123435678,
        date_of_birth: "2023-12-12 10: 10",
      },
    ]);
    const retorno = TutorController.getTutors();
    expect(retorno[0]).toHaveProperty("name", "Test");
    expect(TutorController.getTutors).toBeCalledTimes(1);
  });
});