export const newClient = {
  data: {
    id: null,
    type: 'Client',
    attributes: {
      stage: 'New',
      status: 'Active',
      clientInfo: {
        name: '',
        email: '',
        phoneNumber: '',
        referralSource: '',
        slyMessage: '',
      },
    },
    relationships: {
      uuidAux: {
        data: {
          id: null,
          type: 'UuidAux',
          attributes: {
            uuidInfo: {
              careInfo: {
                adls: null,
              },
              residentInfo: {
                fullName: '',
              },
              housingInfo: {
                lookingFor: '',
              },
              financialInfo: {
                maxMonthlyBudget: '',
              },
              locationInfo: {
                city: '',
                state: '',
              },
            },
          },
        },
      },
    },
  },
};

export const newUuidAux = {
  data: {
    id: null,
    type: 'UuidAux',
    attributes: {
      uuidInfo: {
        careInfo: {
          adls: null,
        },
        residentInfo: {
          fullName: '',
        },
        housingInfo: {
          lookingFor: '',
        },
        financialInfo: {
          maxMonthlyBudget: '',
        },
        locationInfo: {
          city: '',
          state: '',
        },
      },
    },
  },
};

export const newProvider = {
  data: {
    id: null,
    type: 'Provider',
    attributes: {
      entityType: 'Community',
    },
  },
};

export const newParentClient = {
  data: {
    id: null,
    type: 'Client',
    attributes: {},
  },
};

export const newContact = {
  data: {
    id: null,
    type: 'Contact',
    attributes: {},
    relationships: {
      entities: {
        data: [],
      },
    },
  },
};

export const newSlyEntity = {
  data: {
    type: 'SlyEntity',
    id: '',
    attributes: {
      entityType: 'Property',
    },
  },
};
