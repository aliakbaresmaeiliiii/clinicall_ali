import {
  Component,
  Inject,
  PLATFORM_ID,
  input,
  output
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Config } from '../../models/config';
import { KeysPipe } from '../../pipes/keys.pipe';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-otp-input',
    templateUrl: './otp-input.component.html',
    styleUrl: './otp-input.component.scss',
    standalone: false
})
export class OtpInputComponent {
  readonly config = input<Config>({ length: 4 });
  // tslint:disable-next-line: no-output-on-prefix
  readonly onInputChange = output<string>();
  readonly onCountDown = output<any>();
  otpForm!: any;
  inputControls: FormControl[] = new Array(this.config().length);
  componentKey =
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36);
  inputType!: string;
  isTimeDone: boolean = false;
 

  constructor(
    private keysPipe: KeysPipe,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {
    this.otpForm = new FormGroup({});
    for (let index = 0; index < this.config().length; index++) {
      this.otpForm.addControl(this.getControlName(index), new FormControl());
    }
    this.inputType = this.getInputType();
  }
  ngAfterViewInit(): void {
    // if (isPlatformBrowser(this.platformId)) {
    //   if (!this.config.disableAutoFocus && document) {
    //     const containerItem = document?.getElementById(
    //       `c_${this.componentKey}`
    //     );
    //     if (containerItem) {
    //       containerItem.addEventListener('paste', (evt) =>
    //         // this.handlePaste(evt)
    //       // );
    //       const ele: any = containerItem.getElementsByClassName('otp-input')[0];
    //       if (ele && ele.focus) {
    //         ele.focus();
    //       }
    //     }
    //   }
    // }
  }
  private getControlName(idx: any) {
    return `ctrl_${idx}`;
  }

  ifLeftArrow(event: any) {
    return this.ifKeyCode(event, 37);
  }

  ifRightArrow(event: any) {
    return this.ifKeyCode(event, 39);
  }

  ifBackspaceOrDelete(event: any) {
    return (
      event.key === 'Backspace' ||
      event.key === 'Delete' ||
      this.ifKeyCode(event, 8) ||
      this.ifKeyCode(event, 46)
    );
  }

  ifKeyCode(event: any, targetCode: any) {
    const key = event.keyCode || event.charCode;
    // tslint:disable-next-line: triple-equals
    return key == targetCode ? true : false;
  }
  onKeyDown($event: any): any {
    var isSpace = this.ifKeyCode($event, 32);
    if (isSpace) {
      // prevent space
      return false;
    }
  }

  onKeyUp($event: any, inputIdx: any) {
    const nextInputId = this.appendKey(`otp_${inputIdx + 1}`);
    const prevInputId = this.appendKey(`otp_${inputIdx - 1}`);
    if (this.ifRightArrow($event)) {
      this.setSelected(nextInputId);
      return;
    }
    if (this.ifLeftArrow($event)) {
      this.setSelected(prevInputId);
      return;
    }
    const isBackspace = this.ifBackspaceOrDelete($event);
    if (isBackspace && !$event.target.value) {
      this.setSelected(prevInputId);
      this.rebuildValue();
      return;
    }
    if (!$event.target.value) {
      return;
    }
    if (this.ifValidEntry($event)) {
      this.setSelected(nextInputId);
    }
    this.rebuildValue();
  }

  appendKey(id: any) {
    return `${id}_${this.componentKey}`;
  }

  setSelected(eleId: any) {
    this.focusTo(eleId);
    const ele: any = document.getElementById(eleId);
    if (ele && ele.setSelectionRange) {
      setTimeout(() => {
        ele.setSelectionRange(0, 1);
      }, 0);
    }
  }

  ifValidEntry(event: any) {
    const inp = String.fromCharCode(event.keyCode);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const config = this.config();
    return (
      isMobile ||
      /[a-zA-Z0-9-_]/.test(inp) ||
      (config.allowKeyCodes &&
        config.allowKeyCodes.includes(event.keyCode)) ||
      (event.keyCode >= 96 && event.keyCode <= 105)
    );
  }

  focusTo(eleId: any) {
    const ele: any = document.getElementById(eleId);
    if (ele) {
      ele.focus();
    }
  }

  // method to set component value
  setValue(value: any) {
    const config = this.config();
    if (config.allowNumbersOnly && isNaN(value)) {
      return;
    }
    this.otpForm.reset();
    if (!value) {
      this.rebuildValue();
      return;
    }
    value = value.toString().replace(/\s/g, ''); // remove whitespace
    Array.from(value).forEach((c, idx) => {
      if (this.otpForm.get(this.getControlName(idx))) {
        this.otpForm.get(this.getControlName(idx))?.setValue(c);
      }
    });
    if (!config.disableAutoFocus) {
      const containerItem = document.getElementById(`c_${this.componentKey}`);
      var indexOfElementToFocus =
        value.length < config.length
          ? value.length
          : config.length - 1;
      let ele: any =
        containerItem?.getElementsByClassName('otp-input')[
          indexOfElementToFocus
        ];
      if (ele && ele.focus) {
        ele.focus();
      }
    }
    this.rebuildValue();
  }

  rebuildValue() {
    let val = '';
    this.keysPipe.transform(this.otpForm.controls).forEach((k) => {
      if (this.otpForm.controls[k].value) {
        val += this.otpForm.controls[k].value;
      }
    });
    this.onInputChange.emit(val);
  }
  getInputType(): string {
    const config = this.config();
    return config.isPasswordInput
      ? 'password'
      : config.allowNumbersOnly
      ? 'tel'
      : 'text';
  }
  // handlePaste(e: any) {
  //   // Get pasted data via clipboard API
  //   let clipboardData = e.clipboardData || (window as any['clipboardData']);
  //   if (clipboardData) {
  //     var pastedData = clipboardData.getData('Text');
  //   }
  //   // Stop data actually being pasted into div
  //   e.stopPropagation();
  //   e.preventDefault();
  //   if (!pastedData) {
  //     return;
  //   }
  //   this.setValue(pastedData);
  // }

  onCount(e: any) {
    if (e.action === 'done') this.isTimeDone = true;
  }
  resendCode(e:Event){
    this.onCountDown.emit(e)
    // this.
  }
}
