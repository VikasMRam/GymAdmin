// https://github.com/diegohaz/arc/wiki/Reducers
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#resource
import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import { initialState,getUserModel} from './selectors'
import {
  USER_CONVERSION_FAILURE,
  USER_CONVERSION_REQUEST,
  USER_CONVERSION_SUCCESS,

} from './actions'


export default (state = initialState, { type, payload = {} }) =>  {

  switch (type) {
    case USER_CONVERSION_SUCCESS:
      console.log('***----Saw type---****',type,'Payload',payload,'State',state);
      //Update the user details part

      return {
        ...state,
        userDetail:state.payload.data
      }
    case USER_CONVERSION_FAILURE:

        return {
          ...state,
          payload
        }


    case USER_CONVERSION_REQUEST:

      return {
          ...state,
          payload,

      }

    default:
      return state
  }
}
