import {
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class AxelorApi implements ICredentialType {
    name = 'axelorApi';
    displayName = 'Axelor API';
    documentationUrl = 'https://docs.axelor.com/adk/6.1/dev-guide/web-services/index.html';
    properties: INodeProperties[] = [
        {
            displayName: 'Username',
            name: 'username',
            type: 'string',
            default: 'demoerp',
        },
        {
            displayName: 'Password',
            name: 'password',
            type: 'string',
            typeOptions: { password: true },
            default: 'demoerp',
        },
        {
            displayName: 'URL',
            name: 'url',
            type: 'string',
            default: 'https://demo.axelor.com/open-suite-fr',
        },
    ];
}
