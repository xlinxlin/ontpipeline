Get Started
===========
Installation
_______________________________
Anaconda Installation
^^^^^^^^^^^^^^^^^^^^^
Installing on Linux https://docs.anaconda.com/anaconda/install/linux/

Guppy Installation
^^^^^^^^^^^^^^^^^^
.. code-block:: bash

  sudo apt-get update 
  sudo apt-get install wget lsb-release 
  export PLATFORM=$(lsb_release -cs) 
  wget -O- https://mirror.oxfordnanoportal.com/apt/ont-repo.pub | sudo apt-key add - 
  echo "deb http://mirror.oxfordnanoportal.com/apt ${PLATFORM}-stable non-free" | sudo tee /etc/apt/sources.list.d/nanoporetech.sources.list 
  sudo apt-get update
  apt-get install ont-guppy[-cpu]

Porechop Installation
^^^^^^^^^^^^^^^^^^^^^
.. code-block:: bash

   conda create -n porechop python=3.7
   git clone https://github.com/rrwick/Porechop.git
   cd Porechop
   source activate porechop
   python3 setup.py install
   source deactivate

NanoStat Installation
^^^^^^^^^^^^^^^^^^^^^
.. code-block:: bash

   conda create -n nanostat python=3.7
   source activate nanostat
   conda install -c bioconda nanostat
   source deactivate

NanoFilt Installation
^^^^^^^^^^^^^^^^^^^^^
.. code-block:: bash

   conda create -n nanofilt python=3.7
   source activate nanofilt
   conda install -c bioconda nanofilt
   source deactivate

Canu Installation
^^^^^^^^^^^^^^^^^
.. code-block:: bash

   conda create -n canu python=3.7
   source activate canu
   conda install -c bioconda canu
   source deactivate

Flye Installation
^^^^^^^^^^^^^^^^^
.. code-block:: bash

   conda create -n flye python=2.7
   source activate flye
   conda install -c bioconda flye
   source deactivate

Unicycler Installation
^^^^^^^^^^^^^^^^^^^^^^
.. code-block:: bash
   
   conda create -n unicycler python=3.5
   git clone https://github.com/rrwick/Unicycler.git
   cd Unicycler
   source activate unicycler
   python3 setup.py install
   source deactivate

Dependencies Installation: SPAdes
"""""""""""""""""""""""""""""""""
.. code-block:: bash
   
   source activate unicycler
   conda install -c bioconda spades
   source deactivate

Dependencies Installation: bowtie2
""""""""""""""""""""""""""""""""""
.. code-block:: bash
   
   source activate unicycler
   conda install -c bioconda bowtie2
   source deactivate

Dependencies Installation: samtools
"""""""""""""""""""""""""""""""""""
.. code-block:: bash
   
   source activate unicycler
   conda install -c bioconda samtools
   source deactivate

Dependencies Installation: pilon
""""""""""""""""""""""""""""""""
.. code-block:: bash
   
   source activate unicycler
   conda install -c bioconda pilon
   source deactivate

Dependencies Installation: racon
""""""""""""""""""""""""""""""""
.. code-block:: bash
   
   source activate unicycler
   conda install -c bioconda racon
   source deactivate