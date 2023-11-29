import { Component, OnInit } from '@angular/core';
import { BoditrakService } from '../../core/boditrak/boditrak.service';
import { Device } from '../../core/boditrak/device.model';
import { TestManagementService } from '../../core/test-management/test-management.service';


@Component({
  selector: 'jhi-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent implements OnInit {
  deviceIP?: string;
  device?: Device;
  errorMessage?: string;

  private DEVICE_API = '/api/device';

  constructor(private boditrak: BoditrakService, private testManagementService: TestManagementService) {}

  ngOnInit(): void {
    if (this.testManagementService.deviceAddress) {
      this.deviceIP = this.testManagementService.deviceAddress;
    }
    this.loadDeviceInfo();
  }

  loadDeviceInfo(): void {
    this.device = undefined;
    if (this.deviceIP) {
      const url = 'http://' + this.deviceIP + this.DEVICE_API;
      this.boditrak.readDeviceInfo(url).subscribe(
        deviceInfo => {
          this.testManagementService.setAddress(this.deviceIP);
          this.device = deviceInfo;
          this.errorMessage = undefined;
        },
        () => {
          this.errorMessage = 'There was an error connecting to the device. Is this the right address?';
        }
      );
    }
  }

  onForgetDevice(): void {
    this.deviceIP = undefined;
    this.device = undefined;
    this.testManagementService.setAddress(this.deviceIP);
  }
}
