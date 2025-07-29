## Dependencies Install:
- npm init -y 
- npm i mongoose,express,dotenv(firdtly after installing these adds your .env and node modules in .gitignore before pushing your code to github bcoz its a good practice to not to push the nodemodlues and .env)
- install multer for handling form data as a middleware
- install imagekit --save for dat storage providers

### Errors
- you ahve to use require express again and again 

## steps:

<details>
<summary>⿡ <code>1 server.js</code> – Starts the Server</summary>

```js
const app = require('./src/app');

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

```

🔍 Why?

- Keeps server config separate from the main app logic

- Helps during testing (you can import app separately)

- Clean separation of starting vs handling logic


## 🛠 Best Practice

✅ Only keep app.listen() here
✅ No middleware or route logic

</details>

---


<details>
<summary>⿢ <code>2 app.js</code> – Core App Logic</summary>

```js
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Later you'll add your routes here:
// const songRoutes = require('./routes/song.route');
//app.use('/api', songRoutes);

module.exports = app;
```

🔍 Why?

This is your Express application instance

It contains middleware (like express.json())

Also where you plug in your route files


🛠 Best Practice

✅ All your route files should be connected here
✅ Use this file as the main app logic for flexibility

</details>

---


<details>
<summary>⿣ <code>3 routes/song.route.js</code> – Song POST Endpoint</summary>const express = require('express');
const router = express.Router();

router.post('/songs', (req, res) => {
  const song = req.body;
  console.log(req.body);

  res.status(201).json({ 
    message: 'Song created successfully', 
    song: song 
  });
});

module.exports = router;

🔍 Why?

This handles all /songs POST requests

Keeps routing logic separate and organized

You can later add more routes in this file (GET, PUT, DELETE)


🛠 Best Practice

✅ Always use express.Router() for cleaner modular routes
✅ Export it and plug into app.js with a prefix (like /api)

</details>

---

<details>
<summary>⿤ 4 💡 How Routing Works with <code>app.use('/api', songRoutes)</code></summary>🧠 Step-by-step:

🔁 What you wrote:

const songRoutes = require('./src/routes/song.route');
app.use('/api', songRoutes);


---

🔍 What does this mean?

require('./src/routes/song.route')
You're importing all your route logic from song.route.js.

app.use('/api', songRoutes)
You're telling Express:

> “Hey Express, use all the routes from songRoutes, and prefix them with /api in the URL.”





---

📌 Why we do this?

To group all your backend API routes under a common prefix, like:

/api/songs

/api/users

/api/products


This is very common in real-world APIs to separate frontend paths (like /home) from backend API endpoints.


---

🧠 Real Example Breakdown:

Let’s say this is inside song.route.js:

router.post('/songs', (req, res) => {
  // logic
});

This means that inside the routes file, the path is just /songs.

But since we did:

app.use('/api', songRoutes);

Now the final route becomes:

/api/songs

So in Postman or frontend, you’ll send the request to:
http://localhost:3000/api/songs


---

🎨 Visual Breakdown

File	Code Snippet	Resulting URL

song.route.js	router.post('/songs', ...)	/songs (relative path)
app.js	app.use('/api', songRoutes)	/api/songs



---



POST /api/songs

✅ Why this matters:

Helps organize and namespace your routes (e.g. /api, /auth, /admin)

Avoids confusion when you scale your backend

Keeps route files clean by not repeating /api again and again


🛠 Best Practice

✅ Use meaningful prefixes (/api, /admin, etc.)
✅ Group route files per resource (e.g., song, user, playlist)

</details>


---

<details>
  <summary>Step 5: Handling Form Data and File Uploads with<code>Multer</code></summary>

  *📌 Problem Faced:*
  While testing with Postman, using only express.json() worked fine for raw data (like title, artist, mood).  
  But when switching to *form-data* and uploading a file, the server was receiving undefined.

  *🛠 Solution:*
  - Installed Multer to handle multipart/form-data (form data with files).
  - Configured Multer with memoryStorage() or diskStorage() depending on need.
  - Added .single('file') middleware inside the POST API to handle the file.

  *🔧 Sample Code:*

  ```js
  const multer = require('multer');
  const upload = multer({ storage: multer.memoryStorage() });

  router.post('/songs', upload.single('file'), (req, res) => {
    console.log(req.body); // Will now include text fields
    console.log(req.file); // Will now include uploaded file info

    res.status(201).json({
      message: 'Song created successfully',
      data: req.body,
    });
  });
  ```

✅ Key Notes:

'file' in upload.single('file') must match the key used in Postman form-data.

Without Multer, Express cannot parse form-data containing files.

also use .array instead of .single when you are sending multiple files


</details>

---

<details>
  <summary>Step 6: starts <code>mongodb-atlas,mongodb-compass</code> for the conection than made the connection fn in <code>db.js</code></summary>

  *📌 Solution:*
- starts the mongodb atlas , compass put the url in .env than require it in server.js 
- made a file db.js than made the conection fn and require it in server.js


</details>

---

<details>
  <summary>Step 7: Also adds <code>images</code> to upload and store in  <code>DB</code></summary>

  *📌 Solution:*
- change the multer inside the post api for uploading of multiple files

</details>

---


<details>
  <summary>Step 8: created  <code>storage.service.js</code>to create a fn to upload files in <code>Imagekit.io</code></summary>

  *📌 Solution:*
- created the fn uploadfile() to store the images or audios into imagekit this fn receive a parameter
- inside of song.routes.js we will import this fn and when request is send along with the data from the postman than image and aaaudio will be passed to thsi fn as an argument and it will stores them in Moody-Player folder
- tha it will return the urls of both 
</details>

---
