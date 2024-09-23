import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  animations: [
    trigger('menuState', [
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
        })
      ),
      state(
        'open',
        style({
          height: '16rem',
          opacity: 1,
        })
      ),
      transition('closed <=> open', [animate('600ms ease-in-out')]),
    ]),
    trigger('subMenuState', [
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
        })
      ),
      state(
        'open',
        style({
          height: '8rem',
          opacity: 1,
        })
      ),
      transition('closed <=> open', [animate('600ms ease-in-out')]),
    ]),
  ],
})
export class MenuComponent implements OnInit {
  isShowMenu = false;
  menuOpen = false;
  openSubMenu = false;
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() theme!: 'primary' | 'critical';

  color: string = '#000011';

  panelOpenState!: boolean;

  ngOnInit(): void {
    AOS.init();
  }

  toggleMenu(event: any) {
    this.menuOpen = event.target.checked;
  }

  toggleSubMenu(event: any) {
    this.openSubMenu = !this.openSubMenu;
  }
}
