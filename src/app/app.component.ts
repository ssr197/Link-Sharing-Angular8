import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MenuItems } from './core/menu/menu-items/menu-items';
import { PageTitleService } from './core/page-title/page-title.service';
import { SpinnerService } from './service/spinner.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { AuthenticationService } from './_authServices';
import { User } from './_models';
import { Subscription } from 'rxjs/Subscription';
import { NavigationEnd, Router } from '@angular/router';

declare var require: any;
const screenfull = require('screenfull');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] ,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'PV Generic Form Parser';
  currentUser: User;
  private _router: Subscription;
    header: string;
    showshortcutTools: boolean = false;
    currentLang = 'en';
    url: string;
    showSettings = false;
    themeSkinColor: any = "light";
    dark: boolean;
    boxed: boolean;
    collapseSidebar: boolean;
    compactSidebar: boolean;
    customizerIn: boolean = false;
    chatWindowOpen: boolean = false;
    chatSidebar: boolean = false;
    sidebarClosed: boolean = false;
    showBodySpinner: boolean = false;
    root = 'ltr';
    chatpanelOpen: boolean = false;

    private _mediaSubscription: Subscription;
    sidenavOpen: boolean = true;
    sidenavMode: string = 'side';
    isMobile: boolean = false;
    private _routerEventsSubscription: Subscription;
    public innerWidth: any;
    @ViewChild('sidenav') sidenav;
    _opened: boolean = true;
    _mode: string = "push";
    _closeOnClickOutside: boolean = false;
    _showBackdrop: boolean = false;
    showLoader: boolean;
    public _toggleOpened(): void {
        this._opened = !this._opened;
     }

  constructor(public menuItems: MenuItems, private pageTitleService: PageTitleService, private _spinnerService: SpinnerService, public translate: TranslateService, private router: Router, private authenticationService: AuthenticationService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.pageTitleService.title.subscribe((val: string) => {
        this.header = val;
    });

    this.pageTitleService.shortcutTools.subscribe((val: boolean) => {
        this.showshortcutTools = val;
    });

    this._spinnerService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });

    this._routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.isMobile) {
        this.sidenav.close();
      }
    });

    // Add slideDown animation to dropdown
    $('.dropdown').on('show.bs.dropdown', function(e){
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown(500);
    });

    // Add slideUp animation to dropdown
    $('.dropdown').on('hide.bs.dropdown', function(e){
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp(500);
    });

    //Add class on focus of search box in header
    $('.search-form input').focus(function () {
        $(this).parent().addClass('search-active');
    }).blur(function () {
        $(this).parent().removeClass('search-active');
    });
  }


  ngOnDestroy() {
      this._router.unsubscribe();
      this._mediaSubscription.unsubscribe();
  }

  isFullscreen: boolean = false;

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

  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
      screenfull.on('change', () => {
        this.isFullscreen = screenfull.isFullscreen ? true : false;
      });
    }
  }

  customizerFunction() {
      this.customizerIn = !this.customizerIn;
  }
  chatWindowFunction() {
      this.chatWindowOpen = !this.chatWindowOpen;
  }

  chatSidebarFunction(){
      this.chatSidebar = !this.chatSidebar;
  }
  sidebarClosedFunction(){
      this.sidebarClosed = !this.sidebarClosed;
  }

  changeThemeColor(color){
      this.themeSkinColor = color;
  }

  addMenuItem(): void {
  }

  onActivate(e, scrollContainer) {
      scrollContainer.scrollTop = 0;
  }
}