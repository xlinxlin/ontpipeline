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
   
   /opt/anaconda3/bin/conda create -n porechop python=3.7
   source activate /opt/anaconda3/envs/porechop
   /opt/anaconda3/bin/conda install -c bioconda porechop
   source /opt/anaconda3/bin/deactivate

NanoStat Installation
^^^^^^^^^^^^^^^^^^^^^
.. code-block:: bash

   /opt/anaconda3/bin/conda create -n nanostat python=3.7
   source activate /opt/anaconda3/envs/nanostat
   /opt/anaconda3/bin/conda install -c bioconda nanostat
   source /opt/anaconda3/bin/deactivate

NanoFilt Installation
^^^^^^^^^^^^^^^^^^^^^
.. code-block:: bash

   /opt/anaconda3/bin/conda create -n nanofilt python=3.7
   source activate /opt/anaconda3/envs/nanofilt
   /opt/anaconda3/bin/conda install -c bioconda nanofilt
   source /opt/anaconda3/bin/deactivate

Canu Installation
^^^^^^^^^^^^^^^^^
.. code-block:: bash

   /opt/anaconda3/bin/conda create -n canu python=3.7
   source activate /opt/anaconda3/envs/canu
   /opt/anaconda3/bin/conda install -c bioconda canu
   source /opt/anaconda3/bin/deactivate

Flye Installation
^^^^^^^^^^^^^^^^^
.. code-block:: bash

   /opt/anaconda3/bin/conda create -n flye python=2.7
   source activate /opt/anaconda3/envs/flye
   /opt/anaconda3/bin/conda install -c bioconda flye
   source /opt/anaconda3/bin/deactivate

Unicycler Installation
^^^^^^^^^^^^^^^^^^^^^^
.. code-block:: bash
   
   /opt/anaconda3/bin/conda create -n unicycler python=3.7
   source activate /opt/anaconda3/envs/unicylcer
   /opt/anaconda3/bin/conda install -c bioconda unicycler
   source /opt/anaconda3/bin/deactivate
