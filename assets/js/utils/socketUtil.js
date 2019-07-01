var socket;
var group;

var init = function(_group){
    socket = io('/');
    group = _group;
    socket.on('disconnect', function(data){
        console.log('Disconnected');
    });
    socket.on('reconnect', function(data){
        console.log('Reconnected');
    });
};

var eventSubscribe = function(event,cb){
    console.log('Subscribed to '+group+event);
    socket.on(group+event,cb);
};


module.exports = {
    init:init,
    eventSubscribe:eventSubscribe
}
