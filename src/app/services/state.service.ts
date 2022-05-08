
import { Injectable } from "@angular/core";
import { KeyObsValueReset, ObsValueReset, OStore, OStoreStart } from '@fireflysemantics/slice'
import { Observable } from "rxjs";

const START: OStoreStart = {
    theme: { value: 'dark-theme' }
}

interface ISTART extends KeyObsValueReset {
    theme: ObsValueReset
}

@Injectable({
    providedIn: "root"
})
export class StateService {
    constructor() { }
    public OS: OStore<ISTART> = new OStore(START)
    public selectedTheme$:Observable<string> = this.OS.S.theme.obs
}