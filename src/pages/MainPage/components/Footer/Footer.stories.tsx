// import React from 'react';
// import {BrowserRouter} from 'react-router-dom';
// import {ThemeProvider} from '@gravity-ui/uikit';
// import type {Meta, StoryObj} from '@storybook/react';
// import {ModalNewUser} from './index';

// const meta = {
//   title: 'Components/ModalNewUser',
//   component: ModalNewUser,
//   parameters: {
//     // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
//     layout: 'centered',
//   },
//   decorators: [
//     (Story) => (
//       <ThemeProvider theme="light">
//         <BrowserRouter>
//           <Story />
//         </BrowserRouter>
//       </ThemeProvider>
//     ),
//   ],
// } satisfies Meta<typeof ModalNewUser>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// export const Default: Story = {
//   args: {
//     showModal: true,
//     closeModal: () => { }
//   }
// };