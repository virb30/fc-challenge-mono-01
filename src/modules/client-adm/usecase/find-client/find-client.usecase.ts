import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.dto";

export class FindClientUsecase implements UseCaseInterface {

    constructor(private clientRepository: ClientGateway) { }

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
        const client = await this.clientRepository.find(input.id);
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