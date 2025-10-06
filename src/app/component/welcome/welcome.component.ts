// welcome.component.ts
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
  ElementRef
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
// import { MatListModule } from '@angular/material/list'; // Added this for sidenav types
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [
    trigger('heroFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate('420ms ease-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
    trigger('heroSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(18px)' }),
        animate(
          '520ms 120ms cubic-bezier(.2,.9,.2,1)',
          style({ opacity: 1, transform: 'none' })
        ),
      ]),
    ]),
  ],
})

export class WelcomeComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav?: MatSidenav;

  isMobile$: Observable<boolean>;
  private subs = new Subscription();
  appVersion = '1.0.0';
  appName = 'ExpenseTracker'; // Added for use in logo
  currentYear = new Date().getFullYear();
  activeAuthView: 'none' | 'login' | 'signup' = 'none';
  isLogging = false;
  errorMessage = '';
  @ViewChild('authSection') authSectionRef!: ElementRef;
  features = [
    {
      id: 'f1',
      icon: 'account_balance_wallet',
      title: 'Quick Entry',
      description: 'Add expenses in seconds with smart suggestions and categorization.',
    },
    {
      id: 'f2',
      icon: 'bar_chart',
      title: 'Insights & Reporting',
      description: 'See where your money goes with simple, beautiful, and customizable charts.',
    },
    {
      id: 'f3',
      icon: 'shield',
      title: 'Privacy-First Design',
      description: 'Your financial data stays private and secure—never shared or sold.',
    },
  ];

  testimonials = [
    {
      name: 'Aisha R.',
      role: 'Freelancer',
      quote:
        'Simple, beautiful and effective — helps me stay on budget without the complexity.',
    },
    {
      name: 'Jon P.',
      role: 'Student',
      quote:
        'I reduced my monthly spending by visualising where it went. A game changer.',
    },
    { name: 'Maya S.', role: 'Developer', quote: 'Fast entry, lovely charts, and reliable cross-device sync.' },
  ];

  constructor(
    private breakpoint: BreakpointObserver,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    // Breakpoints for mobile and tablet to determine 'isMobile$'
    this.isMobile$ = this.breakpoint
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .pipe(map((result) => result.matches));
  }

  ngOnInit(): void {
    this.isLogging = true;
    this.preloadHeroIllustration();
  }

  ngAfterViewInit(): void {
    // Close sidenav if screen is resized from mobile to desktop while it's open
    const sub = this.isMobile$.subscribe((isMobile) => {
      if (!isMobile && this.sidenav?.opened) {
        this.sidenav.close();
      }
      this.cdr.markForCheck();
    });
    this.subs.add(sub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async onHome(): Promise<void> {
    try {
      await this.router.navigate(['/']);
    } catch (err) {
      this.handleError(err, 'Unable to navigate to Home');
    }
  }

  async onSignUp(): Promise<void> {
    this.activeAuthView = 'signup';
    this.scrollToAuthSection();
    this.toggleSidenav(false);
  }

  async onLogin(): Promise<void> {
    this.activeAuthView = 'login';
    this.scrollToAuthSection();
    this.toggleSidenav(false);
  }

  private scrollToAuthSection(): void {
    setTimeout(() => {
      try {
        const el = this.authSectionRef.nativeElement;
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.focus({ preventScroll: true });
      } catch (err) {
        console.error('Scroll failed', err);
      }
    }, 50);
  }

  toggleSidenav(shouldToggle?: boolean): void {
    try {
      if (shouldToggle === false) {
        this.sidenav?.close();
      } else {
        this.sidenav?.toggle();
      }
    } catch (err) {
      console.error('Sidenav toggle failed', err);
    }
  }

  onLearnMore(): void {
    try {
      const el = document.getElementById('features-heading');
      if (el) {
        // Use requestAnimationFrame to ensure the scroll happens after any potential view updates
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Ensure focus for keyboard users, preventing unwanted scroll on focus
          el.focus({ preventScroll: true });
        });
      }
    } catch (err) {
      console.error('Scroll failed', err);
    }
  }

  private preloadHeroIllustration(): void {
    try {
      const src = 'assets/illustrations/expense-hero.svg';
      // Use requestIdleCallback for background preloading on supporting browsers
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => {
          const img = new Image();
          img.src = src;
        });
      } else {
        // Fallback with setTimeout
        setTimeout(() => {
          const img = new Image();
          img.src = src;
        }, 2000);
      }
    } catch (err) {
      console.warn('Preload failed', err);
    }
  }

  private handleError(err: unknown, userMessage = 'An error occurred'): void {
    console.error(err);
    this.errorMessage = userMessage;
    // Clear the error message after 6 seconds
    setTimeout(() => (this.errorMessage = ''), 6000);
  }
}