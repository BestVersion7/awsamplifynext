console.log(process.env.NODE_ENV);
const nodeenv = process.env.NODE_ENV;
let siteUrl;
nodeenv === "production"
    ? (siteUrl = "https://awsamplifynext.vercel.app/")
    : "http://localhost:3000";

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
