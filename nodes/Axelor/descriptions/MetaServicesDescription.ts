import {
	INodeProperties,
} from 'n8n-workflow';

export const metaServicesOperations: INodeProperties[] = [

// ------------------------
//      Meta Services
// ------------------------

	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'metaServices',
				],
			},
		},
		options: [
          {
            name: 'Get Models',
            value: 'getModels',
            description: 'GET /ws/meta/models',
												action: 'Get models a meta services',
          },
          {
            name: 'Get Model Properties',
            value: 'getModelsProperties',
            description: 'GET /ws/meta/fields/com.axelor.contact.db.Contact',
												action: 'Get model properties a meta services',
          }
		],
		default: 'getModels',
	},

// ------------------------
//      ResourceLocator Fields
// ------------------------
	{
		displayName: 'Domain Models',
		name: 'domain',
		type: 'resourceLocator',
		default: { mode: 'string', value: 'com.axelor.apps.sale.db.SaleOrder' },
		description: 'Select one domain model',
		modes: [
			{
				displayName: 'Domain URL',
				name: 'domainURL',
				type: 'string',
				hint: 'Enter the domain model you want - Should start by com.axelor...',
			},
			{
				displayName: 'Domain List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'searchDomain',
					searchable: false,
					searchFilterRequired: false
				},
			},
		],
		displayOptions: {
			show: {
				resource: [
					'metaServices'
				],
				operation: [
					'getModelsProperties'
				]
			}
		},
	}
];