import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UiService {
    public blocked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public block(): void {
        this.blocked.next(true);
    }

    public unBlock(): void {
        this.blocked.next(false);
    }
}