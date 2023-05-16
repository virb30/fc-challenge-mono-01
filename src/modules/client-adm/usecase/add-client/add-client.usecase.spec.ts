import AddClientUsecase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe("AddClient usecase test", () => {

    it("should create a client", async () => {

        const repository = MockRepository();
        const usecase = new AddClientUsecase(repository);
        const input = {
            id: "1",
            name: "John Doe",
            email: "john@doe.com",
            address: "Address 1"
        }
        const output = await usecase.execute(input);
        expect(repository.add).toHaveBeenCalled();
        expect(output.id).toBeDefined();
        expect(output.name).toEqual(input.name);
        expect(output.address).toEqual(input.address);
        expect(output.createdAt).toBeDefined();
        expect(output.updatedAt).toBeDefined();
    });
});