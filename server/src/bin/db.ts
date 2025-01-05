import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { createSchema } from "../controller/user/schema";
import { AdminDTO } from "../models/admin";
import { PatientDTO } from "../models/patients";
import { IAppointment } from "../types/appointment.interface";
import { Menu, Submenu } from "../types/navItem";
import { AppResponse } from "../types/response.interface";
import { ConfirmEmail, CreateUser, User } from "../types/user";
import { RowDataPacket, coreSchema, query } from "./mysql";
import { DoctorsDTO } from "../models/doctors";
import { createPasswordSchema } from "../controller/user/schema";
import { PrescriptionMedicine } from "../models/prescription_medicine";

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

export async function getUserByPassword(
  email: string,
  password: string
): Promise<any> {
  const user = await query<RowDataPacket[]>(
    ` SELECT u.*, r.*,p.*
    FROM ${coreSchema}.users u
    LEFT JOIN ${coreSchema}.user_roles ur ON u.user_id = ur.user_id
    LEFT JOIN ${coreSchema}.roles r ON ur.role_id = r.id
    LEFT JOIN ${coreSchema}.role_permissions rp ON r.id = rp.role_id
    LEFT JOIN ${coreSchema}.permissions p ON rp.permission_id  = p.id

    WHERE u.email = ?`,
    {
      values: [email],
    }
  );
  return user;
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
export async function patientDetail(patient_id: number): Promise<any> {
  const result = await query<RowDataPacket>(
    `SELECT * FROM ${coreSchema}.patients
    WHERE patient_id=?`,
    { values: [patient_id] }
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
export async function addPatient(patientData: PatientDTO) {
  try {
    const result = await query<RowDataPacket[]>(
      `INSERT INTO ${coreSchema}.patients
      (patientName, gender, mobile, dateOfBirth, age, email, maritalStatus, address,
        bloodGroup, bloodPressure, sugarLevel, injury, profileImage,heartBeat,
        haemoglobin,doctor,treatment,charges,description,date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        values: [
          patientData.patientName,
          patientData.gender,
          patientData.mobile,
          patientData.dateOfBirth,
          patientData.age,
          patientData.email,
          patientData.maritalStatus,
          patientData.address,
          patientData.bloodGroup,
          patientData.bloodPressure,
          patientData.sugarLevel,
          patientData.injury,
          patientData.profileImage,
          patientData.heartBeat,
          patientData.haemoglobin,
          patientData.doctor,
          patientData.treatment,
          patientData.charges,
          patientData.description,
          new Date(),
        ],
      }
    );
    return result;
  } catch (error) {
    console.log();
    console.error("Error inserting patient data:", error);
    throw error;
  }
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
      WHERE patient_id = ?
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
        patientData.patient_id,
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
      patient_id,
      medicine_id,
      prescribed_date
    ) VALUES (?, ?, ?)
    `,
    {
      values: [formData.patient_id, medicine_id, formData.prescribed_date],
    }
  );
  return result;
}
