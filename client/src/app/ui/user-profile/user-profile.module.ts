import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SharedModule } from '../../shared/shared.module';
import { ProfileLayoutComponent } from './components/profile-layout/profile-layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserAppointmentsComponent } from './components/user-appointments/user-appointments.component';
import { UserChatPageComponent } from './components/user-chat-page/user-chat-page.component';
import { UserFavoritesComponent } from './components/user-favorites/user-favorites.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserTransactionsComponent } from './components/user-transactions/user-transactions.component';
import { UserWalletComponent } from './components/user-wallet/user-wallet.component';
import { CommonModule } from '@angular/common';

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
    RouterModule.forChild(routes),
    NgxIntlTelInputModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserProfileModule {}
