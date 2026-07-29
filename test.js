const sanity = require('@sanity/client');
const client = sanity.createClient({
  projectId: 'nne62kv2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false
});
client.fetch(`*[_type == "contactInfo" && !(_id in path("drafts.**"))][0] {
  _id,
  "companyProfileUrl": companyProfile.asset->url
}`).then(res => console.log(JSON.stringify(res, null, 2)));
