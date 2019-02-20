Get Started
===========
Installation
_______________________________
Anaconda Installation
^^^^^^^^^^^^^^^^^^^^^
How To Install the Anaconda Python Distribution on Ubuntu 16.04 https://www.digitalocean.com/community/tutorials/how-to-install-the-anaconda-python-distribution-on-ubuntu-16-04

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
   sudo apt-get update -y
   sudo apt-get install -y canu
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
1. Download SPAdes Linux binaries and extract them.

.. code-block:: bash

   wget http://cab.spbu.ru/files/release3.13.0/SPAdes-3.13.0-Linux.tar.gz
   tar -xzf SPAdes-3.13.0-Linux.tar.gz

2. Change to your home directory.

.. code-block:: bash
  
  cd $HOME


3. Open the .bashrc file.
   
.. code-block:: bash

  gedit ./bashrc

4. Add the following line to the file, then save the file and exit.

  ``export PATH=/path/to/your/SPAdes/installation/path/bin:$PATH``

5. Use the source command to force Linux to reload the .bashrc file which normally is read only when you log in each time.

.. code-block:: bash

  source .bashrc

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