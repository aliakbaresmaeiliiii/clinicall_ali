import { AiService } from './ai.service';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    processRequest(data: any): Promise<{
        message: string;
        data: any;
    }>;
}
