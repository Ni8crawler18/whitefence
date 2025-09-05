# Whitefence  
RegTech Platform for Automated Compliance Monitoring & Reporting  

## Overview  
Whitefence is a prototype compliance management tool designed for small and mid-size stock brokers in India. It simplifies the process of meeting SEBI, NSE, and BSE obligations by providing a single dashboard for compliance tracking, reporting, and surveillance. The system reduces manual effort, lowers compliance costs, and helps brokers stay audit-ready while improving overall market integrity.  

## Key Features  
- **Compliance Dashboard**: Preloaded with SEBI, NSE, and BSE obligations.  
- **Automated Alerts**: Notifications for upcoming and overdue compliance tasks.  
- **Document Repository**: Central storage for compliance filings, certificates, and disclosures.  
- **Report Generator**: Export submissions in regulator-friendly formats (PDF/Excel, including Samuhik Prativedan Manch templates).  
- **Surveillance Module**: Upload CSV/Excel trade data to detect anomalies such as unusual trading volumes, exposure breaches, or penny stock concentration.  
- **Q-based Learning**: Predicts which tasks are most likely to be delayed and adjusts prioritization to improve compliance outcomes.  
- **Audit Log**: Maintains a history of submissions and actions for inspection readiness.  

## Intended Users  
- Small and mid-size brokers who lack access to costly compliance systems.  
- Compliance officers and managers responsible for SEBI and exchange filings.  
- Regulators and exchanges (future scope) for aggregated compliance insights.  

## Problem Addressed  
Small and mid-sized brokers often depend on manual spreadsheets and face high risks of missing compliance deadlines. Large brokers can afford enterprise compliance and surveillance platforms, but smaller ones cannot. Whitefence addresses this gap by providing a low-cost, modular, and regulator-aligned compliance solution that ensures brokers remain compliant and audit-ready.  


## Tech Stack (Prototype)  
- Frontend: React with Tailwind (clean black-and-white theme)  
- Backend: Node.js / Python (for task management and anomaly checks)  
- Database: PostgreSQL (compliance data, user logs, documents)  
- File Support: PDF, Excel (uploads and report generation)  

## License  
Prototype developed under SEBI’s Safe Space initiative for demonstration at the Global Fintech Fest Hackathon.  
