

# 🚀 Terraform Next.js + Express + PostgreSQL (Three-Tier App)

This project demonstrates a **three-tier architecture** (Frontend → Backend → Database) deployed with **Terraform-managed Docker**.
It uses a **private internal Docker network** for secure communication between tiers.

---

## 📂 Project Structure

```
project-root/
│── frontend/              # Next.js frontend
│   ├── app/               # Pages (Home, Login, Employees)
│   ├── package.json
│   └── Dockerfile
│
│── backend/               # Express.js backend
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   └── Dockerfile
│
│── database/              # Database layer
│   └── init.sql           # Schema + seed data
│
│── terraform/             # Terraform configs
│   ├── main.tf            # Docker containers, networks, volumes
│   ├── variables.tf       # Input variables
│   ├── outputs.tf         # Useful outputs (URLs, ports)
│   ├── terraform.tfvars   # Environment values (gitignore this!)
│   └── terraform.tfvars.example
│
└── README.md
```

---

## ⚙️ Requirements

* [Docker](https://docs.docker.com/get-docker/)
* [Terraform](https://developer.hashicorp.com/terraform/downloads)

---

## 🚀 Setup & Deployment

1️⃣ Clone the repo:

```bash
git clone https://github.com/<your-username>/terraform-nextjs-postgres.git
cd terraform-nextjs-postgres
```

2️⃣ Initialize Terraform:

```bash
cd terraform
terraform init
```

3️⃣ Apply the configuration:

```bash
terraform apply -auto-approve
```

This provisions:

* PostgreSQL container (with persistent volume + seed data)
* Express.js backend API
* Next.js frontend

---

## 🌐 Access

* **Frontend (Next.js)** → [http://localhost:3000](http://localhost:3000)
* **Backend (Express.js API)** → [http://localhost:3001](http://localhost:3001)
* **Database (Postgres)** → port 5432

---

## 🗄️ Database Initialization

`init.sql` seeds:

* `users` → default user `admin/admin`
* `employees` → sample employees

---

## 🔑 API Endpoints

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| GET    | `/api/health`    | Check backend health        |
| GET    | `/api/employees` | List all employees          |
| POST   | `/api/employees` | Add employee `{name,email}` |
| POST   | `/api/login`     | Authenticate user           |

---

## 🖥️ Frontend Pages

* `/` → Home page
* `/login` → Login form
* `/employees` → Add + List employees

---

## 🛠️ Terraform Management

* Show outputs:

  ```bash
  terraform output
  ```

* Destroy everything:

  ```bash
  terraform destroy -auto-approve
  ```

---

## 📌 Future Improvements

* JWT authentication
* Password hashing with bcrypt
* CI/CD with GitHub Actions
* Secrets management via Vault






<img width="1600" height="900" alt="image" src="https://github.com/user-attachments/assets/c719195f-412f-4e02-8269-d1e1436eed3d" />



<img width="1600" height="900" alt="image" src="https://github.com/user-attachments/assets/8f48253e-707e-434c-8085-8a7dddbc2b0c" />


<img width="1600" height="900" alt="image" src="https://github.com/user-attachments/assets/f5b403df-c847-4a5d-a88d-cd53e636774d" />
