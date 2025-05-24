Bug: 401 Unauthorized When Fetching User Info After Login

Context

I’m working on connecting my React frontend to my Django REST API using dj-rest-auth for user authentication. The goal is to:
	•	Log in users via /dj-rest-auth/login/
	•	Store authentication tokens in cookies
	•	Automatically send those cookies with subsequent requests
	•	Persist login state even after a page refresh by fetching user info from /dj-rest-auth/user/

The Problem

Although login succeeded and the authentication cookies (my-app-auth and my-refresh-token) were correctly set, a request to /dj-rest-auth/user/ consistently failed with a 401 Unauthorized error.
After verifying cookie presence, proper CORS and CSRF configuration, the issue persisted: the cookies were not being sent along with the request to /dj-rest-auth/user/.

Solution

To fix the issue, I updated the Django REST framework settings to disable BrowsableAPIRenderer and ensure that the API always responds with JSON.


REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    ...
}

After this change, the /dj-rest-auth/user/ endpoint correctly responded with JSON, the cookies 
Special thanks to Roman, my tutor, for helping me debug and resolve the authentication issue with dj-rest-auth and cookie-based login.