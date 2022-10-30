/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://tmm-fyb.dk',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
