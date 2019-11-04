import { get, patch, post, destroy } from './httpMethods';

// method names should start with `get`, `create`, `update`, `delete`
// patch is prefered over put as per specification
export default {
  getUser: { method: get, path: '/platform/users/:id' },
  updateUser: { method: patch, path: '/platform/users/:id' },
  updateContact: { method: patch, path: '/platforms/contacts/:id' },

  getUsers: { method: get, path: '/platform/users' },

  getUuidActions: { method: get, path: '/platform/uuid-actions' },
  createUuidAction: { method: post, path: '/platform/uuid-actions' },

  getUuidAux: { method: get, path: '/platform/uuid-auxes/:id' },
  updateUuidAux: { method: patch, path: '/platform/uuid-auxes/:id' },
  createUuidAux: { method: post, path: '/platform/uuid-auxes' },

  createUserShare: { method: post, path: '/platform/user-shares' },

  getUserSaves: { method: get, path: '/marketplace/user-saves' },
  getUserSave: { method: get, path: '/marketplace/user-saves/:id' },
  updateUserSave: { method: patch, path: '/marketplace/user-saves/:id' },
  createUserSave: { method: post, path: '/marketplace/user-saves' },
  updateOldUserSave: { method: patch, path: '/platform/user-saves/:id' },
  createOldUserSave: { method: post, path: '/platform/user-saves' },

  registerUser: { method: post, path: '/platform/auth/register' },
  loginUser: { method: post, path: '/platform/auth/login' },
  logoutUser: { method: destroy, path: '/platform/auth/logout' },
  thirdPartyLogin: { method: post, path: '/platform/auth/third-party' },
  setPassword: { method: post, path: '/platform/auth/password' },
  updatePassword: { method: post, path: '/platform/auth/password/update' },
  recoverPassword: { method: post, path: '/platform/auth/recover' },

  getCommunity: { method: get, path: '/marketplace/communities/:id' },
  getCommunities: { method: get, path: '/marketplace/communities' },

  getAgent: { method: get, path: '/marketplace/agents/:id' },
  getAgents: { method: get, path: '/marketplace/agents' },

  getSearchResources: { method: get, path: '/platform/search-resources' },
  getGeoGuides: { method: get, path: '/platform/geo-guides' },

  createQuestion: { method: post, path: '/platform/questions' },
  createRating: { method: post, path: '/platform/ratings' },
  createAnswer: { method: post, path: '/platform/answers' },

  getClients: { method: get, path: '/marketplace/clients' },
  getClient: { method: get, path: '/marketplace/clients/:id' },
  updateClient: { method: patch, path: '/marketplace/clients/:id' },
  createClient: { method: post, path: '/marketplace/clients' },

  createNote: { method: post, path: '/marketplace/notes' },
  getNotes: { method: get, path: '/marketplace/notes' },
  updateNote: { method: patch, path: '/marketplace/notes/:id' },

  getConversations: { method: get, path: '/platform/conversations' },
  createConversation: { method: post, path: '/platform/conversations' },
  getConversation: { method: get, path: '/platform/conversations/:id' },
  updateConversation: { method: patch, path: '/platform/conversations/:id' },

  getConversationMessages: { method: get, path: '/platform/conversation-messages' },
  createConversationMessage: { method: post, path: '/platform/conversation-messages' },
  updateConversationMessage: { method: patch, path: '/platform/conversation-messages/:id' },

  getConversationParticipants: { method: get, path: '/platform/conversation-participants' },
  createConversationParticipant: { method: post, path: '/platform/conversation-participants' },
  updateConversationParticipant: { method: patch, path: '/platform/conversation-participants/:id' },

  getVoiceCalls: { method: get, path: '/platform/communications/voice' },
  getVoiceCall: { method: get, path: '/platform/communications/voice/:id' },

  getTasks: { method: get, path: '/platform/tasks' },
  createTask: { method: post, path: '/platform/tasks' },
  updateTask: { method: patch, path: '/platform/tasks/:id' },

  createContact: { method: post, path: '/platform/contacts' },

  getDatatable: { method: get, path: '/meta-data/datatables/:id' },
};
