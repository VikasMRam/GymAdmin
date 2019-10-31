/* eslint-disable no-underscore-dangle */

import partiallyHydrateClient from 'sly/partiallyHydrateClient';
import ModalContainer from 'sly/containers/ModalContainer';
import HeaderContainer from 'sly/containers/HeaderContainer';
import CommunityMediaGalleryContainer from 'sly/containers/CommunityMediaGalleryContainer';

const root = document.getElementById('app');

partiallyHydrateClient([ModalContainer, HeaderContainer, CommunityMediaGalleryContainer], root);
