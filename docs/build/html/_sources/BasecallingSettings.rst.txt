Basecalling Settings
====================
Flowcell ID (Required)
_________________________
Choose the Flowcell ID from the select list.

Kit Number (Requied)
_______________________
Choose the kit number from the select list.

Barcode kit (Optional)
_________________________
Choose the barcode kit(s) from the list if used.

.. note::
  * If no barcode kit was used, leave it blank.
  * Choose by press :py:mod:`Ctrl` to select multiple barcode kits.

cpu_threads_per_caller [1]_ (Default)
_____________________________________

.. note::
  * Set value: 1.

records_per_fastq [2]_ (Default)
_________________________________
.. note::
  * select value: 0.
  * Use a single file (per worker, per run id).

recursive [2]_ (Default)
_________________________
.. note::
  * Set value: search for input files recursively.

enable_trimming [2]_ (Default)
_________________________________
.. note::
  * Set value: enable trimming of the adapter from the beginning of the read before basecalling.


.. [1] Guppy v2.3.1 Release https://community.nanoporetech.com/posts/guppy-2-3-1-release
.. [2] How to configure Guppy parameters https://community.nanoporetech.com/protocols/Guppy-protocol-preRev/v/gpb_2003_v1_revg_14dec2018/how-to-configure-guppy-parameters