import {
    IExecuteFunctions,
} from 'n8n-core';

import {
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    IDataObject,
    ILoadOptionsFunctions,
    INodeListSearchResult
} from 'n8n-workflow';

import {
    genericRequest
} from './helpers';

import {
    metaServicesOperations,
    restAndAdvancedServicesOperations,
    documentServicesOperations
} from './descriptions';

interface ModelsDomain {
    value: string;
}

export class Axelor implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Axelor',
        name: 'Axelor',
        icon: 'file:Axelor.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
        description: 'Consume Axelor API',
        defaults: {
            name: 'Axelor',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'axelorApi',
                required: true,
            }
        ],
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Meta Service',
                        value: 'metaServices',
                    },
                    {
                        name: 'REST & Advances Service',
                        value: 'restAndAdvancedServices',
                    },
                    {
                        name: 'Document Service',
                        value: 'documentService',
                    },
                ],
                default: 'restAndAdvancedServices',
                required: true
            },
                ...metaServicesOperations,
                ...restAndAdvancedServicesOperations,
                ...documentServicesOperations
        ],
    };

// This method doesn't work.
    methods = {
        listSearch: {
            async searchDomain(
                this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
                const endpoint = `/ws/meta/models`;
                const body: IDataObject = {};
                const searchResults = await genericRequest.call(this, 'GET', endpoint, body);
                return {
                    results: searchResults.data.map((a: ModelsDomain) => ({
                        value: a.value
                    }))
                };
            },
        },
    };

async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

    let responseData: IDataObject[] = [];

        const resource = this.getNodeParameter('resource', 0) as string;
        const operation = this.getNodeParameter('operation', 0) as string;

        // ------------------------
        //      META SERVICES
        // ------------------------
        if (resource === 'metaServices') {
            if (operation === 'getModels') {
                const endpoint = `/ws/meta/models`;
                const body: IDataObject = {};
                responseData = await genericRequest.call(this, 'GET', endpoint, body);
            }
        }
        if (resource === 'metaServices') {
            if (operation === 'getModelsProperties') {
            const domain = this.getNodeParameter('domain', 0, undefined, {extractValue: true}) as string;
                const endpoint = `/ws/meta/fields/${domain}`;
                const body: IDataObject = {};
                responseData = await genericRequest.call(this, 'GET', endpoint, body);
            }
        }

        // ------------------------
        //      REST AND ADVANCED SERVICES
        // ------------------------
        if (resource === 'restAndAdvancedServices') {
            if (operation === 'getAll') {
                const domain = this.getNodeParameter('domain', 0, undefined, {extractValue: true}) as string;
                const query = this.getNodeParameter('query', 0) as string;
                const endpoint = `/ws/rest/${domain}${query}`;
                const body: IDataObject = {};
                responseData = await genericRequest.call(this, 'GET', endpoint, body);
            }
        }

        if (resource === 'restAndAdvancedServices') {
            if (operation === 'getId') {
                const domain = this.getNodeParameter('domain', 0, undefined, {extractValue: true}) as string;
                const id = this.getNodeParameter('id', 0) as string;
                const endpoint = `/ws/rest/${domain}/${id}`;
                const body: IDataObject = {};
                responseData = await genericRequest.call(this, 'GET', endpoint, body);
            }
        }

        if (resource === 'restAndAdvancedServices') {
            if (operation === 'putOne') {
                const domain = this.getNodeParameter('domain', 0, undefined, {extractValue: true}) as string;
                const endpoint = `/ws/rest/${domain}`;
                const data = this.getNodeParameter('content', 0) as string;
                const body: IDataObject = JSON.parse(data);
                responseData = await genericRequest.call(this, 'PUT', endpoint, body);
            }
        }

        if (resource === 'restAndAdvancedServices') {
            if (operation === 'postId') {
                const domain = this.getNodeParameter('domain', 0, undefined, {extractValue: true}) as string;
                const id = this.getNodeParameter('id', 0) as string;
                const endpoint = `/ws/rest/${domain}/${id}`;
                const data = this.getNodeParameter('content', 0) as string;
                const body: IDataObject = JSON.parse(data);
                responseData = await genericRequest.call(this, 'POST', endpoint, body);
            }
        }

        if (resource === 'restAndAdvancedServices') {
            if (operation === 'deleteId') {
                const domain = this.getNodeParameter('domain', 0, undefined, {extractValue: true}) as string;
                const id = this.getNodeParameter('id', 0) as string;
                const endpoint = `/ws/rest/${domain}/${id}`;
                const body: IDataObject = {};
                responseData = await genericRequest.call(this, 'DELETE', endpoint, body);
            }
        }

        if (resource === 'restAndAdvancedServices') {
            if (operation === 'postfetch') {
                const domain = this.getNodeParameter('domain', 0, undefined, {extractValue: true}) as string;
                const id = this.getNodeParameter('id', 0) as string;
                const endpoint = `/ws/rest/${domain}/${id}/fetch`;
                const data = this.getNodeParameter('content', 0) as string;
                const body: IDataObject = JSON.parse(data);
                responseData = await genericRequest.call(this, 'POST', endpoint, body);
            }
        }

        if (resource === 'restAndAdvancedServices') {
            if (operation === 'deleteAll') {
                const domain = this.getNodeParameter('domain', 0, undefined, {extractValue: true}) as string;
                const endpoint = `/ws/rest/${domain}/removeAll`;
                const data = this.getNodeParameter('content', 0) as string;
                const body: IDataObject = JSON.parse(data);
                responseData = await genericRequest.call(this, 'POST', endpoint, body);
            }
        }

        if (resource === 'restAndAdvancedServices') {
            if (operation === 'postSearch') {
                const domain = this.getNodeParameter('domain', 0, undefined, {extractValue: true}) as string;
                const endpoint = `/ws/rest/${domain}/search`;
                const data = this.getNodeParameter('content', 0) as string;
                const body: IDataObject = JSON.parse(data);
                responseData = await genericRequest.call(this, 'POST', endpoint, body);
            }
        }

        if (resource === 'restAndAdvancedServices') {
            if (operation === 'actionService') {
                const endpoint = `/ws/action`;
                const data = this.getNodeParameter('content', 0) as string;
                const body: IDataObject = JSON.parse(data);
                responseData = await genericRequest.call(this, 'POST', endpoint, body);
            }
        }

        // ------------------------
        //      DOCUMENT SERVICE
        // ------------------------
        if (resource === 'documentService') {
            if (operation === 'getFiles') {
                const query = this.getNodeParameter('query', 0) as string;
                const endpoint = `/ws/dms/files${query}`;
                const body: IDataObject = {};
                responseData = await genericRequest.call(this, 'GET', endpoint, body);
            }
        }
        if (resource === 'documentService') {
            if (operation === 'getFileId') {
                const id = this.getNodeParameter('id', 0) as string;
                const endpoint = `/ws/dms/download/${id}`;
                const body: IDataObject = {};
                responseData = await genericRequest.call(this, 'GET', endpoint, body);
            }
        }
        if (resource === 'documentService') {
            if (operation === 'postFiles') {
                const endpoint = `/ws/files/upload`;
                const body: IDataObject = {};
                responseData = await genericRequest.call(this, 'POST', endpoint, body);
            }
        }
        if (resource === 'documentService') {
            if (operation === 'getListAttId') {
                const domain = this.getNodeParameter('domain', 0, undefined, {extractValue: true}) as string;
                const id = this.getNodeParameter('id', 0) as string;
                const endpoint = `/ws/dms/attachments/${domain}/${id}`;
                const body: IDataObject = {};
                responseData = await genericRequest.call(this, 'GET', endpoint, body);
            }
        }
        if (resource === 'documentService') {
            if (operation === 'putAtt') {
                const domain = this.getNodeParameter('domain', 0, undefined, {extractValue: true}) as string;
                const id = this.getNodeParameter('id', 0) as string;
                const endpoint = `/ws/dms/attachments/${domain}/${id}`;
                const data = this.getNodeParameter('content', 0) as string;
                const body: IDataObject = JSON.parse(data);
                responseData = await genericRequest.call(this, 'PUT', endpoint, body);
            }
        }
        if (resource === 'documentService') {
            if (operation === 'deleteAtt') {
                const domain = `com.axelor.dms.db.DMSFile`;
                const id = this.getNodeParameter('id', 0) as string;
                const endpoint = `/ws/dms/attachments/${domain}/${id}`;
                const body: IDataObject = {};
                responseData = await genericRequest.call(this, 'GET', endpoint, body);
            }
        }

        return [this.helpers.returnJsonArray(responseData)];
    }
}