import { Component, OnInit, ViewChild } from '@angular/core';
import { VpnParamsComponent } from './components/vpn-params/vpn-params.component';
import { SmartersProParamsComponent } from './components/smarters-pro-params/smarters-pro-params.component';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrl: './parameters.component.scss'
})
export class ParametersComponent implements OnInit {

  params: any[] = ['VPN', 'Smarters PRO']
  sidePanelOpened:boolean = true;
  selectedParam:string = 'VPN';

  @ViewChild(VpnParamsComponent, { static: false }) vpnParamsComponent: VpnParamsComponent;
  @ViewChild(SmartersProParamsComponent, { static: false }) smartersProParamsComponent: SmartersProParamsComponent;


  constructor() {

  }

  ngOnInit(): void {

  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  changeTabTo(param:string){
    this.selectedParam = param;
  }

  handleSaveChanges() {
    // Your logic to handle save, e.g., save data or perform some action
    console.log('Save Changes clicked for', this.selectedParam);

    if (this.selectedParam === 'VPN' && this.vpnParamsComponent) {
      this.vpnParamsComponent.onSaveChanges(); // Call save method on the VPN component
    } else if (this.selectedParam === 'Smarters PRO' && this.smartersProParamsComponent) {
      // this.smartersProParamsComponent.saveChanges(); // Call save method on the Smarters PRO component
    }
  }

}
