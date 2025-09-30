export declare function syncDoctorsToElasticsearch(): Promise<void>;
export declare function syncClinicsToElasticsearch(): Promise<void>;
export declare function searchEntities(query: string): Promise<{
    code: number;
    message: string;
    data: {
        doctors: any[];
        clinics: any[];
        filters: {};
    };
}>;
export declare function removeDeletedDoctorsFromElasticsearch(): Promise<void>;
