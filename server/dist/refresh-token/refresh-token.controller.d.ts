import { RefreshTokenService } from './refresh-token.service';
export declare class RefreshTokenController {
    private readonly refreshTokenService;
    constructor(refreshTokenService: RefreshTokenService);
    findAll(): Promise<{
        message: string;
    }>;
}
