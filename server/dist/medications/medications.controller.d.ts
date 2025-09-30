import { MedicationsService } from './medications.service';
export declare class MedicationsController {
    private readonly medicationsService;
    constructor(medicationsService: MedicationsService);
    findAll(): Promise<{
        message: string;
    }>;
}
