import { DiseasesService } from './diseases.service';
export declare class DiseasesController {
    private readonly diseasesService;
    constructor(diseasesService: DiseasesService);
    findAll(): Promise<{
        message: string;
    }>;
}
