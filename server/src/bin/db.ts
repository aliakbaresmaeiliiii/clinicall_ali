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
export async function checkUserExist(email: string): Promise<RowDataPacket[]> {
  const user = await query<RowDataPacket[]>(
    `SELECT user_id,email FROM  ${coreSchema}.users
      WHERE email=?`,
    {
      values: [email],
    }
  );
  return user;
}

export async function checkNickName(): Promise<any> {
  const getData = await query<RowDataPacket>(`SELECT * FROM Ali_DB.users`);
  return getData;
}

export async function createUser(data: any) {
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
    (user_id,userName,email,password,signupStatus,verify_code,createdAt,updatedAt,tokenVerify)
    VALUES(?,?,?,?,?,?,?,?,?)`,
    {
      values: [
        newId,
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

export async function confirmEmail(data: ConfirmEmail) {
  const result = await query<RowDataPacket[]>(
    `
    SELECT * 
    FROM ${coreSchema}.users
    WHERE email=? AND deletedAt IS NULL
    `,
    {
      values: [data.email],
    }
  );
  if (result.length < 1)
    return {
      isSuccessfull: false,
      status: 1,
      message: "user not found!",
    } as AppResponse;
  const user = result[0] as User;
  if (user.email !== data.email)
    return {
      isSuccessfull: false,
      status: 1,
      message: "email is not correct",
    } as AppResponse;
  if (user.emailConfirmed) {
    if (user.signupStatus === 1) {
      const result = await query<RowDataPacket[]>(
        `
        UPDATE ${coreSchema}.users
        SET signupStatus=?,emailConfirmed=?,updatedAt=?
        WHERE email =?
        `,
        {
          values: [1, 1, new Date(), data.email],
        }
      );
    }
    return {
      isSuccessfull: true,
      message: "email already confirmed",
    } as AppResponse;
  }
  if (user.verify_code !== data.verify_code)
    return { status: false, message: "code is not correct", code: 400 };
  await query<RowDataPacket[]>(
    `
    UPDATE ${coreSchema}.users
    SET emailConfirmed=1, signupStatus=2,updatedAt=?
    WHERE email=?
  `,
    {
      values: [new Date(), data.email],
    }
  );
  return {
    isSuccessfull: true,
    showToUser: true,
    messageCode: "MSG_01",
    messageKind: 1,
    message: "email confirmed successfully",
  } as AppResponse;
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

export async function updateUserVerifyCode(userId: string, newCode: string) {
  const result = await query<RowDataPacket>(
    `
    UPDATE ${coreSchema}.users
    SET verify_code=?,updatedAt=?
    WHERE user_id=?
    `,
    {
      values: [newCode, new Date(), userId],
    }
  );
  const user = await query<RowDataPacket[]>(
    `
      SELECT user_id,email,verify_code
      FROM ${coreSchema}.users
      WHERE user_id=?
      `,
    {
      values: [userId],
    }
  );
  return user[0] as CreateUser;
}

export async function getAdmins() {
  const userAdmin = await query<RowDataPacket[]>(`
    SELECT * FROM ${coreSchema}.admin
    `);
  return userAdmin as AdminDTO[];
}

export async function getOTP(email: any, tokenVerify: any) {
  const updateData = await query<RowDataPacket[]>(
    `UPDATE  ${coreSchema}.users SET verify_code=? WHERE email = ?`,
    {
      values: [tokenVerify, email],
    }
  );

  const result = await query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.users WHERE email = ?`,
    {
      values: [email],
    }
  );
  return result[0] as User;
}

export async function updateProfileUser(data: User): Promise<any> {
  const result = await query<RowDataPacket>(
    `
      UPDATE ${coreSchema}.users
      SET 
      userName = ?,
      gender = ?,
      phoneNumber = ?,
      dateOfBirth = ?,
      address = ?,
      verify_code = ?,
      tokenVerify = ?,
      country = ?,
      city = ?,
      state = ?,
      zipcode = ?
    WHERE email = ?`,

    {
      values: [
        data.userName,
        data.gender,
        data.phoneNumber,
        data.dateOfBirth,
        data.address,
        data.verify_code,
        data.tokenVerify,
        data.country,
        data.city,
        data.state,
        data.zipcode,
        data.email,
      ],
    }
  );
  return result;
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

export async function getUserInfo(email: string) {
  const data = await query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.users WHERE email=?`,
    {
      values: [email],
    }
  );
  if (data) return data;
}

export async function saveAppointment(eventData: IAppointment) {
  const insertEvent = await query<RowDataPacket[]>(
    `INSERT INTO ${coreSchema}.appointments 
      (patient_id, doctor_id, appointment_date, priority,event_title,created_at,updated_at,event_description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    {
      values: [
        eventData.patient_id,
        eventData.doctor_id,
        eventData.appointmentDate,
        eventData.priority,
        eventData.event_title,
        new Date(),
        new Date(),
        eventData.event_description,
      ],
    }
  );

  return insertEvent;
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

// ***********Doctors *********
export async function getDoctors(): Promise<DoctorsDTO[]> {
  const doctors = await query<RowDataPacket[]>(`
    SELECT * FROM ${coreSchema}.doctors`);
  return doctors as DoctorsDTO[];
}
export async function checkDoctorPhoneNumberExists(mobile: string) {
  const result = await query<RowDataPacket>(
    `
    SELECT mobile FROM ${coreSchema}.doctors
    where mobile=?
    `,
    {
      values: [mobile],
    }
  );
  return result;
}
export async function addDoctor(doctorInfo: DoctorsDTO) {
  try {
    const result = await query<RowDataPacket[]>(
      `INSERT INTO ${coreSchema}.doctors
      (name,gender,mobile,degree,dateOfBirth,department,
       age,email,address,profileImage,specialization,joingin_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        values: [
          doctorInfo.name,
          doctorInfo.gender,
          doctorInfo.mobile,
          doctorInfo.degree,
          doctorInfo.dateOfBirth,
          doctorInfo.department,
          doctorInfo.age,
          doctorInfo.email,
          doctorInfo.address,
          doctorInfo.profileImage,
          doctorInfo.specialization,
          new Date(),
        ],
      }
    );
    return result;
  } catch (error) {
    console.log();
    console.error("Error inserting doctor data:", error);
    throw error;
  }
}
export async function doctorDetail(doctorId: number): Promise<any> {
  const result = await query<RowDataPacket>(
    `SELECT * FROM ${coreSchema}.doctors d
    LEFT JOIN 
    ${coreSchema}.locations_doctors ld ON d.doctor_id = ld.doctor_id
     WHERE 
    d.doctor_id = ?;
`,
    { values: [doctorId] }
  );
  return result;
}
export async function updateDoctor(doctorData: DoctorsDTO): Promise<any> {
  const result = await query<RowDataPacket>(
    `
      UPDATE ${coreSchema}.doctors
      SET name = ?
      WHERE doctor_id = ?
    `,
    {
      values: [doctorData.name, doctorData.doctor_id],
    }
  );
  return result;
}

export async function comparePassword(data: any): Promise<any> {
  const result = await query<RowDataPacket[]>(
    `
    SELECT password FROM ${coreSchema}.users
    WHERE email=?
    `,
    {
      values: [data],
    }
  );
  return result;
}

export async function changePassword(data: any) {
  const { newPassword } = data;
  const { confirmPassword } = data;
  const fdPassword = { newPassword, confirmPassword };
  const validPassword = createPasswordSchema.validateSyncAt(
    "confirmPassword",
    fdPassword
  );
  const saltRounds = 10;
  const hash = bcrypt.hashSync(validPassword, saltRounds);

  const result = await query<RowDataPacket[]>(
    `
    UPDATE ${coreSchema}.users
    SET password=?,updatedAt=?
    WHERE email=?
    `,
    {
      values: [hash, new Date(), data.email],
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
