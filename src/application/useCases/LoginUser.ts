import { UserLoginDTO } from "../dtos";
import { LoginUserService } from "../services/LoginUser";
import { JwtToken } from "../types";

export class LoginUserUseCase {
    constructor(private loginUserService: LoginUserService) {}

    async execute(userLoginDTO: UserLoginDTO): Promise<JwtToken> {
        return await this.loginUserService.execute(userLoginDTO);
    }
}
