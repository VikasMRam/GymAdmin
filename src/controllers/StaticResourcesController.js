import withServerState from 'sly/store/withServerState';
import { resourceDetailReadRequest } from 'sly/store/resource/actions';
import { logWarn } from 'sly/services/helpers/logging';

const mapPropsToActions = () => ({
  user: resourceDetailReadRequest('user', 'me'),
});

const handleResponses = ({ user }) => {
  user(null, (err) => {
    if (err.response.status === 401) {
      logWarn(err);
      return null;
    }
    return Promise.reject(err);
  });
};

export default withServerState(
  mapPropsToActions,
  handleResponses,
)(() => {
  return null;
});
