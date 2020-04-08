import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PageTitleService {
    public title: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public shortcutTools: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    setTitle(value: string) {
        this.title.next(value);
    }
    showTools(value: boolean){
      this.shortcutTools.next(value);
    }
}
