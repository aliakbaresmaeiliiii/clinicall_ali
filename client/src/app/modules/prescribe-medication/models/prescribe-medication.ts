export interface PrescriptionMedicine {
  patient_id: number;
  medicine_name: string | undefined | null;
  dosage?: string | undefined | null;
  frequency: string | undefined | null;
  duration: string | undefined | null;
  instructions: string | undefined | null;
  prescribed_date: Date | undefined | null;
}
