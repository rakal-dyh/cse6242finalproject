Download whole file (website_interface)

To run the main HTML, in shell, cd path/to/this/directory (website_interface)

In path of this directory, use command:
$ python -m CGIHTTPServer
or
$ python server.py

And below command to install reference package:
$ pip install weather-api
$ pip install geocoder

In localhost:8000 open maintest.html

For this version, the text box "origin","destination","stationid" can be used to pass value. The map begin and end point will based on origin and destination. And the line chart is plot using that stationid.

If click submit button with no imput, the default value will be given to these three variables. 


----------------------------------
If the maintest.html is not shown well, try:
$ chmod 755 cgi-bin

and for each file (like .py) in cgi-bin do in same way (chmod 755 filename)