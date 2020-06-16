var webPush = require('web-push');

const vapidKeys ={"publicKey":"BFrHxzu6pMXNrCTYyK_PXAxUHJENyou5tPb-Gt0erYEfMpTvQgcHycASpHjABD6kR2wJYYUpqqzEU24TIVc8ezk","privateKey":"QP4XjD_bughu7ZYs6kHrRzkOGZGLbQYF4N0HwhmGqQ4"}


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dUte2puCWOY:APA91bH532q8RCdzW23RfV7IV5lJnz0UOFpcQEcif1k4DrjUfmtcWWBWKM4FwoGwA9eHiJX-XiuuRD0sjBPuy4MxTIeRNXW_bbxY2oQimX9QvAY-XYbPgOiSCeyhU-eJJwyYCIT8VCbI",
    "keys": {
        "p256dh": "BLda/49eTbNvcEVJB7LbV3clljtxrRx1t/QyE5ekmllvlM6x7fB7PWxxBQ10bpz6uk5fLWJkC1yqJHaHvRPg4GE=",
        "auth": "xdBprUZoKKhOo9xWz5RZrA=="
    }
};
var payload = 'Halo!! Kembali lagi dengan saya :)';
var options = {
    gcmAPIKey: '615953300937',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);