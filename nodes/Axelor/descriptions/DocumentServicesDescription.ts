import { INodeProperties } from 'n8n-workflow';

export const documentServicesOperations: INodeProperties[] = [
	// ------------------------
	//      FIRST STEP
	// ------------------------

	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['documentServices'],
			},
		},
		options: [
			{
				name: 'Add Attachment',
				value: 'putAtt',
				description: 'PUT /ws/dms/attachments/com.axelor.sale.db.Order/1',
				action: 'Add attachment a document services',
			},
			{
				name: 'Delete Attachment',
				value: 'deleteAtt',
				description: 'Just perform delete request on com.axelor.dms.db.DMSFile to delete the attachment represented by the file',
				action: 'Delete attachment a document services',
			},
			{
				name: 'File Download',
				value: 'getFileId',
				description: 'GET /ws/dms/download/:ID',
				action: 'File download a document services',
			},
			{
				name: 'File Listing',
				value: 'getFiles',
				description: 'GET /ws/dms/files?parent=ID&pattern=matching',
				action: 'File listing a document services',
			},
			{
				name: 'File Upload',
				value: 'postFiles',
				description: 'POST /ws/files/upload',
				action: 'File upload a document services',
			},
			{
				name: 'List Attachments',
				value: 'getListAttId',
				description: 'GET /ws/dms/attachments/:model/:ID',
				action: 'List attachments a document services',
			},
		],
		default: 'putAtt',
	},
	// ------------------------
	//      WARNING Field
	// ------------------------
	{
		displayName: 'Work in progress in this part of node. Please do not break everything.',
		name: 'notice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['documentServices'],
				operation: ['getFiles', 'getFileId', 'postFiles', 'getListAttId', 'putAtt', 'deleteAtt'],
			},
		},
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
				hint: 'Enter the domain model you want',
				validation: [
					{
						type: 'regex',
						properties: {
							regex: `^com.*`,
							errorMessage: 'Invalid Domain should start by com.axelor...',
						},
					},
				],
			},
			{
				displayName: 'Domain List',
				name: 'domainlist',
				type: 'list',
				typeOptions: {
					searchListMethod: 'searchDomain',
					searchable: true,
					searchFilterRequired: false,
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['documentServices'],
				operation: ['getFiles', 'getFileId', 'postFiles', 'getListAttId', 'putAtt'],
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
				resource: ['documentServices'],
				operation: ['getFileId', 'getListAttId', 'deleteAtt'],
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
		default: '?parent=id&pattern=matching',
		description: 'Add query to the request',
		displayOptions: {
			show: {
				resource: ['documentServices'],
				operation: ['getFileId'],
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
		description: 'This is the body request specify everything here',
		displayOptions: {
			show: {
				resource: ['documentServices'],
				operation: [
					'putOne',
					'postId',
					'postfetch',
					'deleteAll',
					'postSearch',
					'actionService',
					'getFiles',
					'getFileId',
					'postFiles',
					'getListAttId',
					'putAtt',
				],
			},
		},
	},
];