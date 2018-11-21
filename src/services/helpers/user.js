import { resourceDetailReadRequest } from 'sly/store/resource/actions';
import { entitiesReceive } from 'sly/store/actions';

// TODO: FIXME: Temp solution to set the entity and resource of user me to null as the response is not jsonapi
export const fetchUser = dispatch => dispatch(resourceDetailReadRequest('user', 'me')).catch(() => dispatch(entitiesReceive({ user: { me: null } })));
