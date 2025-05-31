interface DoctorAggregations {
  by_clinic: {
    buckets: Array<{
      key: string;
      doc_count: number;
      doctor_count: { value: number };
      top_doctor: { hits: { hits: any[] } };
    }>;
  };
  by_specialty: {
    buckets: Array<{ key: string; doc_count: number }>;
  };
  by_city: {
    buckets: Array<{ key: string; doc_count: number }>;
  };
}

