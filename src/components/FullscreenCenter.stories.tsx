import React from 'react';
import { Meta, Story } from '@storybook/react';

import FullscreenCenter from './FullscreenCenter';

export default {
  title: 'Fullscreen Center',
  component: FullscreenCenter,
} as Meta;

export const Base: Story = () => <FullscreenCenter>Example centered</FullscreenCenter>;
