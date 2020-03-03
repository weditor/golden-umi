import { defineConfig } from 'umi';

export default defineConfig({
    routes: [
        {
            path: '/', component: '@/pages/index', routes: [
                { path: "/conference/topic", component: '@/pages/conference/topic', exact: true }
            ]
        },
    ],
    proxy: {
        '/graphql': {
            'target': 'http://localhost:8001',
            'changeOrigin': true,
            // 'pathRewrite': { '^/api': '' },
        },
    },
});
