export type EntityType = 'LLC' | 'S-CORP' | 'C-CORP';
export type ExpediteOption = 'YES' | 'NO';

export interface Owner {
  fullName: string;
  address: string;
  phone: string;
  email: string;
  responsibleParty?: boolean;
  ssn?: string;
  dob?: string;
}

export interface Signature {
  signHere: string;
  date: string;
}

export interface BusinessFormation {
  entityInformation: {
    entityName: string;
    entityAddress: string;
    serviceProductOffered: string;
    entityType: EntityType;
  };
  processingOptions: {
    expedite: ExpediteOption;
  };
  ownerInformation: {
    owner1: Owner & { responsibleParty: boolean; ssn: string; dob: string };
    owner2?: Owner;
    owner3?: Owner;
  };
  preparerInformation: {
    preparerName: string;
    firmName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  attestation: {
    statement: string;
    signatures: Signature[];
  };
}
