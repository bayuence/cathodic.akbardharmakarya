const sanity = require('@sanity/client');
const client = sanity.createClient({
  projectId: 'nne62kv2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false
});
client.fetch(`*[_type == "client"] {
  _id,
  name,
  logo {
    asset-> {
      _id,
      url
    }
  }
}`).then(res => console.log(JSON.stringify(res, null, 2)));
