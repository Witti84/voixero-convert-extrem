import {mkdirSync,copyFileSync,cpSync,rmSync} from 'node:fs';
rmSync('dist',{recursive:true,force:true});
mkdirSync('dist',{recursive:true});
for(const f of ['index.html','styles.css','app.js','robots.txt','sitemap.xml']) copyFileSync(f,'dist/'+f);
cpSync('assets','dist/assets',{recursive:true});
console.log('Static site built in dist/');
