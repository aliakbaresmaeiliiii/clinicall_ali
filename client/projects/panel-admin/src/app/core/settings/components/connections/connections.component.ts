import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AddNewConnectionComponent } from '../add-new-connection/add-new-connection.component';
@Component({
  selector: 'app-connections',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, AddNewConnectionComponent],
  templateUrl: './connections.component.html',
  styleUrl: './connections.component.scss',
})
export class ConnectionsComponent {}
