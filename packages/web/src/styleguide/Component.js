import React from 'react';

import Heading from 'sly/common/system/Heading';
import Paragraph from 'sly/common/system/Paragraph';

export const ComponentHeading = (props) => <Heading as="h3" pad="l" {...props} />
export const VariantHeading = (props) => <Heading as="h4" pad="xs" fontFamily="monospace" {...props} />
export const VariantParagraph = (props) => <Paragraph pad="l" {...props} />
