Assembly Settings
=================
Assembler (Required)
_______________________
Choose an assembler tool from the select list.

Canu
~~~~~~~~
Genome Size (Required)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Set the estimated genome size.

.. note::
  * e.g. 5m or 2.6g, which is used for solid k-mers selection.
  * The estimate could be rough (e.g. within 0.5x-2x range) and does not affect the other assembly stages.

assembly-prefix [1]_ (Default)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. note::
  * Set value: asm.
  * Set the file name prefix with "asm" of intermediate and output files.

Flye
~~~~~~~~
Genome Size (Required)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Set the estimated genome size.

.. note::
  * e.g. 5m or 2.6g, which is used for solid k-mers selection.
  * The estimate could be rough (e.g. within 0.5x-2x range) and does not affect the other assembly stages.

Unicycler
~~~~~~~~~~~~~
Short 1 (Optional)
^^^^^^^^^^^^^^^^^^^^^^^^
Set the path to the fastq file of first short reads in each pair.

Short 2 (Optional)
^^^^^^^^^^^^^^^^^^^^^^^^
Set the path to the fastq file of second short reads in each pair

.. note::
  * These two options are required in **hybrid assembly** mode, or leave it blank for **long-read-only assembly** mode.
  * These two fastq files should be obtained from Illumina sequencing.

.. [1] Canu Tutorial https://canu.readthedocs.io/en/latest/tutorial.html