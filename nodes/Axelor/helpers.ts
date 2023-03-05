import {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions
} from 'n8n-core';

import {
	NodeApiError,
	NodeOperationError,
	IDataObject
} from 'n8n-workflow';

/**
 * Make an API request to Qonto
 *
 * @param {IHookFunctions} this
 * @param {string} method
 * @param {string} url
 * @param {object} body
 * @returns {Promise<any>}
 */

export async function axelorApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions): Promise<any> {

	const credentials = await this.getCredentials('axelorApi');

		if (credentials === undefined) {
			throw new NodeOperationError(this.getNode(), 'No credentials got returned!');
		}

		const options = {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: { 'username': `${credentials.username}`, 'password':`${credentials.password}`},
			uri: `${credentials.url}/login.jsp`,
			json: true,
			//@ts-ignore
			resolveWithFullResponse: true,
		};

		try { 
			return await this.helpers.request!(options);
		} catch (error) {
			throw new NodeApiError(this.getNode(), error);
		}
	}

export async function genericRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: string,
	endpoint: string,
	body: IDataObject = {}
) {

	const credentials = await this.getCredentials('axelorApi');
	const cookies = await axelorApiRequest.call(this);
	const cookieheader = cookies.headers['set-cookie'];

	const options = {
		headers: {'Content-Type': 'application/json', 'Cookie': `${cookieheader}` },
		method,
		body,
		uri: `${credentials.url}${endpoint}`,
		json: true,
	};

	try { 
		return await this.helpers.request!.call(this, options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}