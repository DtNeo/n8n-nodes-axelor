import { INodeProperties } from 'n8n-workflow';

export const restAndAdvancedServicesOperations: INodeProperties[] = [
	// ------------------------
	//      Rest And Advanced Services
	// ------------------------

	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['restAndAdvancedServices'],
			},
		},
		options: [
			{
				name: 'Action Service',
				value: 'actionService',
				description: 'POST /ws/action/',
				action: 'Action service a rest and advanced services',
			},
			{
				name: 'Advanced Delete',
				value: 'deleteAll',
				description: 'POST /ws/rest/:model/removeAll',
				action: 'Advanced delete a rest and advanced services',
			},
			{
				name: 'Advanced Read',
				value: 'postfetch',
				description: 'POST /ws/rest/:model/:ID/fetch',
				action: 'Advanced read a rest and advanced services',
			},
			{
				name: 'Advanced Search',
				value: 'postSearch',
				description: 'POST /ws/rest/:model/search',
				action: 'Advanced search a rest and advanced services',
			},
			{
				name: 'Create a Record',
				value: 'putOne',
				description: 'PUT /ws/rest/:model',
				action: 'Create a record a rest and advanced services',
			},
			{
				name: 'Delete a Record',
				value: 'deleteId',
				description: 'DELETE /ws/rest/:model/:ID',
				action: 'Delete a record a rest and advanced services',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'GET /ws/rest/:model',
				action: 'Find records a rest and advanced services',
			},
			{
				name: 'Read a Record',
				value: 'getId',
				description: 'GET /ws/rest/:model/:ID',
				action: 'Read a record a rest and advanced services',
			},
			{
				name: 'Update a Record',
				value: 'postId',
				description: 'POST /ws/rest/:model/:ID',
				action: 'Update a record a rest and advanced services',
			},
		],
		default: 'getAll',
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
				resource: ['restAndAdvancedServices'],
				operation: ['getAll','getId','putOne','postId','deleteId','postfetch','deleteAll','postSearch'],
			},
		},
	},

	// ------------------------
	//      ID Field
	// ------------------------
	{
		displayName: 'ID',
		name: 'id',
		type: 'number',
		required: true,
		typeOptions: {
			minValue: 0,
			numberStepSize: 1,
		},
		default: 1,
		description: 'This ID of the specific element you want. You can find it on URL.',
		displayOptions: {
			show: {
				resource: ['restAndAdvancedServices'],
				operation: ['getId','postId','deleteId','postfetch','getFileId','getListAttId'],
			},
		},
	},

	// ------------------------
	//      Query Field
	// ------------------------
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '?offset=0&limit=10',
		description: 'Add query to the request',
		displayOptions: {
			show: {
				resource: ['restAndAdvancedServices'],
				operation: ['getAll'],
			},
		},
	},

	// ------------------------
	//      DATA Fields
	// ------------------------
	{
		displayName: 'Content JSON',
		name: 'content',
		type: 'json',
		default: '',
		description:
			'This is the body request specify everything here. IN CASE OF ACTION SERVICE, DO NOT FORGET TO ADD THE MODEL DOMAIN IN THIS DATA FIELDS. AXELOR DOCUMENTATION DO NOT MENTION IT',
		displayOptions: {
			show: {
				resource: ['restAndAdvancedServices'],
				operation: ['putOne','postId','postfetch','deleteAll','postSearch','actionService'],
			},
		},
	},
];