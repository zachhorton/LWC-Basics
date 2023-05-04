import { LightningElement } from 'lwc';
import searchForAccounts from '@salesforce/apex/HomePageTaskLookup.searchForAccounts';

export default class HomePageTaskLookup extends LightningElement {

    accountId;
    hideNewButton = true;
    taskFields = 'Id, WhatId, WhoId, Subject, ActivityDate, Status, OwnerId, Owner.Name';
    taskColumns = [
        { label: 'Subject', fieldName: 'LinkName', type: 'url', typeAttributes: {label: { fieldName: 'Subject' }, target: '_top'}, wrapText: true},
        { label: 'Due Date', fieldName: 'ActivityDate', type:'date', wrapText: true, typeAttributes: {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }},
          { label: 'Status', fieldName: 'Status', type: 'text'},
          { label: 'Assigned To', fieldName: 'LinkName', type: 'text', typeAttributes: {label: { fieldName: 'Owner_Name' }, target: '_'}, wrapText: true}
    ];

    accountSearch(event) {
		const target = event.target;
		let params = event.detail;
        // params['objectType'] = 'Service';
        searchForAccounts(params)
			.then(results => {
				target.setSearchResults(results);
			})
			.catch(error => {
				// TODO: handle error
				console.log('error while searching for accounts: '+error);
			});
	}

    handleAccountChange(event) { // This runs any time an Account is selected OR when it is removed
		const result = event.target.getSelection()[0];
		if (result) {
			this.accountId = result.id;
		} else { // if no response or code removed
			console.log('no response or account removed');
			this.accountId = null;
		}
	}

}