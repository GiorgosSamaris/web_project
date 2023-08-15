all: login_copy registration_copy maps_copy
	net stop Apache2.4
	net start Apache2.4
login_copy:
		xcopy "C:\web_project\login\." "C:\Apache24\htdocs\login" /e /-y

registration_copy:
		xcopy "C:\web_project\registration\." "C:\Apache24\htdocs\registration" /e /-y
maps_copy:
		xcopy "C:\web_project\maps\." "C:\Apache24\htdocs\maps" /e /-y


