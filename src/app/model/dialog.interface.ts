import { Observable } from 'rxjs';

export interface IDialog {
    onOk$ : Observable<any>;
    onCancel$: Observable<any>;
    data?:any;
}