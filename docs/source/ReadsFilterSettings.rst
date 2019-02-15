Reads Filter Settings
=====================
Read Score (Required)
________________________
Set a minimum average read quality score to filter the reads.

.. note::
  * Default value: 9.
  * If you want to keep all the reads, set the value to 0, or only a postive integer is acceptable.

Read Length (Required)
_________________________
Set a minimum read length to filter reads.

.. note::
  * Default value: 500.
  * If you want to keep all the reads, set the value to 0, or only a postive integer is acceptable.

Head Crop (Required)
_______________________

.. note::
  * Default value: 50.
  * If you do not want to crop any reads, set the value to 0, or only a postive integer is acceptable.

no_split [1]_ (Default)
__________________________

.. note::
  * Set value: Split reads when an adapter is found in the middle. 

.. [1] Porechop https://github.com/rrwick/Porechop