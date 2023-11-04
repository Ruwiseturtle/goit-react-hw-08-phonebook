import { createSelector } from "@reduxjs/toolkit"; 

const selectContactsStore = state => state.contactsStore;

export const selectContacts = createSelector(
    selectContactsStore,
    contactsStore => contactsStore.items
);

export const selectContactIsLoading = createSelector(
  selectContactsStore,
  contactsStore => contactsStore.isLoading
);

export const selectContactError = createSelector(
  selectContactsStore,
  contactsStore => contactsStore.error
);

export const selectContactFilter = createSelector(
  selectContactsStore,
  contactsStore => contactsStore.filter
);