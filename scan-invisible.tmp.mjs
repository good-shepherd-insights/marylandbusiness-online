import { createClient } from '@sanity/client';
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Invisible / direction-override / zero-width / BOM / soft-hyphen chars
const BAD = /[\u200B-\u200F\u2060-\u2064\u206A-\u206F\uFEFF\u00AD\u202A-\u202E\u180E\uFFF9-\uFFFB]/;

const docs = await client.fetch('*');
const findings = [];
function walk(value, path, doc) {
  if (typeof value === 'string') {
    if (BAD.test(value)) {
      const codes = [...value].filter(c => BAD.test(c)).map(c => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0'));
      findings.push({ doc: `${doc._type} ${doc._id}`, path, clean: value.replace(new RegExp(BAD.source, 'g'), ''), codes: [...new Set(codes)] });
    }
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, `${path}[${i}]`, doc));
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) walk(v, path ? `${path}.${k}` : k, doc);
  }
}
for (const doc of docs) walk(doc, '', doc);

console.log('documents scanned:', docs.length);
console.log('contaminated strings:', findings.length);
for (const f of findings) {
  console.log('---');
  console.log('doc:', f.doc);
  console.log('path:', f.path);
  console.log('cleaned value:', JSON.stringify(f.clean.slice(0, 80)));
  console.log('invisible chars:', f.codes.join(' '), f.codes.length > 8 ? `(x${f.codes.length})` : '');
}
