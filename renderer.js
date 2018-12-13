// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//Adding an event listener to an html button which will send open-file-dialog to the main process
const ipc = require('electron').ipcRenderer
const exec = require("child_process").exec;
const selectDirBtn = document.getElementById('select-file')
const submitBtn = document.getElementById('startpipeline')
const nbSelectDirBtn = document.getElementById('nb-select-file')
const nbSubmitBtn = document.getElementById('nb-startpipeline')
const checkjobstatusBtn = document.getElementById('checkjobstatus')

document.addEventListener('DOMContentLoaded', function(event){
  ipc.send('get-threads-number')
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
    execstr = 'qsub '+jobname+' -l ncpus='+ppn+' -v SCORE='+score+',LENGTH='+length+',HEADCROP='+headcrop+',WORKSPACE_PATH='+workspace+' ~/pbsScripts/test.pbs';
  } else {
    barcodes = barcodes.split(',');
    for(let i=0;i<barcodes.length;i++){
      barcodes[i] = padDigits(barcodes[i],2);
    }
    barcodes = 'barcode{'+barcodes.join()+'}/';
    execstr = 'qsub '+jobname+' -l ncpus='+ppn+' -v "BARCODENUMBERS=\''+barcodes+'\'",SCORE='+score+',LENGTH='+length+',HEADCROP='+headcrop+',WORKSPACE_PATH='+workspace+' ~/pbsScripts/test.pbs';
  }
  exec(execstr, function (err, stdout, stderr) {
    if (err) handleError();
    console.log(stdout);
    console.log(stderr);
  });
});

// submit the data for not basecalled fast5 files
nbSubmitBtn.addEventListener('click', function (event) {
  let workspace = document.getElementById('nb-selected-file').value;
  let flowcellid = document.getElementById('flowcell-id').value;
  let kitnumber = document.getElementById('kit-number').value;
  let barcodes = document.getElementById('nb-barcodes').value;
  let score = document.getElementById('nb-read-score').value;
  let length = document.getElementById('nb-read-length').value;
  let headcrop = document.getElementById('nb-headcrop').value;
  let ppn = document.getElementById('nb-threads').value;
  let jobname = document.getElementById('nb-jobname').value === ''?'':'-N '+document.getElementById('nb-jobname').value;
  let execstr = '';
  if(barcodes===''){
    execstr = 'qsub '+jobname+' -l ncpus='+ppn+' -v FLOWCELL_ID='+flowcellid+',KIT_NUMBER='+kitnumber+',SCORE='+score+',LENGTH='+length+',HEADCROP='+headcrop+',WORKSPACE_PATH='+workspace+' ~/pbsScripts/test_with_basecalling.pbs';
  } else {
    barcodes = barcodes.split(',');
    for(let i=0;i<barcodes.length;i++){
      barcodes[i] = padDigits(barcodes[i],2);
    }
    barcodes = 'barcode{'+barcodes.join()+'}/';
    execstr = 'qsub '+jobname+' -l ncpus='+ppn+' -v "BARCODENUMBERS=\''+barcodes+'\'",FLOWCELL_ID='+flowcellid+',KIT_NUMBER='+kitnumber+',SCORE='+score+',LENGTH='+length+',HEADCROP='+headcrop+',WORKSPACE_PATH='+workspace+' ~/pbsScripts/test_with_basecalling.pbs';
  }
  exec(execstr, function (err, stdout, stderr) {
    if (err) handleError();
    console.log(stdout);
    console.log(stderr);
  });
});

ipc.on('selected-file', function (event, path) {
  document.getElementById('selected-file').value = path;
});

ipc.on('nb-selected-file', function (event, path) {
  document.getElementById('nb-selected-file').value = path;
  window.location.hash = '#not-basecalled';
});

ipc.on('jobstatus', function (event, status) {
  document.getElementById('jobstatus').value = status;
  window.location.hash = '#checkjobs';
});

ipc.on('return-threads-number',function(event, threadsnumber){
  document.getElementById('threads').value = parseInt(threadsnumber);
  document.getElementById('nb-threads').value = parseInt(threadsnumber);
})

function padDigits(number, digits) {
  return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}