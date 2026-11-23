/* The Gathering app (app.gatheringtc.com): shows notifications and opens the app when one is tapped. */
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('push',function(e){
  var d={};
  try{d=e.data?e.data.json():{}}catch(x){d={body:e.data?e.data.text():''}}
  var opts={body:d.body||'',icon:'https://static.wixstatic.com/media/30d5ed_0c1d11be32ce4dea87f79df6e95a6747~mv2.png/v1/fill/w_192,h_192,al_c,q_90,enc_png/gathering-192.png',data:{url:d.url||''}};
  if(d.tag){opts.tag=d.tag;opts.renotify=true}
  var jobs=[self.registration.showNotification(d.title||'The Gathering',opts)];
  try{if(self.navigator&&self.navigator.setAppBadge&&typeof d.badge==='number')jobs.push(self.navigator.setAppBadge(d.badge).catch(function(){}))}catch(x){}
  e.waitUntil(Promise.all(jobs));
});
self.addEventListener('notificationclick',function(e){
  e.notification.close();
  var route=(e.notification.data&&e.notification.data.url)||'';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(list){
    for(var i=0;i<list.length;i++){
      var c=list[i];
      try{if(new URL(c.url).origin===self.location.origin){c.postMessage({tgNav:route});return c.focus()}}catch(x){}
    }
    return self.clients.openWindow('/'+(route?'?go='+encodeURIComponent(route):''));
  }));
});
