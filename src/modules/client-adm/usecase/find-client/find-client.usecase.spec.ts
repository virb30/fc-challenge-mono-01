import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import { FindClientUsecase } from "./find-client.usecase";

const client = new Client({
    id: new Id("1"),
    name: "Client 1",
    email: "client@x.com",
    address: "Address 1"
})

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client))
    }
}

describe("FindClientUsecase test", () => {

    it("should find a client", async () => {

        const repository = MockRepository();
        const usecase = new FindClientUsecase(repository);
        const input = {
            id: "1"
        };
        const output = await usecase.execute(input);
        expect(repository.find).toHaveBeenCalled();
        expect(output.id).toEqual(client.id.value);
        expect(output.name).toEqual(client.name);
        expect(output.email).toEqual(client.email);
        expect(output.address).toEqual(client.address);
        expect(output.createdAt).toEqual(client.createdAt);
        expect(output.updatedAt).toEqual(client.updatedAt);
    });
});