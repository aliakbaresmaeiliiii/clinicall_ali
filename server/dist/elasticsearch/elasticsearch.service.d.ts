export declare class ElasticsearchService {
    private readonly esClient;
    constructor();
    ping(): Promise<boolean>;
    createIndex(indexName: string, body: any): Promise<import("@elastic/elasticsearch/lib/api/types").IndicesCreateResponse>;
    indexDocument(indexName: string, id: string, body: any): Promise<import("@elastic/elasticsearch/lib/api/types").WriteResponseBase>;
    search(indexName: string, query: any): Promise<import("@elastic/elasticsearch/lib/api/types").SearchResponse<unknown, Record<string, import("@elastic/elasticsearch/lib/api/types").AggregationsAggregate>>>;
}
