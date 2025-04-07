
# 🚀 Node.js Demo App – CI/CD with GitHub Actions and Docker

This project demonstrates a complete CI/CD pipeline for a simple Node.js app using **GitHub Actions** and **DockerHub**.

---

## 📁 Project Structure

```
nodejs-demo-app/
│
├── .github/workflows/main.yml   # GitHub Actions CI/CD pipeline
├── Dockerfile                   # Docker build definition
├── package.json                 # Node dependencies
├── app.js                       # Main Express server
├── app.test.js                  # Jest test file
```

---

## ⚙️ Setup From Scratch

### 1. 🔨 Initialize Project

```bash
npm init -y
npm install express
npm install --save-dev jest supertest
```

### 2. 📝 Create Files

- **app.js**
```js
const express = require('express');
const app = express();
const PORT = 2000;

app.get('/', (req, res) => {
  res.send('Hello from Node.js app on port 2000 🚀');
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
  });
}
```

- **app.test.js**
```js
const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
  it('should return Hello message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Hello from Node.js');
  });
});
```

### 3. 🐳 Dockerfile

```Dockerfile
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 2000

CMD ["node", "app.js"]
```

---

## ⚙️ GitHub Actions CI/CD

### 📄 `.github/workflows/main.yml`

```yaml
name: CI/CD Pipeline (Node.js Demo App)

on:
  push:
    branches: [main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18

    - name: Install dependencies
      run: npm install

    - name: Run tests
      run: npm test

    - name: DockerHub Login
      run: echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin

    - name: Build Docker Image
      run: docker build -t ${{ secrets.DOCKER_USERNAME }}/nodejs-demo-app:latest .

    - name: Push Docker Image
      run: docker push ${{ secrets.DOCKER_USERNAME }}/nodejs-demo-app:latest
```

---

## 🔐 GitHub Secrets Required

In your GitHub repo → **Settings** → **Secrets and variables** → **Actions**:

- `DOCKER_USERNAME`: your DockerHub username  
- `DOCKER_PASSWORD`: your DockerHub **Personal Access Token (PAT)**

---

## ❗ Common Errors & Fixes

### ❌ Error 1: 
```
An image does not exist locally with the tag: ***/auto-nodejs-app
```

**Cause:** `build` and `push` jobs were in **separate jobs** – the Docker image wasn’t available in `push`.

**✅ Fix:** Combine build and push into a **single job** to keep image context.

---

### ❌ Error 2:
```
unauthorized: access token has insufficient scopes
```

**Cause:** DockerHub **access token had read-only** permission.

**✅ Fix:**

- Go to DockerHub → **Account Settings** → **Security**
- Click **"New Access Token"**
- Give it:
  - ✅ `Read/Write`
  - 🔐 Use this new token as `DOCKER_PASSWORD` in GitHub secrets

---

## 🚀 Run Locally (Optional)

```bash
docker build -t nodejs-demo-app .
docker run -p 2000:2000 nodejs-demo-app
```

Visit: [http://localhost:2000](http://localhost:2000)

![image](https://github.com/user-attachments/assets/9570c483-8579-4c7c-a767-de95b51ad4f8)

---

## ✅ Output

![Success](https://img.shields.io/badge/deployment-success-brightgreen?style=flat&logo=github)

- App is automatically built, tested, and deployed to DockerHub on push to `main`.

---

## 📦 DockerHub

Find the published image on your DockerHub profile:

`docker pull <your-username>/nodejs-demo-app`

---

## 🙌 Done!

Your Node.js app is now fully automated with CI/CD via GitHub Actions.
