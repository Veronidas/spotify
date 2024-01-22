import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]',
})
export class ImgBrokenDirective {
  @Input() customImg:string | boolean = false
  @HostListener('error') handleError():void {
    const elNative = this.elHost.nativeElement;
    console.log('🔴 Esta imagen revento ----->', this.elHost)

    if(this.customImg) {
      elNative.src = this.customImg;
    }else{
      elNative.src = '../../../assets/images/404.avif'
    }
  }

  constructor(private elHost: ElementRef) {
   }

}
