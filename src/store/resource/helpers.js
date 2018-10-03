export const getThunkName = (resource, action) => {
  switch (action) {
    case 'create':
      return `${resource}Create`;
    case 'listRead':
      return `${resource}ListRead`;
    case 'detailRead':
      return `${resource}DetailRead`;
    case 'update':
      return `${resource}Update`;
    case 'delete':
      return `${resource}Delete`;
    default:
      throw new Error(`Unknown action: ${action}`);
  }
};
