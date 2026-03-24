export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/profile/', '/api/'],
        },
        sitemap: 'https://www.muejam.com/sitemap.xml',
    }
}
