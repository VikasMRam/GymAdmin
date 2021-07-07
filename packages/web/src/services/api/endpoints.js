import { uuidActionEvent } from 'sly/web/services/events';

import { get, patch, put, post, destroy } from './httpMethods';

import { cmsUrl } from 'sly/web/config';

// method names should start with `get`, `create`, `update`, `delete`
// patch is prefered over put as per specification
export default {
  getUser: { method: get, path: '/platform/users/:id', ssrIgnore: true },
  updateUser: { method: patch, path: '/platform/users/:id' },

  getUsers: { method: get, path: '/platform/users' },

  getUuidActions: { method: get, path: '/platform/uuid-actions', ssrIgnore: true },
  createUuidAction: { method: post, path: '/platform/uuid-actions', intercept: uuidActionEvent },

  getUuidAux: { method: get, path: '/platform/uuid-auxes/:id', ssrIgnore: true },
  updateUuidAux: { method: patch, path: '/platform/uuid-auxes/:id' },
  createUuidAux: { method: post, path: '/platform/uuid-auxes' },

  createUserShare: { method: post, path: '/platform/user-shares', jsonApi: false },

  getUserSaves: { method: get, path: '/marketplace/user-saves', ssrIgnore: true },
  getUserSave: { method: get, path: '/marketplace/user-saves/:id', ssrIgnore: true },
  updateUserSave: { method: patch, path: '/marketplace/user-saves/:id' },
  createUserSave: { method: post, path: '/marketplace/user-saves' },
  updateOldUserSave: { method: patch, path: '/platform/user-saves/:id', jsonApi: false },
  createOldUserSave: { method: post, path: '/platform/user-saves', jsonApi: false },
  getHomeBase: { method: get, path: '/marketplace/home/:id', ssrIgnore: true },

  registerUser: { method: post, path: '/platform/auth/register' },
  loginUser: { method: post, path: '/platform/auth/login' },
  logoutUser: { method: destroy, path: '/platform/auth/logout' },
  thirdPartyLogin: { method: post, path: '/platform/auth/third-party' },
  setPassword: { method: post, path: '/platform/auth/password' },
  updatePassword: { method: post, path: '/platform/auth/password/update' },
  recoverPassword: { method: post, path: '/platform/auth/recover' },
  resetPassword: { method: post, path: '/platform/auth/recover/end' },
  otpLoginUser: { method: post, path: '/platform/auth/otp/login' },
  resendOtpCode: { method: post, path: '/platform/auth/otp/retry' },
  sendOtpCode: { method: post, path: '/platform/auth/otp/start' },

  getCommunity: { method: get, path: '/marketplace/communities/:id' },
  claimCommunity: { method: get, path: '/marketplace/communities/:id/claim' },
  getCommunities: { method: get, path: '/marketplace/communities' },
  updateCommunity: { method: patch, path: '/marketplace/communities/:id' },
  createCommunity: { method: post, path: '/marketplace/communities' },
  updateRgsAux: { method: patch, path: '/marketplace/rgsAux/:id' },
  approveEdit: { method: post, path: '/platform/suggested-edits/:id/approve' },
  rejectEdit: { method: post, path: '/platform/suggested-edits/:id/reject' },

  getListing: { method: get, path: '/marketplace/listings/:id' },
  getListings: { method: get, path: '/marketplace/listings' },
  updateListing: { method: patch, path: '/marketplace/listings/:id' },
  createListing: { method: post, path: '/marketplace/listings' },

  getImageCategories: { method: get, path: '/platform/image-categories' },

  createImage: { method: post, path: '/platform/images' },
  updateImage: { method: patch, path: '/platform/images/:id' },
  deleteImage: { method: destroy, path: '/platform/images/:id' },

  getAgent: { method: get, path: '/marketplace/agents/:id' },
  getAgents: { method: get, path: '/marketplace/agents' },
  updateAgent: { method: put, path: '/marketplace/agents/:id' },
  createAgent: { method: post, path: '/marketplace/agents' },

  getSearchPage: { method: get, path: '/marketplace/search/searchpage' },
  getCommunitySearch: { method: get, path: '/platform/community-search' },
  getSearchResources: { method: get, path: '/platform/search-resources' },
  getSearch: { method: get, path: '/marketplace/search' },
  getGeoGuides: { method: get, path: '/platform/geo-guides' },

  createQuestion: { method: post, path: '/platform/questions' },
  createRating: { method: post, path: '/platform/ratings' },
  createAnswer: { method: post, path: '/platform/answers' },
  updateContent: { method: put, path: '/platform/contents/:id' },
  updateRating: { method: put, path: '/platform/ratings/:id' },

  getClients: { method: get, path: '/marketplace/clients', ssrIgnore: true },
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

  getContacts: { method: get, path: '/platform/contacts' },
  createContact: { method: post, path: '/platform/contacts' },
  updateContact: { method: patch, path: '/platform/contacts/:id' },
  deleteContact: { method: destroy, path: '/platform/contacts/:id' },

  getDatatable: { method: get, path: '/meta-data/datatables/:id' },
  sendEbook: { method: post, path: '/platform/send-ebook' },

  getEmail: { method: get, path: '/platform/emails/:id' },

  createShareEmail: { method: post, path: '/platform/share-emails' },

  getAddresses: { method: get, path: '/platform/addresses' },

  getEvents: { method: get, path: '/platform/events' },
  getPerformers: { method: get, path: '/platform/performers' },
  getEmails: { method: get, path: '/platform/emails' },

  getResourceCenterMainInfo: { method: get, path: '/home-page', jsonApi: false, baseUrl: cmsUrl },
  getAuthor: { method: get, path: '/authors', jsonApi: false, baseUrl: cmsUrl },
  getArticle: { method: get, path: '/articles', jsonApi: false, baseUrl: cmsUrl },
  getArticlesCount: { method: get, path: '/articles/count', jsonApi: false, baseUrl: cmsUrl },
  getArticlesForSitemap: { method: get, path: '/articles/sitemap', jsonApi: false, baseUrl: cmsUrl },
  getTopic: { method: get, path: '/topics', jsonApi: false, baseUrl: cmsUrl },

  getHubPage: { method: get, path: '/senior-living-types', jsonApi: false, baseUrl: cmsUrl },
};
