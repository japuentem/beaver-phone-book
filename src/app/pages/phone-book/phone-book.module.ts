import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneBookPageRoutingModule } from './phone-book-routing.module';

import { PhoneBookPage } from './phone-book.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PhoneBookPageRoutingModule],
  declarations: [PhoneBookPage],
})
export class PhoneBookPageModule {}
