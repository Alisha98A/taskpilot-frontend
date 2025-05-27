## 🐞 Bugs Encountered & Solutions

---

### Bug: 401 Unauthorized When Fetching User Info After Login

**Context**  
I’m connecting my React frontend to a Django REST API using `dj-rest-auth` for authentication. The goal was to:  
- Log in users via `/dj-rest-auth/login/`  
- Store auth tokens in cookies  
- Automatically send those cookies with subsequent requests  
- Persist login state by fetching user info from `/dj-rest-auth/user/`

**The Problem**  
Login succeeded and the authentication cookies (`my-app-auth` and `my-refresh-token`) were correctly set, but a request to `/dj-rest-auth/user/` always returned a **401 Unauthorized** error.  
Cookies were present, CORS and CSRF were configured correctly, yet the cookies were not sent with the request.

**Solution**  
Updated Django REST Framework settings to disable the Browsable API and always respond with JSON:
```python
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    ...
}

After this change, the /dj-rest-auth/user/ endpoint correctly responded with JSON, the cookies 
Special thanks to Roman, my tutor, for helping me debug and resolve the authentication issue with dj-rest-auth and cookie-based login.


TaskCreate.js

###  1. useNavigate Not Found
**Problem:** 
Attempted to use useNavigate from react-router-dom, but the app threw the following error:
> Attempted import error: 'useNavigate' is not exported from 'react-router-dom'

**Cause:**  
The project was using an older version of react-router-dom (v5), where useNavigate is not available.

**Solution:**

Replaced useNavigate with useHistory, which is the correct hook for programmatic navigation in react-router-dom@5. The redirection after creating a task was handled using:

```js
import { useHistory } from 'react-router-dom';

const history = useHistory();
history.push("/tasks");



### 2. 404 Error on POST to /api/tasks/

**Problem:** 
Submitting the task creation form led to:

"POST http://localhost:3000/api/tasks/ 404 (Not Found)"

**Cause:**  
The frontend was pointing to localhost:3000, but the backend was deployed on Heroku with a different domain.

**Solution:**
Set up a global Axios base URL in axiosDefaults.js:

"axios.defaults.baseURL = 'https://taskpilot-backend-6ee557f05c5b.herokuapp.com/';"

This ensured all API requests were routed to the correct backend.

### 3. Invalid JSON Response (Unexpected Token <)

**Problem:** 
After the failed POST request, another error appeared:

"SyntaxError: Unexpected token '<', "<!DOCTYPE " is not valid JSON"

**Cause:**  
The frontend was expecting JSON but received an HTML error page (due to 404), which is common when the backend URL is incorrect.

**Solution:**
This error was resolved along with the 404 issue by fixing the axios.defaults.baseURL to point to the correct backend.

After fixing these bugs, the TaskCreate component successfully:
	•	Created a new task by posting to the correct API.
	•	Redirected to the task list page (/tasks) upon successful creation.
	•	Rendered the newly created task immediately in the list.