export default async function sitemap() {
    const baseUrl = 'https://www.muejam.com';

    // Static routes
    const routes = ['', '/books', '/writers', '/about', '/contact', '/privacy', '/terms'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: route === '' ? 1 : 0.8,
    }));

    // Fetch dynamic routes (Books & Authors)
    // Note: Using fetch directly to avoid Apollo Client overhead in sitemap generation
    // Replace with your actual GraphQL endpoint and headers if needed

    let dynamicRoutes = [];

    try {
        const response = await fetch('https://graphql-333f98f9a304.hosted.ghaymah.systems/v1/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-hasura-role': 'public'
            },
            body: JSON.stringify({
                query: `
          query GetSitemapData {
            libaray_Book(limit: 1000) {
              id
              updated_at
            }
            libaray_Autor(limit: 500) {
              id
            }
          }
        `
            }),
            next: { revalidate: 3600 } // Revalidate every hour
        });

        const { data } = await response.json();

        const bookRoutes = (data?.libaray_Book || []).map((book) => ({
            url: `${baseUrl}/books/${book.id}`,
            lastModified: book.updated_at || new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.7,
        }));

        const authorRoutes = (data?.libaray_Autor || []).map((author) => ({
            url: `${baseUrl}/writers/${author.id}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.6,
        }));

        dynamicRoutes = [...bookRoutes, ...authorRoutes];

    } catch (error) {
        console.error('Error generating sitemap:', error);
    }

    return [...routes, ...dynamicRoutes];
}
