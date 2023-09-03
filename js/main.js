let installButtonetinstallButton=document.getElementById('installButton');
installButton.onclick=doInstall;

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt=event;
    installButton.style.display='block';
});
function doInstall() {
    installButton.style.display='none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((res)=>{
        if (res.outcome==='accepted') {
            console.log('doInstall:accepted');
        } else {
            console.log('doInstall: declined');
        }
        deferredPrompt=null
    });
}
var urlParams=newURLSearchParams(window.location.search);
if (urlParams.get('source') ==='pwa') {
    console.log('Launched as PWA');
    let theTitle=document.getElementById('title');
    theTitle.innerHTML=theTitle.innerHTML+' (PWA)';
}

