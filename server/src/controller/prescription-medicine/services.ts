import { addPrescriptionMedicine } from "../../bin/db";

export class PrescriptionMedicineService {
  public static async AddPrescriptionMedicne(formData: any) {
    const results = [];
    for (const medicine of formData.medicine_name) {
      const medicine_id = medicine.medication_id;

      const data = await addPrescriptionMedicine(formData, medicine_id);
      results.push({ medicine_id, result: data });
    }
    if (results.length) {
      return { message: "Insertaions completed", results };
    } else {
      return null;
    }
  }
}
