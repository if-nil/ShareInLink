import { createRouter, createWebHistory } from 'vue-router'
import EditorView from '../views/EditorView.vue'
import PreviewPage from '../views/PreviewPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'editor',
      component: EditorView,
    },
    {
      path: '/preview',
      name: 'preview',
      component: PreviewPage,
    },
  ],
})

export default router
