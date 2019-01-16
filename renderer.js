// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//Adding an event listener to an html button which will send open-file-dialog to the main process
const ipc = require('electron').ipcRenderer
const exec = require('child_process').exec;
const fs = require('fs');
const selectDirBtn = document.getElementById('select-file')
const submitBtn = document.getElementById('startpipeline')
const nbSelectDirBtn = document.getElementById('nb-select-file')
const nbSubmitBtn = document.getElementById('nb-startpipeline')
const checkjobstatusBtn = document.getElementById('checkjobstatus')
const selectStatFileBtn = document.getElementById('select-stat-file')

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

selectStatFileBtn.addEventListener('click', function (event) {
  ipc.send('selectstatfile')
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
    execstr = 'qsub '+jobname+' -l ncpus='+ppn+' -v SCORE='+score+',LENGTH='+length+',HEADCROP='+headcrop+',WORKSPACE_PATH='+workspace+' ~/pbsScripts/split_ontb.pbs';
  } else {
    barcodes = barcodes.split(',');
    for(let i=0;i<barcodes.length;i++){
      barcodes[i] = padDigits(barcodes[i],2);
    }
    barcodes = 'barcode{'+barcodes.join()+',}/';
    execstr = 'qsub '+jobname+' -l ncpus='+ppn+' -v "BARCODENUMBERS=\''+barcodes+'\'",SCORE='+score+',LENGTH='+length+',HEADCROP='+headcrop+',WORKSPACE_PATH='+workspace+' ~/pbsScripts/split_ontb.pbs';
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
    execstr = 'qsub '+jobname+' -l ncpus='+ppn+' -v FLOWCELL_ID='+flowcellid+',KIT_NUMBER='+kitnumber+',SCORE='+score+',LENGTH='+length+',HEADCROP='+headcrop+',WORKSPACE_PATH='+workspace+' ~/pbsScripts/ontnb.pbs';
  } else {
    barcodes = barcodes.split(',');
    for(let i=0;i<barcodes.length;i++){
      barcodes[i] = padDigits(barcodes[i],2);
    }
    barcodes = 'barcode{'+barcodes.join()+',}/';
    execstr = 'qsub '+jobname+' -l ncpus='+ppn+' -v "BARCODENUMBERS=\''+barcodes+'\'",FLOWCELL_ID='+flowcellid+',KIT_NUMBER='+kitnumber+',SCORE='+score+',LENGTH='+length+',HEADCROP='+headcrop+',WORKSPACE_PATH='+workspace+' ~/pbsScripts/ontnb.pbs';
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

ipc.on('selected-stat-file',function(event, path){
  document.getElementById('stat-file-path').value = path;
  fs.readdir(document.getElementById('stat-file-path').value,function(err,files){
    
    /*
    for(let i=0;i<files.length;i++){
      //alert(/barcode\d{1,2}/.exec(files[i]));
      let match = parseInt(/\d\d/.exec(/barcode\d\d/.exec(files[i])));
      if(!barcode.includes(match)&&!isNaN(match)){
        barcode.push(match);
      }
    }
    alert(barcode);
    */
    
    let barcode = [];
    let arr1 = [];
    let arr2 = [];
    for(let i=0;i<files.length;i++){
      fs.readFile(document.getElementById('stat-file-path').value+'/'+files[i],function(err,data){
        //alert(/\d.*/.exec(/Mean read quality:.*\d.*/.exec(data)));
      
        let match = parseInt(/\d\d/.exec(/barcode\d\d/.exec(files[i])));
        if(!barcode.includes(match)&&!isNaN(match)){
          barcode.push(match);
          arr1.push(/\d.*/.exec(/Mean read quality:.*\d.*/.exec(data)));
        } else if (barcode.includes(match)){
          arr2.push(/\d.*/.exec(/Mean read quality:.*\d.*/.exec(data)));
        } else {

        }
        
      });
    }
 
  })
  
})

function padDigits(number, digits) {
  return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

