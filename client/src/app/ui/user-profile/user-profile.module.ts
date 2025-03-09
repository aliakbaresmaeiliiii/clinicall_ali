import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { UserAppointmentsComponent } from './components/user-appointments/user-appointments.component';
import { UserChatPageComponent } from './components/user-chat-page/user-chat-page.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserTransactionsComponent } from './components/user-transactions/user-transactions.component';
import { UserWalletComponent } from './components/user-wallet/user-wallet.component';
import { ProfileLayoutComponent } from './components/profile-layout/profile-layout.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { UserFavoritesComponent } from './components/user-favorites/user-favorites.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfileLayoutComponent,

    children: [
      {
        path: '',
        redirectTo: 'user-information',
        pathMatch: 'full',
      },
      {
        path: 'user-information',
        component: ProfileComponent,
        title: 'information',
        data: { icon: 'info' },
      },
      {
        path: 'user-appointments',
        component: UserAppointmentsComponent,
        title: 'appointments',
        data: { icon: 'fact_check' },
      },
      {
        path: 'user-Favorites',
        component: UserFavoritesComponent,
        title: 'favorites',
        data: { icon: 'fact_check' },
      },

      {
        path: 'user-chat-page',
        component: UserChatPageComponent,
        title: 'chat-page',
        data: { icon: 'chat' },
      },
      {
        path: 'user-lsit',
        component: UserListComponent,
        title: 'list',
        data: { icon: 'chat' },
      },

      {
        path: 'user-orders',
        component: UserOrdersComponent,
        title: 'orders',
        data: { icon: 'order_approve' },
      },

      {
        path: 'user-transactions',
        component: UserTransactionsComponent,
        title: 'transactions',
        data: { icon: 'receipt_long' },
      },
      {
        path: 'user-wallet',
        component: UserWalletComponent,
        title: 'wallet',
        data: { icon: 'wallet' },
      },
    ],
  },
];

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileLayoutComponent,
    UserAppointmentsComponent,
    UserChatPageComponent,
    UserListComponent,
    UserOrdersComponent,
    UserTransactionsComponent,
    UserWalletComponent,
    UserFavoritesComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatDividerModule,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDatepickerModule,
    NgxIntlTelInputModule,
    MatSelectModule,
    MatButtonModule,
    SharedModule,
    MatIconModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserProfileModule {}
