import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MenuItems } from './core/menu/menu-items/menu-items';
import { PageTitleService } from './core/page-title/page-title.service';
import { LocalCommunicationService } from './service/local-communication.service'
import { SpinnerService } from './service/spinner.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

declare var require: any;
const screenfull = require('screenfull');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] ,
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  
  private _router: Subscription;
  private _mediaSubscription: Subscription;

  @ViewChild('sidenav') sidenav;
  
  isUser = false;
  header: string;
  isFullscreen: boolean = false;
  collapseSidebar: boolean;
  chatSidebar: boolean = false;
  sidebarClosed: boolean = false;
  _opened: boolean = true;
  _mode: string = "push";
  showLoader: boolean;

  constructor(public menuItems: MenuItems,
    private pageTitleService: PageTitleService,
    private _spinnerService: SpinnerService,
    private _localCommunicationService: LocalCommunicationService,
    private router: Router
    ) {
  }

  ngOnInit() {
    this.pageTitleService.title.subscribe((val: string) => {
        this.header = val;
    });
    this._spinnerService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });

    this._localCommunicationService.user.subscribe(message => {
      if(!message || message == {}){
        this.isUser = false;
        this.router.navigateByUrl('login');
      } else{
        this.isUser = true;
        this.router.navigateByUrl('home');
      }
    })
  }

  ngOnDestroy() {
    this._router.unsubscribe();
    this._mediaSubscription.unsubscribe();
  }

  _toggleOpened(): void {
    this._opened = !this._opened;
  }

  sidebarClosedFunction(){
    this.sidebarClosed = !this.sidebarClosed;
  }

  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }

  menuMouseOver(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
        this._mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
        this._mode = 'push';
    }
  }

  chatSidebarFunction(){
    this.chatSidebar = !this.chatSidebar;
  }

  onActivate(e, scrollContainer) {
      scrollContainer.scrollTop = 0;
  }
}