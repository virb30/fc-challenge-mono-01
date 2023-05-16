import { ImportsNotUsedAsValues } from "typescript";
import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.dto";
import Client from "../../domain/client.entity";

export default class AddClientUsecase implements UseCaseInterface {
    constructor(private clientRepository: ClientGateway) { }

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
        const props = {
            id: new Id(input.id),
            name: input.name,
            email: input.email,
            address: input.address
        };
        const client = new Client(props);
        this.clientRepository.add(client);
        return {
            id: client.id.value,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        }
    }
}
