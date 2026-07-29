const sanity = require('@sanity/client');
const client = sanity.createClient({
  projectId: 'nne62kv2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skDvXnhIzvnOyO8iPhR0ac49QSRHKY3RzKV3rEhXw0tE1TCdiOKBCTlFCCxtl31zl4odrd8RvxoA9kidEQKN3VkJzfDOqOWBi54mO6lht8Q7q15FYuUnl1k2lJZWXlrGub51Q552hUgh1d9NF5DFotHsrsc8lyvBfawYljO1i24kZUHsPNC'
});
client.fetch(`*[_type == "contactInfo"][0]`).then(res => console.log('SUCCESS')).catch(e => console.error('ERROR:', e.message));
