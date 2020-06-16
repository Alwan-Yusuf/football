var webPush = require('web-push');

const vapidKeys ={"publicKey":"BFrHxzu6pMXNrCTYyK_PXAxUHJENyou5tPb-Gt0erYEfMpTvQgcHycASpHjABD6kR2wJYYUpqqzEU24TIVc8ezk","privateKey":"QP4XjD_bughu7ZYs6kHrRzkOGZGLbQYF4N0HwhmGqQ4"}


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fXwqC9tfYqU:APA91bHXW9PStmVQXAb7sCAbr_43mJvGEgjxoht86A9Ck6UiIWYUv-gZlw4GCjnnGWrSdTn-QMvmRlr7TxFqEWuucK5_xK0i-gue8VCGrhr29KxYH9SU5ypR18JW0KuNlZivtTyD4mwv",
    "keys": {
        "p256dh": "BOpOYmG6i0dZ7kr9oZgiVUEnl7rQyodgs19mEhLxuRLsKnF4/6RW39HUC+rSoQuxGISdqs+QKYiM1SsXvwgb9GI=",
        "auth": "lGptqXkGClvztw4htnuBjQ=="
    }
};
var payload = 'Halo!! Kembali lagi dengan saya :)';
var options = {
    gcmAPIKey: '183001716870',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);