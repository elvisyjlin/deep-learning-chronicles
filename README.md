# Deep Learning Chronicles

Chronicles of brilliant deep learning ideas

https://elvisyjlin.github.io/deep-learning-chronicles/

The works listed in the page are hand-collected by me, 
so not all brilliant works related to deep learning are included. 
I will keep adding significant publications of deep learning in the near future.

This site is based on
* [Bootstrap v4.1.3](https://getbootstrap.com)
* [jQuery v3.3.1](https://jquery.com)
* [Font Awesome v5.3.1](https://fontawesome.com)
* [Tippy.js v3.0.1](https://atomiks.github.io/tippyjs/)
* A template page by Brady Wright (http://codepen.io/phasethree/pen/NNOvrW)

The license of the page template is described in `template-license.txt`.  
The favicon made by [Smashicons](https://www.flaticon.com/authors/smashicons) from www.flaticon.com is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/). It is converted via https://www.favicon-generator.org.


## Data Collection

Scripts for retrieving information of publications and conferences are in `script/` folder. 
1. Prepare publications in `data.csv` first. There must be name, source (conference or journal) and url to crawl.
2. Run `crawl_publications.ipynb` to gather all needed information of the publications in `data.csv`.
3. Run `crawl_conferences.ipynb` to fetch details of listed conferences (`cfp_program_id`).


## To Contribute

Please refer to
1. `works.json` to add more works related to deep learning. 
2. `conferences.json` to add more conferences related to deep learning.

Any suggestion or improvement to this site is very welcome.  
Don't forget to add yourself to `contributors.json` in honor of your contributions.
