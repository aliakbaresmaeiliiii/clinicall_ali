import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  animations: [
    trigger('menuState', [
      state('closed', style({
        height: '0px',
        opacity: 0,
      })),
      state('open', style({
        height: '*',
        opacity: 1,
      })),
      transition('closed <=> open', [
        animate('600ms ease-in-out')
      ]),
    ]),
  ]
})
export class MenuComponent implements OnInit {
  isShowMenu = false;


  ngOnInit(): void {
    
    AOS.init();
  }

  toggleMenu(event:any) {
    event.preventDefault()
    this.isShowMenu = !this.isShowMenu;

  }
}
