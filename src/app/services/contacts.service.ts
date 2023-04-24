import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private contacts: any[] = [];

  constructor() {
    // Cargar los contactos del almacenamiento local al iniciar el servicio
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.contacts = JSON.parse(storedContacts);
    }
  }

  saveContact(contact: any) {
    this.contacts.push(contact);
    // Almacenar los contactos en el almacenamiento local
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  getContacts() {
    // Devolver los contactos almacenados en el almacenamiento local
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      return JSON.parse(storedContacts);
    } else {
      return [];
    }
  }

  editContact(index: number, newContact: any) {
    this.contacts[index] = newContact;
    // Almacenar los contactos actualizados en el almacenamiento local
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  deleteContact(index: number) {
    this.contacts.splice(index, 1);
    // Almacenar los contactos actualizados en el almacenamiento local
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }
}
