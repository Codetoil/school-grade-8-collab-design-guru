const filesToCache = [
	'/',
	'css/mainCSS.css',
	'img/blank.jpg',
	'img/Eclipse_Logo2014_New(High_Res).jpg',
	'js/slidething.js',
	'js/tinycolor.js',
	'licences/tinycolor/TinyColor - Licence - MIT.md',
	'no-something/no-css/img/blank.jpg',
	'no-something/no-css/img/Eclipse_Logo2014_New(High_Res).jpg',
	'no-something/no-css/js/slidething.js',
	'no-something/no-css/licences/tinycolor/TinyColor - Licence - MIT.md',
	'no-something/no-css/xml/slidedata.xml',
	'no-something/no-css/index.html',
	'xml/slidedata.xml',
	'index.html'
]

const staticCacheName = 'cache-v0.0.1';

self.addEventListener('install', event => {
	  console.log('Attempting to install service worker and cache static assets');
	  event.waitUntil(
	    caches.open(staticCacheName)
	    .then(cache => {
	    	console.log('caching: ' + cache);
	    	return cache.addAll(filesToCache);
	    })
	  );
	});