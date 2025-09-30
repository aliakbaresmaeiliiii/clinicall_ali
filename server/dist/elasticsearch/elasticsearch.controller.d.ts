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
}
