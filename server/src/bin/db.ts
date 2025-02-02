import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { createSchema } from "../controller/user/schema";
import { AdminDTO } from "../models/admin";
import { PatientDTO } from "../models/patients";
import { PrescriptionMedicine } from "../models/prescription_medicine";
import { IAppointment } from "../types/appointment.interface";
import { Menu, Submenu } from "../types/navItem";
import { CreateUser, User } from "../types/user";
import { RowDataPacket, coreSchema, query } from "./mysql";
import { patientSchema } from "../controller/patients/schema";
import { ResponseError } from "../modules/error/response_error";

// ****** Auth ******

export async function createUser(data: CreateUser) {
  const { password } = data;
  const { confirmPassword } = data;
  const fdPassword = { password, confirmPassword };
  const validPassword = createSchema.validateSyncAt(
    "confirmPassword",
    fdPassword
  );
  const saltRounds = 10;
  const hash = bcrypt.hashSync(validPassword, saltRounds);
  const newId = uuidv4();

  const result = await query<RowDataPacket>(
    `INSERT INTO ${coreSchema}.users
    (firstName,lastName,userName,email,password,signupStatus,verify_code,createdAt,updatedAt,tokenVerify)
    VALUES(?,?,?,?,?,?,?,?,?,?)`,
    {
      values: [
        data.firstName,
        data.lastName,
        data.userName,
        data.email,
        hash,
        0,
        data.verify_code,
        new Date(),
        new Date(),
        data.tokenVerify,
      ],
    }
  );
  return result;
}

export async function getUserByGoogleId(googleId: string) {
  const user = await query<RowDataPacket[]>(
    `
    SELECT * FROM${coreSchema}.users
    WHERE google_id=?`,
    {
      values: [googleId],
    }
  );
  if (user.length < 1) return null;
  else return user[0] as User;
}

export async function getAdmins() {
  const userAdmin = await query<RowDataPacket[]>(`
    SELECT * FROM ${coreSchema}.admin
    `);
  return userAdmin as AdminDTO[];
}

export async function getNavItems() {
  const getManu = await query<RowDataPacket[]>(`
  SELECT
    m.menu_id, 
    m.icon, 
    m.menu_name, 
    m.path, 
    s.submenu_id, 
    s.icon AS submenu_icon,
    s.submenu_name, 
    s.url
  FROM ${coreSchema}.menu m
  LEFT JOIN ${coreSchema}.submenu s ON m.menu_id = s.menu_id
  ORDER BY m.menu_id, s.submenu_id`);

  const menuMap = new Map<number, Menu>();
  getManu.forEach((row) => {
    const menuId = row.menu_id;
    if (!menuMap.has(menuId)) {
      menuMap.set(menuId, {
        menu_id: row.menu_id,
        icon: row.icon, // Ensure this line is correct
        menu_name: row.menu_name,
        path: row.path,
        submenus: [],
      });
    }
    if (row.submenu_id) {
      const submenu: Submenu = {
        submenu_id: row.submenu_id,
        submenu_name: row.submenu_name,
        url: row.url,
        icon: row.submenu_icon, // Adjusted to submenu_icon to prevent confusion
      };
      menuMap.get(menuId)?.submenus.push(submenu);
    }
  });
  return Array.from(menuMap.values());
}

export async function getAppointment() {
  const getEventData = await query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.appointments`
  );
  return getEventData;
}

export async function updateAppointment(
  data: IAppointment
): Promise<IAppointment[] | undefined> {
  const result = await query<RowDataPacket[]>(
    `UPDATE ${coreSchema}.appointments
    SET date = ?, updated_at = ?
    WHERE event_id = ?`,
    {
      values: [data.date, new Date(), data.event_id],
    }
  );
  if (result) {
    return result as IAppointment[];
  }
}

export async function deleteAppointment(event_id: string) {
  const result = await query<RowDataPacket[]>(
    `DELETE FROM ${coreSchema}.calendar_events
      WHERE event_id=?`,
    {
      values: [event_id],
    }
  );
  return result;
}
// ****** Patients ******
export async function getPatients() {
  const patients = await query<RowDataPacket[]>(`
  SELECT * FROM ${coreSchema}.patients
  `);
  return patients;
}
export async function patientDetail(id: number): Promise<any> {
  const result = await query<RowDataPacket>(
    `SELECT * FROM ${coreSchema}.patients
    WHERE id=?`,
    { values: [id] }
  );
  return result;
}
export async function checkPhoneNumberExists(mobile: string) {
  const result = await query<RowDataPacket>(
    `
    SELECT mobile FROM ${coreSchema}.patients
    where mobile=?
    `,
    {
      values: [mobile],
    }
  );
  return result;
}
export async function addPatient(data: PatientDTO) {
  const { password } = data.password;
  const { confirmPassword } = data.password;
  const fdPassword = { password ,confirmPassword};
  const validPassword = patientSchema.validateSyncAt(
    "confirmPassword",
    fdPassword
  );
  const saltRounds = 10;
  const hashedPassword =await bcrypt.hash(validPassword, saltRounds);
   if (validPassword.error) {
     throw new ResponseError.Unauthorized("Password is invalid");
   }
   const newId = uuidv4();

  const result = await query<RowDataPacket[]>(
    `INSERT INTO ${coreSchema}.patient
      (id,first_name,last_name,phone,email,password,token_verify,verify_code,created_at,updated_at)
        VALUES(?,?,?,?,?,?,?,?,?,?)`,
    {
      values: [
        newId,
        data.first_name,
        data.last_name,
        data.phone,
        data.email,
        hashedPassword,
        data.token_verify,
        data.verify_code,
        new Date(),
        new Date(),
      ],
    }
  );
  return result;
}
export async function deletePatient(id: number) {
  const result = await query<RowDataPacket>(
    `DELETE FROM ${coreSchema}.patients
    WHERE id =?`,
    {
      values: [id],
    }
  );
  return result;
}
export async function updatePatient(patientData: PatientDTO): Promise<any> {
  const result = await query<RowDataPacket>(
    `
      UPDATE ${coreSchema}.patients
      SET patientName = ?,
          gender = ?,
          mobile = ?,
          dateOfBirth = ?,
          age = ?,
          email = ?,
          bloodPressure = ?,
          injury = ?,
          bloodGroup = ?,
          address = ?
      WHERE id = ?
      `,
    {
      values: [
        patientData.patientName,
        patientData.gender,
        patientData.mobile,
        patientData.dateOfBirth,
        patientData.age,
        patientData.email,
        patientData.bloodPressure,
        patientData.injury,
        patientData.bloodGroup,
        patientData.address,
        patientData.id,
      ],
    }
  );
  return result;
}

export async function getMedicine() {
  const result = await query<RowDataPacket[]>(`
    SELECT * FROM ${coreSchema}.medications
    `);
  return result;
}

export async function getDisease() {
  const result = await query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.diseases`
  );
  return result;
}

export async function getDiseaseSubcategories(disease_id: string) {
  const result = await query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.diseases d 
      LEFT JOIN ${coreSchema}.disease_subcategories ds ON d.disease_id = ds.disease_id
    WHERE d.disease_id = ?`,
    {
      values: [disease_id],
    }
  );
  return result;
}

export async function updateIsFavorite(
  medication_id: string,
  isFavorite: boolean
) {
  const result = await query<RowDataPacket>(
    `UPDATE  ${coreSchema}.medications SET isFavorite = ? WHERE medication_id = ?`,
    {
      values: [isFavorite, medication_id],
    }
  );
  return result;
}

export async function addPrescriptionMedicine(
  formData: PrescriptionMedicine,
  medicine_id: number
): Promise<any> {
  const result = await query<RowDataPacket[]>(
    `
    INSERT INTO ${coreSchema}.prescription_medicine
     (
      id,
      medicine_id,
      prescribed_date
    ) VALUES (?, ?, ?)
    `,
    {
      values: [formData.id, medicine_id, formData.prescribed_date],
    }
  );
  return result;
}
