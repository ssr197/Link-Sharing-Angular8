import { Component, OnInit, Input, Output } from '@angular/core';
import { ExchangeDataService } from '../../service/exchange-data.service';

@Component({
  selector: 'app-pvfgp-shortcut-tools',
  templateUrl: './pvfgp-shortcut-tools.component.html',
  styleUrls: ['./pvfgp-shortcut-tools.component.css']
})
export class PvfgpShortcutToolsComponent implements OnInit {
  @Input() shortcutTools: boolean;
  toolsJson: any;
  constructor(private _exchangeData : ExchangeDataService) { }

  ngOnInit() {
    this.toolsJson = this._exchangeData.getShortcutTools();
  }

  selectTool(idx) {
    this.toolsJson.forEach(ele =>{
      ele.active = false;
    })
    this.toolsJson[idx].active = true;
    this._exchangeData.setAnnotType(this.toolsJson[idx].value);
  }

}
