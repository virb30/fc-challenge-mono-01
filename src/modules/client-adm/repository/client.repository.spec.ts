import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientRepository from "./client.repository";

describe("ClientRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const client = new Client({
            id: new Id("1"),
            name: "Client 1",
            email: "client@email.com",
            address: "Address 1"
        });

        const repository = new ClientRepository();
        await repository.add(client);

        const clientDatabase = await ClientModel.findOne({ where: { id: "1" } });
        expect(clientDatabase).toBeDefined();
        expect(clientDatabase.id).toEqual(client.id.value);
        expect(clientDatabase.name).toEqual(client.name);
        expect(clientDatabase.email).toEqual(client.email);
        expect(clientDatabase.address).toEqual(client.address);
        expect(clientDatabase.createdAt).toEqual(client.createdAt);
        expect(clientDatabase.updatedAt).toEqual(client.updatedAt);
    });

    it("should find a client", async () => {
        const client = await ClientModel.create({
            id: "1",
            name: "Client 1",
            email: "client@email.com",
            address: "Address 1",
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const repository = new ClientRepository();
        const result = await repository.find(client.id);
        expect(result.id.value).toEqual(client.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.address).toEqual(client.address);
        expect(result.createdAt).toEqual(client.createdAt);
        expect(result.updatedAt).toEqual(client.updatedAt);

    });
})