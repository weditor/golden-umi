import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      routes: [
        {
          path: '/font_rec/detail/:imageId/',
          component: 'font_recognize/imageDetail',
          //   exact: true,
        },
        {
          path: '/font_rec',
          component: '@/pages/font_recognize/index',
          exact: true,
        },
      ],
    },
  ],
  proxy: {
    '/font_api': {
      target: 'http://localhost:8001',
      changeOrigin: true,
      // 'pathRewrite': { '^/api': '' },
    },
  },
});
