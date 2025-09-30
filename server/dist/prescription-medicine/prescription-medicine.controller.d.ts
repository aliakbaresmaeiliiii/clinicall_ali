import { PrescriptionMedicineService } from './prescription-medicine.service';
export declare class PrescriptionMedicineController {
    private readonly prescriptionMedicineService;
    constructor(prescriptionMedicineService: PrescriptionMedicineService);
    findAll(): Promise<{
        message: string;
    }>;
}
