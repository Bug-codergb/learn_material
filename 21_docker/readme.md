docker build -f Dockerfile -t mynuxt:v1.0.0 .
docker run -d -p 3000:3000 mynuxt:v1.0.0    