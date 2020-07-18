function enviar(){
  const call = io();
 // var button = $(this).val();
  console.log("scanear");
  call.emit('btnAction', {
    value: 'a'
  });
};

function prender(){
  const call = io();
 // var button = $(this).val();
  console.log("prender");
  call.emit('btnAction', {
    value: 'b'
  });
};
function apagar(){
  const call = io();
 // var button = $(this).val();
  console.log("prender");
  call.emit('btnAction', {
    value: 'c'
  });
};

/*$("buttom").click(function(){
  const call = io();
  var button = $(this).val();
  console.log(button);
  call.emit('btnAction', {
    value: button.toString()
  });
});

function enviar(){
  console.log('aca estamos');
  mySerial.write("SCAN(0,2)");
}*/