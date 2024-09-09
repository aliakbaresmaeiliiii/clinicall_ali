import {
  CreateEffectOptions,
  Directive,
  effect,
  ElementRef,
  inject,
  Input,
  OnInit,
  Renderer2,
  signal,
} from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true,
})
export class ScrollAnimationDirective implements OnInit {
  private isVisible = signal(false);
  private hasAnimated = signal(false);

  @Input() animationClass = 'animate-fadeInUp';
  @Input() rootMargin = '0px';
  @Input() threshold = 0.1;

  el = inject(ElementRef);
  renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      if (this.isVisible() && !this.hasAnimated()) {
        this.renderer.removeClass(this.el.nativeElement, 'hidden');
        this.renderer.addClass(this.el.nativeElement, this.animationClass);
        this.hasAnimated.set(true);
      }
    });
  }

  ngOnInit() {
    const observerOptions = {
      root: null,
      rootMargin: this.rootMargin,
      threshold: this.threshold
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated()) {
          this.isVisible.set(true); // Set visibility
          this.triggerAnimation(); // Trigger animation
        }
      });
    }, observerOptions);

    observer.observe(this.el.nativeElement);
  }

  triggerAnimation() {
    // Using the `allowSignalWrites` option to permit signal updates within the effect
    effect(() => {
      if (this.isVisible() && !this.hasAnimated()) {
        this.renderer.removeClass(this.el.nativeElement, 'opacity-0'); // Remove hidden class
        this.renderer.addClass(this.el.nativeElement, this.animationClass); // Add animation class
        this.hasAnimated.set(true); // Mark the element as animated
      }
    }, { allowSignalWrites: true } as CreateEffectOptions); // Enable signal writes inside effects
  }
}
