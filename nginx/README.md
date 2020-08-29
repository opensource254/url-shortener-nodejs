# Nginx files for the server

`shorten` is the file for testing on nginx using rever proxy and supports redirection.
It comes in handy in testing with curl or postman
`shorten-default` - it has been developed for the front end bit of the program. 
Its assumed the frontend will run on nodejs

# How to Use
1. Install nginx to your computer
2. symlink the file from /etc/nginx/sites-available/ to /etc/nginx/sites-enabled
`sudo ln -s ` the symlink command
3. Restart thr server

