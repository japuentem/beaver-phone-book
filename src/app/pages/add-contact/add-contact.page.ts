import { Component, OnInit } from '@angular/core';

import { ContactsService } from '../../services/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  email: string = '';
  notes: string = '';
  category: string = '';

  contacts: any[] = [];

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}

  ngOnInit() {
    const state = history.state;
    if (state) {
      this.firstName = state.firstName;
      this.lastName = state.lastName;
      this.phoneNumber = state.phoneNumber;
      this.email = state.email;
      this.notes = state.notes;
      this.category = state.category;
    }
  }

  saveContact() {
    const contact = {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      notes: this.notes,
      category: this.category,
    };

    const contacts = this.contactsService.getContacts();
    const index = contacts.findIndex(
      (c: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        notes: string;
      }) =>
        c.firstName === contact.firstName ||
        c.lastName === contact.lastName ||
        c.phoneNumber === contact.phoneNumber ||
        c.email === contact.email ||
        c.notes === contact.notes
    );

    if (index !== -1) {
      // Actualizar contacto existente
      const existingContact = contacts[index];
      existingContact.firstName = contact.firstName;
      existingContact.lastName = contact.lastName;
      existingContact.phoneNumber = contact.phoneNumber;
      existingContact.email = contact.email;
      existingContact.notes = contact.notes;
      existingContact.category = contact.category;

      this.contactsService.editContact(index, existingContact);
      console.log('Contact updated');
    } else {
      // Guardar nuevo contacto
      this.contactsService.saveContact(contact);
      console.log('Contact saved');
    }

    // Limpiar campos
    this.firstName = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.email = '';
    this.notes = '';
    this.category = '';
    console.log('Clean fields');

    // Navegar a la página phonebook
    this.router.navigate(['/phone-book']);
  }
}
