import { InsuranceService } from './insurance.service';
export declare class InsuranceController {
    private readonly insuranceService;
    constructor(insuranceService: InsuranceService);
    findAll(): Promise<{
        message: string;
    }>;
}
