import pets from '../../Models/pets'
import {PetController} from '../../Controller/PetController'
import mongoose from "mongoose"

describe ('Deve retornar testes de unidade de Pet', () => {
    afterEach(() => jest.clearAllMocks())

    const tutorId = new mongoose.Types.ObjectId() //mongoose.Schema.Types.ObjectId.get()
    const objetoPet = {
        tutor:tutorId,  
        name: 'testPet',
        species: 'test',
        carry: 'T',
        weight: '5',
        date_of_birth: "2023-12-12 10: 10"        
      }

      
    // testando instanciar objeto
    it('Deve instanciar um objeto de Pet', () => {
        const pet = new pets(objetoPet)
        
        expect(pet).toEqual(expect.objectContaining(objetoPet))
    })
    
        it('Deve retornar uma lista de Pets simulada com mock', () => {
            PetController.getPet = jest.fn().mockReturnValue(
                [{
                    tutor:tutorId,  
                    name: 'testPet',
                    species: 'test',
                    carry: 'T',
                    weight: '5',
                    date_of_birth: "2023-12-12 10: 10" 
                }]
            )
            const retorno = PetController.getPet()
            expect(retorno[0]).toHaveProperty('tutor', tutorId)
            expect(PetController.getPet).toBeCalledTimes(1)
        })
            
})