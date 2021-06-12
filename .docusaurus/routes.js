
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';
export default [
{
  path: '/docs/',
  component: ComponentCreator('/docs/','a7a'),
  
  routes: [
{
  path: '/docs/introduction',
  component: ComponentCreator('/docs/introduction','85b'),
  exact: true,
},
]
},
{
  path: '*',
  component: ComponentCreator('*')
}
];
