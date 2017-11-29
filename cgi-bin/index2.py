#!/usr/bin/env python
# Written by Vamei
import cgi
form = cgi.FieldStorage()

# Output to stdout, CGIHttpServer will take this as response to the client
print "Content-Type: text/html"     # HTML is following
print                               # blank line, end of headers
print '<h1>Addition Results</h1>'

#form=cgi.FieldStorage()
name=form.getvalue('user_name')
age=form.getvalue('user_age')
sex=form.getvalue('user_sex')
data=name

if name != None and len(name) > 0:
    print "<p id=name>%s</p>"%name
    #console.log(name)
else:
    print "<p id=name>please</p>"

print "hello world!";
