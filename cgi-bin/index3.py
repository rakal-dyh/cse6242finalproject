#!/usr/bin/env python
# Written by Vamei
import cgi
form = cgi.FieldStorage()

# Output to stdout, CGIHttpServer will take this as response to the client
print "Content-Type: text/html"     # HTML is following
print                               # blank line, end of headers
name=form.getvalue('user_name')
age=form.getvalue('user_age')
sex=form.getvalue('user_sex')
data=name
a="2346aaaaaa";
b="asad"

print a;
print b;
