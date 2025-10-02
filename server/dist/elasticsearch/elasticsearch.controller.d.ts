import { ElasticsearchService } from './elasticsearch.service';
export declare class ElasticsearchController {
    private readonly elasticsearchService;
    constructor(elasticsearchService: ElasticsearchService);
    ping(): Promise<boolean>;
    createIndex(body: any): Promise<{
        message: string;
    }>;
    search(query: any): Promise<{
        message: string;
    }>;
    searchDoctors(searchDto: {
        query: string;
        filters?: any;
    }): Promise<import("@elastic/elasticsearch/lib/api/types").SearchResponse<unknown, Record<string, import("@elastic/elasticsearch/lib/api/types").AggregationsAggregate>>>;
    getDoctor(id: string): Promise<import("@elastic/elasticsearch/lib/api/types").GetResponse<unknown> | {
        error: string;
    }>;
}
