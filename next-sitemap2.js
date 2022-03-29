let siteUrl = "https://awsamplifynext.vercel.app/";
if (process.env.NODE_ENV !== "production") {
    siteUrl = "http://localhost:3000";
}

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                disallow: ["/cart", "/checkout"],
            },
            {
                userAgent: "*",
                allow: "/",
            },
        ],
        additionalSitemaps: [`${siteUrl}/sitemap-0.xml`],
    },
    exclude: ["/cart", "/checkout*"],
};
