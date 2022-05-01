# Production build

# Ref: https://tiangolo.medium.com/react-in-docker-with-nginx-built-with-multi-stage-docker-builds-including-testing-8cc49d6ec305

# https://www.nginx.com/blog/deploying-nginx-nginx-plus-docker/

docker build -t zeus-react-image .
docker run --name appinno-frontend -p 3000:80 -d zeus-react-image


We then run the following command to start a helper container mynginx4_files that has a shell, enabling us to access the content and configuration directories of the appinno-frontend container we just created:

docker run -i -t --volumes-from appinno-frontend --name appinno-frontend-files debian /bin/bash

Access docker bash

sudo docker exec -it <CONTAINER ID/NAME> bash

Access http://localhost:3000 in browser
