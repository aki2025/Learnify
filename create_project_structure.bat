@echo off
echo Creating Learning Platform project structure...

:: Create main directory
mkdir learning-platform

:: Navigate into the main directory
cd learning-platform

:: Create backend directory and subdirectories
mkdir backend
cd backend
mkdir src
cd src
echo. > app.py
echo. > models.py
echo. > config.py
echo. > requirements.txt
cd ..
echo. > .env
echo. > Procfile
cd ..

:: Create frontend directory and subdirectories
mkdir frontend
cd frontend
mkdir public
cd public
echo. > index.html
cd ..
mkdir src
cd src
mkdir components
cd components
echo. > LibraryList.tsx
echo. > SearchBar.tsx
echo. > Chatbot.tsx
echo. > Login.tsx
echo. > Register.tsx
cd ..
mkdir pages
cd pages
echo. > Home.tsx
echo. > Course.tsx
echo. > Profile.tsx
cd ..
echo. > App.tsx
echo. > index.tsx
cd ..
echo. > package.json
echo. > tailwind.config.js
cd ..

:: Create root files
cd ..
echo. > .gitignore
echo. > README.md

echo Project structure created successfully!
echo Please review the README.md for next steps.
pause