FAQ
===
What bioinformatics tools are used?
___________________________________
* Guppy v2.3.1 https://community.nanoporetech.com
* Porechop 0.2.3 https://github.com/rrwick/Porechop
* NanoStat 1.1.2 https://github.com/wdecoster/nanostat
* NanoFilt 2.2.0 https://github.com/wdecoster/nanofilt
* Canu v1.8 https://github.com/marbl/canu
* Flye 2.4-release https://github.com/fenderglass/Flye
* Unicycler v0.4.8-beta https://github.com/rrwick/Unicycler

Where can I find output files?
_______________________________
- :file:`\\Basecalled` (reads after basecalling)
- :file:`\\Barcodes` (reads after demultiplexing)
- :file:`\\Analysis\\AdapterTrimmedFiles` (reads after adapter trimming)
- :file:`\\Analysis\\FiltedFiles` (reads after filtering)
- :file:`\\Analysis\\StatFiles` (statitstical data before and after filtering)
- :file:`\\Analysis\\Logs` (log files)
- :file:`\\Assembly` (reads after assembly)