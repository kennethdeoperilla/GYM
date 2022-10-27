import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(public msgService: MessageService) { }

    showErrorToast(header: string, message: string) {
        this.msgService.add({ key: 'tst', severity: 'error', summary: header, detail: message });
    }

    showInfoToast(header: string, message: string) {
        this.msgService.add({ key: 'tst', severity: 'info', summary: header, detail: message });
    }

    showSuccessToast(header: string, message: string) {
        this.msgService.add({ key: 'tst', severity: 'success', summary: header, detail: message });
    }

    showWarnToast(header: string, message: string) {
        this.msgService.add({ key: 'tst', severity: 'warn', summary: header, detail: message });
    }
}