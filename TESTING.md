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







Fix: Handling Notes Related to Tasks in Serializer

When fetching or creating notes related to a task, the serializer initially assumed the presence of a valid request object in the context. This caused errors if the request was missing or improperly passed, especially when serializing tasks outside the usual request flow (e.g., in tests or admin views).

How it was fixed:
	•	Added safe checks in the TaskSerializer to verify the request exists in the serializer context before accessing request.user.
	•	In the NoteSerializer, dynamically adjusted the queryset for the task field based on the authenticated user in the request, ensuring notes can only be created for tasks owned by that user.
	•	This prevents unauthorized or erroneous note creation and fixes bugs related to missing or invalid request contexts during serialization.

This ensures consistent, secure handling of notes linked to tasks and improves robustness across different usage scenarios.




 Bug Fix: Removing Attachment Field and Cloudinary Integration

 📌 Background

During development, the attachment field was implemented using CloudinaryField for image/file uploads. However, it later became clear that this feature no longer suited the direction of the project. Removing it required careful handling of model migrations and dependencies to avoid breaking the app — especially since the project had already been deployed.

✅ Final Clean-Up Checklist

To fully remove the attachment feature and Cloudinary integration, the following steps were followed:
	•	attachment field removed from models.py
	•	Migration created and applied using:

python manage.py makemigrations
python manage.py migrate

	•	Cloudinary uninstalled:

pip uninstall cloudinary

	•	cloudinary and related apps removed from INSTALLED_APPS in settings.py
	•	All references to CloudinaryField and from cloudinary.models import CloudinaryField removed
	•	validators.py still present — pending removal due to a reference error (under investigation)

Important Note on Migrations

At one point, a workaround required re-adding the attachment field temporarily to avoid migration conflicts. Once the blockers were resolved, the correct step was:
	•	Delete the field again from models.py
	•	Run a new migration:

This generated a final migration (e.g., 0006_remove_task_attachment) that properly aligns the current database schema with the updated models.

📌 Remaining Issue
	•	validators.py cannot be deleted yet, as it still causes an error when removed. This file will be reviewed and cleaned up in a future update. Same goes for uninstalling cloudinary. 





Bug: Task Update API - 400 Bad Request on due_date

Issue

When updating a task via the API, the backend returned a 400 Bad Request error specifically related to the due_date field. The API response indicated a validation error with the due_date, even though the date appeared to be correctly formatted in the frontend payload.

Root Cause

The backend model expected due_date to be a DateTimeField, requiring a full ISO 8601 datetime string (including both date and time components). Initially, the frontend was sending only a date string (e.g., "2025-06-01"), which was insufficient for the model validation.

Solution

The frontend was updated to send a properly formatted ISO 8601 datetime string with time included (e.g., "2025-06-01T00:00:00" or an equivalent UTC time). This ensured that the due_date field matched the backend expectations.

Example of the fixed payload:

{
  "title": "Cook pasta",
  "description": "Find a recipe",
  "priority": "medium",
  "state": "open",
  "category": "misc",
  "due_date": "2025-06-01T00:00:00"
}

Key Takeaways
	•	Always ensure date/time fields match the backend model’s required format.
	•	Use ISO 8601 datetime strings for DateTimeField in Django REST Framework.
	•	Check backend serializer error messages carefully — they often pinpoint the exact field causing the validation issue.