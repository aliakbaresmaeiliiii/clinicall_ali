import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchService {
  private readonly esClient: Client;

  constructor() {
    this.esClient = new Client({
      node: 'http://localhost:9200',
      auth: {
        username: 'elastic',
        password: 'Ali0011914505',
      },
    });
  }

  async ping() {
    try {
      const response = await this.esClient.ping();
      return response;
    } catch (error) {
      throw new Error(`Elasticsearch connection error: ${error.message}`);
    }
  }

  async createIndex(indexName: string, body: any) {
    try {
      const response = await this.esClient.indices.create({
        index: indexName,
        body,
      });
      return response;
    } catch (error) {
      throw new Error(`Error creating index: ${error.message}`);
    }
  }

  async indexDocument(indexName: string, id: string, body: any) {
    try {
      const response = await this.esClient.index({
        index: indexName,
        id,
        body,
      });
      return response;
    } catch (error) {
      throw new Error(`Error indexing document: ${error.message}`);
    }
  }

  async search(indexName: string, query: any) {
    try {
      const response = await this.esClient.search({
        index: indexName,
        body: query,
      });
      return response;
    } catch (error) {
      throw new Error(`Error searching: ${error.message}`);
    }
  }

  async getDocument(indexName: string, id: string) {
    try {
      const response = await this.esClient.get({
        index: indexName,
        id,
      });
      return response;
    } catch (error) {
      throw new Error(`Error getting document: ${error.message}`);
    }
  }

  async bulkIndex(body: any[]) {
    try {
      const response = await this.esClient.bulk({
        body,
      });
      return response;
    } catch (error) {
      throw new Error(`Error bulk indexing: ${error.message}`);
    }
  }
}
