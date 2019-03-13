#!/usr/bin/env nextflow

params.bn = '01,02,03,04,05,06,07,08,09,10,11,12'

params.threads = ''

if(params.bn == 'all'){
  params.query = params.query + "/*.fastq"
}
else{
  params.query = "/barcode{$params.bn}/*.fastq"
}
params.no_split = true
params.l = 500
params.q = 9

//fastqPath = file(params.query).parent

Channel
  .fromPath(params.query+'/*.fastq')
  .set{BasecalledFiles}

process porechop {
  conda '/home/yan/anaconda3/envs/porechop'

  //publishDir '{params.query}/Analysis/AdapterTrimmedFiles', mode:'copy'

  maxForks 1
  cpus 4

  input:
  file f from BasecalledFiles
  //file fastqPath

  output:
  file 'adaptertrimmed_*' into AdapertTrimmedFiles1, AdapertTrimmedFiles2

  script:
  if (params.no_split == false) 
    """
    echo 'Starting porechop' `date +%H-%M-%S`
    porechop -i ${f} --no_split -o adaptertrimmed_${f} -t ${task.cpus} > log_adaptertrimmed_${f.getBaseName()}.log
    cp -f log_adaptertrimmed_${f.getBaseName()}.log ${params.query}/Analysis/Logs
    cp -f adaptertrimmed_${f} ${params.query}/Analysis/AdapterTrimmedFiles
    echo 'Finished porechop' `date +%H-%M-%S`
    """
  else 
    """
    echo 'Starting porechop' `date +%H-%M-%S`
    porechop -i ${f} -o adaptertrimmed_${f} -t ${task.cpus} > log_adaptertrimmed_${f.getBaseName()}.log
    cp -f log_adaptertrimmed_${f.getBaseName()}.log ${params.query}/Analysis/Logs
    cp -f adaptertrimmed_${f} ${params.query}/Analysis/AdapterTrimmedFiles
    echo 'Finished porechop' `date +%H-%M-%S`
    """
}

process nanofilt {
  conda '/home/yan/anaconda3/envs/nanofilt'

  maxForks 1
  cpus 4

  input:
  file adapterTrimmedFile from AdapertTrimmedFiles1

  output:
  file 'filted_*' into FiltedFiles1, FiltedFiles2

  """
  echo 'Starting NanoFilt' `date +%H-%M-%S`
  cat ${adapterTrimmedFile} | NanoFilt -q ${params.q} -l '${params.l}' --headcrop 50 --logfile log_filted_${adapterTrimmedFile.getBaseName()}.log> filted_${adapterTrimmedFile}
  cp -f log_filted_${adapterTrimmedFile.getBaseName()}.log ${params.query}/Analysis/Logs
  cp -f filted_${adapterTrimmedFile} ${params.query}/Analysis/FiltedFiles/
  echo 'Finished NanoFilt' `date +%H-%M-%S`
  """
}

process nanostat1 {
  conda '/home/yan/anaconda3/envs/nanostat'

  maxForks 1
  cpus 4

  input:
  file adapterTrimmedFile from AdapertTrimmedFiles2

  """
  echo 'Starting 1. NanoStat' `date +%H-%M-%S`
  NanoStat --fastq ${adapterTrimmedFile} -t ${task.cpus} > stat_${adapterTrimmedFile.getBaseName()}.txt
  cp -f stat_${adapterTrimmedFile.getBaseName()}.txt ${params.query}/Analysis/StatFiles
  echo 'Finished 1. NanoStat' `date +%H-%M-%S`
  """
}

process nanostat2 {
  conda '/home/yan/anaconda3/envs/nanostat'

  maxForks 1
  cpus 4

  input:
  file filtedFile from FiltedFiles1

  """
  echo 'Starting 2. NanoStat' `date +%H-%M-%S`
  NanoStat --fastq ${filtedFile} -t ${task.cpus} > stat_${filtedFile.getBaseName()}.txt
  cp -f stat_${filtedFile.getBaseName()}.txt ${params.query}/Analysis/StatFiles
  echo 'Finished 2. NanoStat' `date +%H-%M-%S`
  """
}


