// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//Adding an event listener to an html button which will send open-file-dialog to the main process
const ipc = require('electron').ipcRenderer
const exec = require('child_process').exec;
//const fs = require('fs');
const selectDirBtn = document.getElementById('select-file')
const submitBtn = document.getElementById('startpipeline')
const nbSelectDirBtn = document.getElementById('nb-select-file')
const nbSubmitBtn = document.getElementById('nb-startpipeline')
const checkjobstatusBtn = document.getElementById('checkjobstatus')
const selectAssembler = document.getElementById('selectAssembler')
const selectShort1Btn = document.getElementById('select-short1')
const selectShort2Btn = document.getElementById('select-short2')
//const checkAlbacore = document.getElementById('basecaller_albacore')
//const checkGuppy = document.getElementById('basecaller_guppy')


$(document).on('click', '.select-short2', function() {
  ipc.send('open-selectshort2')
});

$(document).on('click', '.select-short1', function() {
  ipc.send('open-selectshort1')
});

document.addEventListener('DOMContentLoaded', function(event){
  ipc.send('get-threads-number')
});

document.addEventListener('DOMContentLoaded', function(event){
  ipc.send('get-flowcell-ids')
});

document.addEventListener('DOMContentLoaded', function(event){
  ipc.send('get-kit-numbers')
});

document.addEventListener('DOMContentLoaded', function(event){
  ipc.send('get-barcode-kits')
});

selectDirBtn.addEventListener('click', function (event) {
  ipc.send('open-file-dialog')
});

nbSelectDirBtn.addEventListener('click', function (event) {
  ipc.send('nb-open-file-dialog')
});

checkjobstatusBtn.addEventListener('click', function (event) {
  ipc.send('checkjobstatus')
});


selectShort1Btn.addEventListener('click', function (event) {
  ipc.send('open-selectshort1')
});

selectShort2Btn.addEventListener('click', function (event) {
  ipc.send('open-selectshort2')
});

/*
selectFlowcell.addEventListener('change', function (event){
  alert('123');
})
*/

selectAssembler.addEventListener('change', function (event) {
  //alert(selectAssembler.options[selectAssembler.selectedIndex].value)
  if (selectAssembler.options[selectAssembler.selectedIndex].value === 'Flye') {
    document.getElementById('changecontent').innerHTML = 
      '<div class="form-group row">'
      +'<div class="col-sm-2 text-right">'
      +'<label for="genome-size-flye" class="col-form-label">Genome Size</label>'
      +'<small class="form-text text-muted">(required)</small>'
      +'</div>'
      +'<div class="col-sm-10">'
      +'<input type="text" class="form-control" id="genome-size-flye" name="genome-size-flye" required>'
      +'</div>'
      +'</div>'
  } else if (selectAssembler.options[selectAssembler.selectedIndex].value === 'Canu') {
    document.getElementById('changecontent').innerHTML = 
    '<div class="form-group row">'
    +'<div class="col-sm-2 text-right">'
    +'<label for="genome-size-canu" class="col-form-label">Genome Size</label>'
    +'<small class="form-text text-muted">(required)</small>'
    +'</div>'
    +'<div class="col-sm-8">'
    +'<input type="text" class="form-control" id="genome-size-canu" name="genome-size-canu" required>'
    +'</div>'
    +'</div>'
  } else {
    document.getElementById('changecontent').innerHTML = 
      '<div class="form-group row">'
      +'<div class="col-sm-2 text-right">'
      +'<label for="select-short1" class="col-form-label">Short 1</label>'
      +'<small class="form-text text-muted">(optional)</small>'
      +'</div>'
      +'<div class="col-sm-8">'
      +'<div class="input-group">'
      +'<input id="selected-short1" name="selected-short1" class="form-control" value="" /></input>'
      +'<button id="select-short1" name="select-short1" class="btn btn-primary select-short1">Browse</button>'
      +'</div>'
      +'</div>'
      +'</div>'
      +'<div class="form-group row">'
      +'<div class="col-sm-2 text-right">'
      +'<label for="select short2" class="col-form-label">Short 2</label>'
      +'<small class="form-text text-muted">(optional)</small>'
      +'</div>'
      +'<div class="col-sm-8">'
      +'<div class="input-group">'
      +'<input id="selected-short2" name="selected-short2" class="form-control" value="" /></input>'
      +'<button id="select-short2" name="select-short2" class="btn btn-primary select-short2">Browse</button>'
      +'</div>'
      +'</div>'
      +'</div>'
  }
});

// sumbit the data for basecalled fastq files
submitBtn.addEventListener('click', function (event) {
  let workspace = document.getElementById('selected-file').value;
  let score = document.getElementById('read-score').value;
  let length = document.getElementById('read-length').value;
  let headcrop = document.getElementById('headcrop').value;
  let ppn = document.getElementById('threads').value;
  let barcodes = document.getElementById('barcodes').value;
  let jobname = document.getElementById('jobname').value === ''?'':'-N '+document.getElementById('jobname').value;
  let execstr = '';
  if(barcodes===''){
    execstr = 'qsub '+jobname+' -l ncpus='+ppn+' -v SCORE='+score+',LENGTH='+length+',HEADCROP='+headcrop+',WORKSPACE_PATH='+workspace
    +' ~/pbsScripts/split_ontb.pbs';
  } else {
    barcodes = barcodes.split(',');
    for(let i=0;i<barcodes.length;i++){
      barcodes[i] = padDigits(barcodes[i],2);
    }
    barcodes = 'barcode{'+barcodes.join()+',}/';
    execstr = 'qsub '+jobname+' -l ncpus='+ppn+' -v "BARCODENUMBERS=\''+barcodes+'\'",SCORE='+score+',LENGTH='+length+',HEADCROP='+headcrop
    +',WORKSPACE_PATH='+workspace+' ~/pbsScripts/split_ontb.pbs';
  }
  exec(execstr, function (err, stdout, stderr) {
    if (err) handleError();
    console.log(stdout);
    console.log(stderr);
  });
});

// submit the data for not basecalled fast5 files
nbSubmitBtn.addEventListener('click', function (event) {
  
  let workspace = $('nb-selected-file').val();
  //let workspace = document.getElementById('nb-selected-file').value;
  let flowcellid = $('#selectFlowCell').val();
  //let flowcellid = document.getElementById('selectFlowCell').value;
  let kitnumber = $('#selectKitNumber').val();
  //let kitnumber = document.getElementById('selectKitNumber').value;
  let barcodes = $('#nb-barcodes').val();
  //let barcodes = document.getElementById('nb-barcodes').value;
  let barcodekit = $('#selectBarcodeKit').val() === ''?'' : '"' + $('#selectBarcodeKit').val().join(' ') + '"';
  //let score = document.getElementById('nb-read-score').value;
  let score = $('#nb-read-score').val();
  //let length = document.getElementById('nb-read-length').value;
  let length = $('#nb-read-length').val();
  //let headcrop = document.getElementById('nb-headcrop').value;
  let headcrop = $('#nb-headcrop').val();
  //let threads = document.getElementById('nb-threads').value;
  let threads = $('#nb-threads').val();
  //let jobname = document.getElementById('nb-jobname').value === ''?'':'-N '+document.getElementById('nb-jobname').value;
  let jobname = $('#nb-jobname').val() === ''?'' : '-N ' + $('#nb-jobname').val();
  //let assembler = document.getElementById('selectAssembler');
  let assembler = $('#selectAssembler').val();
  if (barcodes !== '') {
    barcodes = barcodes.split(',');
    for(let i=0;i<barcodes.length;i++){
      barcodes[i] = padDigits(barcodes[i],2);
    }
    barcodes = 'barcode{'+barcodes.join()+',}/';
  }

  let execstr = '';
  
  execstr = 'qsub '+jobname+' -l ncpus='+threads+' -v THREADS='+threads+',FLOWCELL_ID='+flowcellid+',KIT_NUMBER='+kitnumber+',BARCODEKIT='+barcodekit
    +',BARCODENUMBERS='+barcodes+',SCORE='+score+',LENGTH='+length+',HEADCROP='+headcrop+',WORKSPACE_PATH='+workspace+',ASSEMBLER='+assembler
    +' ~/ncct/pipeline/pipeline/ontpipeline/pbsScripts/ontb_guppy.pbs';
  //alert(barcodes);

  /*
  if(barcodes===''){
    if(document.getElementById('basecaller_albacore').checked){
      execstr = 'qsub '+jobname+' -l ncpus='+ppn+' -v FLOWCELL_ID='+flowcellid+',KIT_NUMBER='+kitnumber
      +',SCORE='+score+',LENGTH='+length+',HEADCROP='+headcrop+',WORKSPACE_PATH='+workspace+',ASSEMBLER='+assembler+' ~/pbsScripts/ontb_guppy.pbs';
    } else if (document.getElementById('basecaller_guppy').checked) {
      alert('guppy');
    } else {
      alert('nothing');
    }
  } else {
    barcodes = barcodes.split(',');
    for(let i=0;i<barcodes.length;i++){
      barcodes[i] = padDigits(barcodes[i],2);
    }
    barcodes = 'barcode{'+barcodes.join()+',}/';
    execstr = 'qsub '+jobname+' -l ncpus='+ppn+' -v "BARCODENUMBERS=\''+barcodes+'\'",FLOWCELL_ID='+flowcellid+',KIT_NUMBER='+kitnumber
    +',SCORE='+score+',LENGTH='+length+',HEADCROP='+headcrop+',WORKSPACE_PATH='+workspace+',ASSEMBLER='+assembler+' ~/pbsScripts/ontb_guppy.pbs';
  }
  exec(execstr, function (err, stdout, stderr) {
    if (err) handleError();
    console.log(stdout);
    console.log(stderr);
  });
  */
});

ipc.on('selected-file', function (event, path) {
  document.getElementById('selected-file').value = path;
});

ipc.on('nb-selected-file', function (event, path) {
  document.getElementById('nb-selected-file').value = path;
  window.location.hash = '#not-basecalled';
});

ipc.on('selectedshort1', function (event, path) {
  document.getElementById('selected-short1').value = path;
  window.location.hash = '#not-basecalled';
});

ipc.on('selectedshort2', function (event, path) {
  document.getElementById('selected-short2').value = path;
  window.location.hash = '#not-basecalled';
});

ipc.on('jobstatus', function (event, status) {
  document.getElementById('jobstatus').value = status;
  window.location.hash = '#checkjobs';
});

ipc.on('return-threads-number',function(event, threadsnumber){
  //alert('hello');
  document.getElementById('threads').value = parseInt(threadsnumber);
  document.getElementById('nb-threads').value = parseInt(threadsnumber);
})

ipc.on('return-flowcell-ids',function(event, flowcellids){
  let arr = flowcellids.split(/\n/);
  //alert(arr);
  let sel = document.getElementById('selectFlowCell');
  for(let i = 0; i < arr.length; i++) {
    let opt = document.createElement('option');
    if (arr[i] !== '') {
      opt.innerHTML = arr[i];
      opt.value = arr[i];
      sel.appendChild(opt);
    }
  }
})

ipc.on('return-kit-numbers',function(event, flowcellids){
  let arr = flowcellids.split(/\n/);
  //alert(arr);
  let sel = document.getElementById('selectKitNumber');
  for(let i = 0; i < arr.length; i++) {
    let opt = document.createElement('option');
    if (arr[i] !== '') {
      opt.innerHTML = arr[i];
      opt.value = arr[i];
      sel.appendChild(opt);
    }
  }
})

ipc.on('return-barcode-kits',function(event, flowcellids){
  let arr = flowcellids.split(/\n/);
  //alert(arr);
  let sel = document.getElementById('selectBarcodeKit');
  for(let i = 0; i < arr.length; i++) {
    let opt = document.createElement('option');
    if (arr[i] !== '') {
      opt.innerHTML = arr[i];
      opt.value = arr[i];
      sel.appendChild(opt);
    }
  }
})

function padDigits(number, digits) {
  return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

