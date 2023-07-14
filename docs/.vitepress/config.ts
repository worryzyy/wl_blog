import { defineConfig } from 'vitepress'
import { nav } from './nav'
import { sidebar } from './sidebar'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'wl_blog',
  description: 'Knowledge point recording and development stepping',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
