import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogType?: string;
    canonicalUrl?: string;
    structuredData?: object;
}

/**
 * SEO Component - Manages invisible SEO metadata for each page
 * Updates document head with meta tags without affecting UI
 */
export const SEO = ({
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage = 'https://lovable.dev/opengraph-image-p98pqg.png',
    ogType = 'website',
    canonicalUrl,
    structuredData,
}: SEOProps) => {
    useEffect(() => {
        // Update document title
        document.title = title;

        // Helper function to update or create meta tags
        const updateMetaTag = (selector: string, content: string, isProperty = false) => {
            const attribute = isProperty ? 'property' : 'name';
            let element = document.querySelector(`meta[${attribute}="${selector}"]`);

            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, selector);
                document.head.appendChild(element);
            }

            element.setAttribute('content', content);
        };

        // Update primary meta tags
        updateMetaTag('description', description);
        if (keywords) {
            updateMetaTag('keywords', keywords);
        }

        // Update Open Graph tags
        updateMetaTag('og:title', ogTitle || title, true);
        updateMetaTag('og:description', ogDescription || description, true);
        updateMetaTag('og:image', ogImage, true);
        updateMetaTag('og:type', ogType, true);
        if (canonicalUrl) {
            updateMetaTag('og:url', canonicalUrl, true);
        }

        // Update Twitter Card tags
        updateMetaTag('twitter:title', ogTitle || title);
        updateMetaTag('twitter:description', ogDescription || description);
        updateMetaTag('twitter:image', ogImage);

        // Update canonical link
        if (canonicalUrl) {
            let canonical = document.querySelector('link[rel="canonical"]');
            if (!canonical) {
                canonical = document.createElement('link');
                canonical.setAttribute('rel', 'canonical');
                document.head.appendChild(canonical);
            }
            canonical.setAttribute('href', canonicalUrl);
        }

        // Add structured data if provided
        if (structuredData) {
            const scriptId = 'structured-data-script';
            let script = document.getElementById(scriptId) as HTMLScriptElement;

            if (!script) {
                script = document.createElement('script');
                script.id = scriptId;
                script.type = 'application/ld+json';
                document.head.appendChild(script);
            }

            script.textContent = JSON.stringify(structuredData);
        }
    }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogType, canonicalUrl, structuredData]);

    // This component renders nothing - it's purely for SEO
    return null;
};

export default SEO;
