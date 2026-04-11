
A. Setup Instructions:
 
 1. Clone Repository Frontend:  git clone https://github.com/mehedishishir0/Ibos-task.git
 2. Clone Repository Backend:  git clone https://github.com/mehedishishir0/ibos-backend.git
 
3.  npm install

Env: 

Backend:
PORT=5000
MONGO_URI=mongodb+srv://ibos:ibos@cluster0.zcy2xiy.mongodb.net/ibos
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key


Frontend: 
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api/v1
NEXTAUTH_SECRET=SxTnK3eRKOGO67wrkLqpT63Ald+mHWYLNyZ/9N5rQLI32Je9VUn/S/oiWHo=
NEXTAUTH_URL=http://localhost:3000


4. npm run dev

B. Login Credential: 

Admin:
email: ibos@gmail.com 
pass:  123456

Student: 
email: student@gmail.com 
pass:  123456



C. Questions 
Q1. If no: Describe an idea of how MCP could be used in this project (e.g., Figma MCP,
Chrome DevTools, Supabase). 

Answer: I have not directly used MCP (Model Context Protocol) in my previous projects, I have a clear understanding of its core functionality. MCP primarily acts as a middleman that facilitates seamless communication between different tools and systems, enabling more efficient workflows.
If I had utilized MCP in this project, it would have made the development process significantly easier and more efficient. For instance, I could have leveraged the Figma MCP integration to extract component code directly from the design files. This would have reduced the need for manual implementation, ensured better design consistency, and saved a considerable amount of development time.
Overall, incorporating MCP would have streamlined the workflow, improved productivity, and accelerated the project delivery.

Q2. Which AI tools or processes have you used or recommend to speed up frontend
development?

Answer: I primarily use several AI tools in my workflow, including ChatGPT, Google Gemini, Grok, and v0. However, I rely most heavily on ChatGPT and Google Gemini, as they align closely with my role as a Frontend Developer.
As a frontend developer, I often need to create complex UI layouts and responsive designs. In this regard, I frequently use Google Gemini because, in my experience, it provides highly accurate and visually appealing design suggestions. The generated code for layouts and components is usually well-structured, and with only minor refinements or polishing, it becomes production-ready. This significantly speeds up the design and development process.
On the other hand, I use ChatGPT primarily for handling complex logic and problem-solving tasks. ChatGPT excels at explaining and implementing intricate programming logic, optimizing code, and assisting with debugging. Its ability to break down difficult concepts and provide clean, maintainable solutions makes it an essential tool in my development workflow.
In summary, for rapid UI design and layout generation, I would recommend Google Gemini, while ChatGPT is my preferred choice for handling complex logic and overall frontend development.

Q3. How would you handle offline mode if a candidate loses internet during an exam?

Answer: If a candidate loses their internet connection during an ongoing exam, I believe this issue can be effectively mitigated by implementing a local data persistence strategy.
Specifically, the candidate’s answers can be temporarily stored in the browser’s Local Storage at regular intervals or after each response. This ensures that no progress is lost even if the internet connection is interrupted. Once the connection becomes stable again, the application can automatically synchronize the locally stored data with the backend server through API calls and save it to the database.
Additionally, implementing features such as auto-save, retry mechanisms, and user notifications about connection status can further enhance reliability and user experience.
By following this approach, the risk of data loss during connectivity issues can be significantly reduced, ensuring a smoother and more dependable examination process.



D. Tech Stack:

   Frontend:


Next.js / React.js
Tailwind CSS
ShadCN UI
Tanstack Query
Next Auth
Type Script
Zustand

   
Backend:

Node.js
Express.js
MongoDB
Mongoose 
JWT Authentication


 Video : https://drive.google.com/file/d/1NyMYqEGdLrGMYqP9bntRT4rcRFcEmMHV/view?usp=sharing

Live URL: https://ibos-frontend-task.vercel.app
