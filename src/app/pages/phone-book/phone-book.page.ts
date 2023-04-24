import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ContactsService } from '../../services/contacts.service';
import { Router } from '@angular/router';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Platform } from '@ionic/angular';

declare global {
  interface Navigator {
    app: {
      exitApp: () => void;
    };
  }
}

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.page.html',
  styleUrls: ['./phone-book.page.scss'],
  providers: [CallNumber],
})
export class PhoneBookPage implements OnInit {
  newContact: any;
  filteredContacts: any[] = [];
  contactInfo: any[] = [];
  importingContacts = false;
  contactList: any[] = [];
  contact?: any;
  state = {
    callStatus: '',
  };

  constructor(
    private navCtrl: NavController,
    private contactsService: ContactsService,
    private router: Router,
    private callNumber: CallNumber,
    private platform: Platform
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.contactList = this.contactsService.getContacts();
    this.filteredContacts = this.contactList;
  }

  ionViewWillEnter() {
    this.contactList = this.contactsService.getContacts();
    this.filteredContacts = this.contactList;
  }

  addContact() {
    this.navCtrl.navigateForward('add-contact');
  }

  deleteContact(contact: any) {
    const index = this.filteredContacts.indexOf(contact);

    if (index !== -1) {
      this.contactsService.deleteContact(index);
      this.contactList.splice(index, 1);
    }
  }

  editContact(index: number) {
    const contact = this.contactsService.getContacts()[index];
    this.router.navigateByUrl(`/add-contact/${index}`, { state: contact });
  }

  async callContact(phoneNumber: string) {
    try {
      const res = await this.callNumber.callNumber(phoneNumber, true);
      console.log('Launched dialer!', res);
      console.log('Calling number ', phoneNumber);
      // Mostrar mensaje en la pantalla
      // alert('Llamada realizada exitosamente ' + res);
    } catch (err) {
      console.log('Error launching dialer', err);
      // Mostrar mensaje en la pantalla
      // alert('Error al realizar la llamada ' + err);
    }
  }

  filterContacts(event: any) {
    const searchTerm = event.detail.value?.toLowerCase() || ''; // Si event.detail.value es null, asigna una cadena vacía en su lugar
    this.filteredContacts = this.contactList.filter((contact) => {
      return (
        contact.firstName.toLowerCase().includes(searchTerm) ||
        contact.lastName.toLowerCase().includes(searchTerm) ||
        contact.phoneNumber.toLowerCase().includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm) ||
        contact.notes.toLowerCase().includes(searchTerm) ||
        contact.category.toLowerCase().includes(searchTerm)
      );
    });
  }

  initializeApp() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      navigator['app'].exitApp();
    });
  }
}
