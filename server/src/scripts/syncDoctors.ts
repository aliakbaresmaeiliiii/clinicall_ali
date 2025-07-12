import { esClient } from "../app";
import { coreSchema, query, RowDataPacket } from "../bin/mysql";

export async function syncDoctorsToElasticsearch() {
  try {
    const doctorRow = await query<RowDataPacket[]>(
      `SELECT * FROM ${coreSchema}.doctors`
    );
    if (doctorRow.length === 0) {
      console.log("❌ No clinics found in MySQL");
      return;
    }

    const doctorRows = await query<RowDataPacket[]>(`
      SELECT 
        d.id, d.first_name, d.last_name, d.profile_img, d.email, d.phone,d.gender,
        CONCAT(d.first_name, ' ', d.last_name) AS name,
        d.specialty_id, d.insurance_id, d.click_count, d.medical_code,
        sp.name AS specialty_name,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', ss.id,
            'name', ss.name
          )
        ) AS services,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'name', ci.name,
            'state', ci.state
          )
        ) AS cities,
        i.name AS insurance_name,  
        COUNT(r.id) AS total_reviews,
        COALESCE(AVG(r.rating), 0) AS average_rating,
        COALESCE(AVG(r.professional_demeanor), 0) AS avg_professional_demeanor,
        COALESCE(AVG(r.sufficient_time), 0) AS avg_sufficient_time,
        COALESCE(AVG(r.skill), 0) AS avg_skill,
        COALESCE(AVG(r.staff_behavior), 0) AS avg_staff_behavior,
        COALESCE(AVG(r.clinic_condition), 0) AS avg_clinic_condition,
        d.updated_at,
        CASE 
          WHEN EXISTS (SELECT 1 FROM ${coreSchema}.doctor_likes dl WHERE dl.doctor_id = d.id) 
          THEN 1 ELSE 0
        END AS isLiked,
        COALESCE(ROUND((SUM(CASE WHEN r.recommendations = 1 THEN 1 ELSE 0 END) / COUNT(r.id)) * 100, 2), 0) AS user_suggestion_percentage,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'city_id', ci.id,
            'country', ld.country,
            'latitude', ld.latitude,
            'longitude', ld.longitude,
            'address_line1', ld.address_line1,
            'address_line2', ld.address_line2,
            'zipcode', ld.zipcode,
            'city', ci.name,
            'state', ci.state
          )
        ) AS addresses,
        MAX(ci.id) AS city_id 
      FROM 
        ${coreSchema}.doctors d
      LEFT JOIN ${coreSchema}.doctor_locations ld ON d.id = ld.doctor_id
      LEFT JOIN ${coreSchema}.specialties sp ON d.specialty_id = sp.id
      LEFT JOIN ${coreSchema}.services ss ON sp.id = ss.specialty_id
      LEFT JOIN ${coreSchema}.doctor_reviews r ON d.id = r.doctor_id
      LEFT JOIN ${coreSchema}.insurances i ON d.insurance_id = i.id
      LEFT JOIN ${coreSchema}.cities ci ON ld.city_id = ci.id
      LEFT JOIN ${coreSchema}.doctor_likes dk ON d.id = dk.doctor_id
      GROUP BY d.id
    `);

    if (doctorRows.length === 0) {
      console.log("❌ No doctors found in MySQL");
      return;
    }

    // تبدیل داده‌ها به فرمت bulk API
    const body = doctorRows.flatMap((doc: any) => [
      { index: { _index: "doctors", _id: doc.id } },
      {
        id: doc.id,
        first_name: doc.first_name,
        last_name: doc.last_name,
        gender: doc.gender,
        profile_img: doc.profile_img,
        email: doc.email,
        phone: doc.phone,
        specialty_id: doc.specialty_id,
        insurance_id: doc.insurance_id,
        specialty_name: doc.specialty_name,
        insurance_name: doc.insurance_name,
        click_count: doc.click_count,
        medical_code: doc.medical_code,
        average_rating: doc.average_rating,
        total_reviews: doc.total_reviews,
        avg_professional_demeanor: doc.avg_professional_demeanor,
        avg_sufficient_time: doc.avg_sufficient_time,
        avg_skill: doc.avg_skill,
        avg_staff_behavior: doc.avg_staff_behavior,
        avg_clinic_condition: doc.avg_clinic_condition,
        isLiked: doc.isLiked,
        user_suggestion_percentage: doc.user_suggestion_percentage,
        services:
          typeof doc.services === "string"
            ? JSON.parse(doc.services)
            : Array.isArray(doc.services)
            ? doc.services
            : [],
        cities:
          typeof doc.cities === "string"
            ? JSON.parse(doc.cities)
            : Array.isArray(doc.cities)
            ? doc.cities
            : [],
        addresses:
          typeof doc.addresses === "string"
            ? JSON.parse(doc.addresses)
            : Array.isArray(doc.addresses)
            ? doc.addresses
            : [],
            count:doc.length
      },
    ]);

    const chunkSize = 500; // 500 * 2 = 1000 items (index+doc)
    for (let i = 0; i < body.length; i += chunkSize * 2) {
      const chunk = body.slice(i, i + chunkSize * 2);
      const response = await esClient.bulk({
        refresh: false,
        body: chunk,
      });

      if (response.errors) {
        const erroredDocuments = response.items.filter(
          (item: any) => item.index && item.index.error
        );
        console.error(
          `❌ ${erroredDocuments.length} errors in bulk insert`,
          erroredDocuments
        );

        // تلاش مجدد فقط روی اسناد خطادار
        const failedDocs: any[] = [];
        response.items.forEach((item, idx) => {
          if (item.index && item.index.error) {
            // هر سند شامل دو آیتم (action و document)
            failedDocs.push(chunk[idx * 2 + 1]);
          }
        });

        if (failedDocs.length > 0) {
          console.warn(`🔁 Retrying ${failedDocs.length} failed documents...`);
          const retryBody = failedDocs.flatMap((doc) => [
            { index: { _index: "doctors", _id: doc.id } },
            doc,
          ]);
          await esClient.bulk({ refresh: false, body: retryBody });
        }
      } else {
        console.log(`✅ Batch of ${chunkSize} doctors synced successfully`);
      }
    }

    await esClient.indices.refresh({ index: "doctors" });
    console.log("✅ All doctors synced and index refreshed");
  } catch (error) {
    console.error("❌ Sync failed:", error);
  }
}

export async function syncClinicsToElasticsearch() {
  try {
    const clinicRows = await query<RowDataPacket[]>(`
           SELECT 
        c.id,
        c.name,
        JSON_ARRAYAGG(JSON_OBJECT(
          'id', sp.id,
          'name', sp.name
        )) AS specialties,
        JSON_ARRAYAGG(JSON_OBJECT(
          'city', ci.name,
          'state', ci.state
        )) AS cities,
        JSON_ARRAYAGG(JSON_OBJECT(
          'latitude', cl.latitude,
          'longitude', cl.longitude,
          'address_line1', cl.address_line1,
          'zipcode', cl.zipcode
        )) AS locations
      FROM ${coreSchema}.clinics c
      LEFT JOIN ${coreSchema}.clinic_location cl ON c.id = cl.clinic_id
      LEFT JOIN ${coreSchema}.cities ci ON cl.clinic_id = ci.id
      LEFT JOIN ${coreSchema}.clinic_service cs ON c.id = cs.clinic_id
      LEFT JOIN ${coreSchema}.specialties sp ON cs.specialty_id = sp.id
      GROUP BY c.id
    `);

    if (clinicRows.length === 0) {
      console.log("❌ No clinics found in MySQL");
      return;
    }

    // const specialties =
    //   typeof clinic.specialties === "string"
    //     ? JSON.parse(clinic.specialties)
    //     : [];
    const body: any[] = [];

    const specialtyNames = clinicRows[0].specialties
      .map((sp: any) => sp.name)
      .join(", ")
      .toLowerCase();
    const cities =
      typeof clinicRows[0].cities === "string"
        ? JSON.parse(clinicRows[0].cities)
        : [];
    const locations =
      typeof clinicRows[0].locations === "string"
        ? JSON.parse(clinicRows[0].locations)
        : [];

    const addresses = [];

    for (let i = 0; i < Math.min(cities.length, locations.length); i++) {
      if (!locations[i].latitude || !locations[i].longitude) continue;

      addresses.push({
        city: cities[i].city || cities[i].name,
        state: cities[i].state,
        zip: locations[i].zipcode,
        location: {
          lat: locations[i].latitude,
          lon: locations[i].longitude,
        },
      });
    }

    body.push(
      { index: { _index: "clinics", _id: clinicRows[0].id } },
      {
        id: clinicRows[0].id,
        name: clinicRows[0].name,
        specialty_name: specialtyNames,
        addresses,
        count:clinicRows.length
      }
    );
    // clinicRows[0].forEach((clinic: any) => {
    //   console.log(`Processing clinic: ${clinic.specialties})`);
    //   console.log(`clinic: ${clinic.specialties})`);
    //   console.log(`clinicRows: ${  clinicRows[0]})`);
    //   const specialties = clinic.specialties
    //     ? JSON.parse(clinic.specialties)
    //     : [];

    // });

    const chunkSize = 500;
    for (let i = 0; i < body.length; i += chunkSize * 2) {
      const chunk = body.slice(i, i + chunkSize * 2);
      const response = await esClient.bulk({
        refresh: false,
        body: chunk,
      });

      if (response.errors) {
        const erroredDocuments = response.items.filter(
          (item: any) => item.index && item.index.error
        );
        console.error(
          `❌ ${erroredDocuments} errors occurred in clinic bulk insert`,
          erroredDocuments
        );
      } else {
        console.log(`✅ Batch of ${chunkSize} clinics synced successfully`);
      }
    }

    await esClient.indices.refresh({ index: "clinics" });
    console.log("✅ All clinics synced and index refreshed");
  } catch (error) {
    console.error("❌ Sync clinics failed:", error);
  }
}

function mapBucket(
  bucket: any[],
  keyPath: string[],
  namePath: string[],
  countPath = "doc_count"
) {
  return bucket.map((bucket) => {
    const doc = bucket.details.hits.hits[0]?._source;
    const id = bucket.key;
    const name = namePath.reduce((obj, key) => obj?.[key], doc) || null;
    return {
      id,
      name,
      count: bucket[countPath],
    };
  });
}

function buildFilters(aggregations: any) {
  const services = mapBucket(
    aggregations.services?.bucket ?? [],
    ["services", "id"],
    ["services", "name"]
  );
  const clinics = (aggregations?.clinics?.buckets ?? []).map((bucket: any) => {
    const doc = bucket.details.hits.hits[0]?._source;
    const clinic = doc?.clinics?.find((c: any) => c.id === bucket.key);
    return {
      id: bucket.key,
      name: clinic?.name || null,
      count: bucket.doc_count,
    };
  });
  const doctors = (aggregations?.doctors?.buckets ?? []).map((bucket: any) => {
    const doc = bucket.details.hits.hits[0]?._source;
    const doctor = doc?.doctors?.find((d: any) => d.doctor_id === bucket.key);
    return {
      id: bucket.key,
      first_name: doctor?.first_name || null,
      last_name: doctor?.last_name || null,
      count: bucket.doc_count,
    };
  });
  const specializations = (aggregations?.specializations?.buckets ?? []).map(
    (bucket: any) => {
      const doc = bucket.details.hits.hits[0]?._source;
      return {
        id: bucket.key,
        name: doc?.specialty_name || null,
        count: bucket.doc_count,
      };
    }
  );
  return {
    services,
    clinics,
    doctors,
    specialties: specializations,
  };
}

export async function searchEntities(query: string) {
  try {
    const searchQueries = [
      { match: { name: query } },
      { term: { speciality_id: query } },
      { match_phrase_prefix: { specialty_name: query } },
    ];

    const doctorsResponse = await esClient.search({
      index: "doctors",
      size: 50,
      query: {
        bool: {
          should: searchQueries,
          minimum_should_match: 1,
        },
      },
      aggs: {
        by_clinic: {
          terms: { field: "clinic_id.keyword" },
          aggs: {
            doctor_count: { cardinality: { field: "doctor_id.keyword" } },
            top_doctor: { top_hits: { size: 1 } },
          },
        },
        by_specialty: {
          terms: { field: "specialty_name.keyword" },
        },
        by_city: {
          nested: {
            path: "addresses",
          },
          aggs: {
            city_names: {
              terms: { field: "addresses.city.keyword" },
            },
          },
        },
      },
    });

    const clinicsResponse = await esClient.search({
      index: "clinics",
      size: 50,
      query: {
        bool: {
          should: searchQueries,
          minimum_should_match: 1,
        },
      },
      aggs: {
        by_specialty: {
          terms: { field: "specialty_name.keyword" },
        },
        by_city: {
          nested: {
            path: "addresses",
          },
          aggs: {
            city_names: {
              terms: { field: "addresses.city.keyword" },
            },
          },
        },
      },
    });

    const doctors = doctorsResponse.hits.hits.map((hit) => hit._source);
    const clinics = clinicsResponse.hits.hits.map((hit) => hit._source);

    const doctorAggregations = doctorsResponse.aggregations;
    const clinicAggregations = clinicsResponse.aggregations;

    return {
      code: 200,
      message: "data received",
      data: {
        doctors,
        clinics,
        filters: {
          doctors: {
            by_clinic: (doctorAggregations?.by_clinic as any).buckets,
            by_specialty: (doctorAggregations?.by_specialty as any).buckets,
            by_city: (doctorAggregations?.by_city as any).city_names.buckets,
          },
          clinics: {
            by_city: (clinicAggregations?.by_city as any).buckets,
            by_specialty: (clinicAggregations?.by_specialty as any).buckets,
          },
        },
      },
    };
  } catch (error) {
    console.error("❌ Search failed:", error);
    return {
      code: 500,
      message: "Search failed",
      data: {
        doctors: [],
        clinics: [],
      },
    };
  }
}

export async function removeDeleteDoctorsFromElasticSeach() {
  try {
    const deletedDoctors = await query<RowDataPacket[]>(
      `SELECT id FROM ${coreSchema}.doctors WHERE deleted_at >= NOW() - INTERVAL 1 DAY;`
    );
    if (deletedDoctors.length === 0) {
      console.log("✅ No deleted doctors to remove");
      return;
    }
    const body = deletedDoctors.flatMap((doc: any) => [
      { delete: { _index: "elasticsearch", _id: doc.id } },
    ]);
    const response = await esClient.bulk({ body });

    if (response.errors) {
      console.error("❌ Errors occurred in bulk delete:", response.items);
    } else {
      console.log("✅ Deleted doctors removed from Elasticsearch");
    }
  } catch (error) {
    console.error("❌ Deletion sync failed:", error);
  }
}
