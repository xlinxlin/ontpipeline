Assembly Settings
=================
1. Assembler (Required)
_______________________
Choose an assembler tool from the select list.

1.1 Canu
~~~~~~~~
1.1.1 Genome Size (Required)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Set the estimated genome size.

1.2 Flye
~~~~~~~~
1.2.1 Genome Size (Required)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Set the estimated genome size.

1.3 Unicycler
~~~~~~~~~~~~~
1.3.1 Short 1 (Optional)
^^^^^^^^^^^^^^^^^^^^^^^^
Set the path to the fastq file of first short reads in each pair.

1.3.2 Short 2 (Optional)
^^^^^^^^^^^^^^^^^^^^^^^^
Set the path to the fastq file of second short reads in each pair

.. note::
  * These two options are required in **hybrid assembly** mode, or leave if blank for **long-read-only assembly** mode.
  * These two fastq files should be obtained from Illumina sequencing.

